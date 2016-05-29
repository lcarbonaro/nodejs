var http = require('http');
var url = require('url');

var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var dbHost = process.env.IP || '127.0.0.1';

var mdb;

mongodb.connect("mongodb://" + dbHost + ":27017/test", function (err, db) {
    if (err) throw err;
    console.log("mdb connection ok");
    mdb = db;  
});


http.createServer(onRequest).listen(process.env.PORT);


function onRequest(req,res) {
    res.setHeader('Access-Control-Allow-Origin','*');  //CORS
    
    var route = url.parse(req.url).pathname;
    
    switch (route) {
        
        case '/categories':
            
            mdb.collection('category').find( {} , {"name":1}).toArray(function(err,docs) {
                if (err) throw err;
                res.write(JSON.stringify(docs));
                res.end();    
            });
            
            break;
        
        case '/expense':
            var parms = url.parse(req.url,true).query;
            
            var expRec = {
                amount: parseFloat(parms.amount)
            };
            
            mdb.collection('category').update({ "_id": new ObjectID(parms.category) }, { "$push": { "expenses" : expRec } }, function(err,result){
                if (err) throw err;
                res.write(JSON.stringify(result));
                res.end();    
            });
            
            break;
            
        case '/summary':
            
            // this needs MongoDB 3.x, specifically the preserveNullAndEmptyArrays setting
            
            mdb.collection('category').aggregate( [
                { 
                    $unwind:  { 
                        "path" : "$expenses", 
                        "preserveNullAndEmptyArrays" : true
                    } 
                },
                { 
                    $group: { 
                        "_id" : "$_id",
                        "name": { "$addToSet" : "$name" }, 
                        "total" : { "$sum" : "$expenses.amount" } 
                    } 
                }
            ] , function(err,docs) {
                
                if (err) throw err;
                res.write(JSON.stringify(docs));
                res.end();    
                
            });
            
            break;
            
        default:
           res.write( 'Error! No such route defined!' );
           res.end();
           break;
    }
    
}

