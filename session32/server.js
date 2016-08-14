var http = require('http');
var url = require('url');

var mongodb = require('mongodb').MongoClient;
var dbHost = process.env.IP||'127.0.0.1';

http.createServer(handleRequest).listen(process.env.PORT||3000);

function handleRequest(req,res) {
    
    res.setHeader('Access-Control-Allow-Origin','*');  // CORS setting
    
    var route = url.parse(req.url).pathname;
    
    switch(route) {
        
        case '/':
            res.write('hello');
            res.end();        
            break;
            
        case '/data':
            
            mongodb.connect("mongodb://" + dbHost + ":27017/test", function (err, db) {
                if (err) throw err;
                //console.log("mdb connection ok");
                //res.write('db conn ok');
                //res.end();
                
                db.collection('student').find( {} , {"name":1,"_id":0}).toArray(function(err,docs) {
                    if (err) throw err;
                    res.write(JSON.stringify(docs));
                    res.end();    
                    db.close();
                });
                
                
            });
            
            break;
            
        default:
            res.write('Route ' + route +' undefined!');
            res.end();        
            break;
         
    }
    
    
}