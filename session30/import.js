var http = require('http');
var url = require('url');
var fs = require('fs');

var mongodb = require('mongodb').MongoClient;

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
        
        case '/import':
            var parms = url.parse(req.url,true).query,
                collName = parms.coll,
                append = parms.app,
                data = fs.readFileSync('data.json'),
                append = append==='1' ? true : false,
                hasCollection = true;
                
            mdb.listCollections({"name": collName }).toArray(function(err, items) {
                if(err) throw err;
                
                if(items.length===0) {
                    hasCollection = false;
                }
                
                if(append) {
                    
                    if(hasCollection) {
                        
                        mdb.collection(collName).insertMany( JSON.parse(data) , function(err,r){
                            if(err) throw err;
                        });
                        
                    } else {
                        
                        mdb.createCollection(collName, function(err,r){
                            if(err) throw err;
                            
                            mdb.collection(collName).insertMany( JSON.parse(data) , function(err,r){
                                if(err) throw err;
                                //console.log(r);    
                            });
                            
                        });
                    }
                    
                } else {
                    
                    if(hasCollection) {
                        
                        mdb.collection(collName).deleteMany( {} , function(err,r){
                            if(err) throw err;
                            //console.log(r);    
                           
                            mdb.collection(collName).insertMany( JSON.parse(data) , function(err,r){
                              if(err) throw err;
                              //console.log(r);    
                            }); 
                            
                        });
                        
                    } else {
                        
                        mdb.createCollection(collName, function(err,r){
                            if(err) throw err;
                            mdb.collection(collName).insertMany( JSON.parse(data) , function(err,r){
                                if(err) throw err;
                                //console.log(r);    
                            });
                        });
                        
                    }
                }
            });
            
            res.end('ok');
            break;  // case '/import'

        default:
            res.write( 'Route: ' + route + ' not defined!' );
            res.end();
            break;
            
    }  // switch (route)
    
}  // function onRequest(req,res)

