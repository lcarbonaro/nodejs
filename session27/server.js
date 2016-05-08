var http = require('http');
var url = require('url');
var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var dbHost = process.env.IP || '127.0.0.1';
var mdb;

mongodb.connect("mongodb://" + dbHost + ":27017/test", function (err, db) {
    if (!err) {
        console.log("mdb connection ok");
        mdb = db;  
    } else {
        console.log("mdb connection failed");
        console.log(err); 
    }
});


http.createServer(onRequest).listen(8081);


function onRequest(req,res) {
    res.setHeader('Access-Control-Allow-Origin','*');  //CORS
    
    var route = url.parse(req.url).pathname;
    
    switch (route) {
        
        case '/categories':
            mdb.collection('category').find( { }, { "name":1 } ).toArray(function(err,docs) {
                if (err) {
                    console.error('categories error: '+ err.stack);    
                } else {
                    
                    // this extra bit of code is a workaround for the fact
                    // that you cannot alias fieldnames in mdb !?!
                    // it's either this, or change the front end to expect _id
                    // ((but front-end should be agnostic to what db you're using!!)
                    var recs = [];
                    var rec;
                    docs.forEach(function(d){
                        rec = {
                            "id": d._id,  
                            "name": d.name
                        };
                        recs.push(rec);
                    });
                    
                    res.write(JSON.stringify(recs));
                    res.end();    
                }
            });
            break;
        
        case '/expense':
            var parms = url.parse(req.url,true).query;
            
            var setFlds = {
                amount: parseFloat(parms.amount)
            };
            
            mdb.collection('category').update({ "_id": new ObjectID(parms.category) }, { $pushAll: { "expenses" : [setFlds] } }, function(err,result){
                if (err) {
                    console.error('expense error: '+ err.stack);    
                } else {
                    res.write(JSON.stringify(result));
                    res.end();    
                }
            });
            
            break;
            
        case '/summary':
            
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
                if (err) {
                    console.error('summary error: '+ err.stack);    
                } else {
                    res.write(JSON.stringify(docs));
                    res.end();    
                }
            });
            
            break;
            
        default:
           res.write( 'Error! No such route defined!' );
           res.end();
           break;
    }
    
}

/*

 var resultObj = db.collection('category').find( { }, { "name":1 } );
        
        resultObj.each( function(err,doc) {
            if (!err) {
                console.log(doc); 
            } else {
                console.log(err);
            }
        });

*/