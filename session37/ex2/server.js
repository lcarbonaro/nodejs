var express = require('express');

var mongodb = require('mongodb').MongoClient;
var dbHost = process.env.IP || '127.0.0.1';
var connStr = 'mongodb://' + dbHost + ':27017/test';

var server = express();
server.listen(process.env.PORT || 3000);

server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //CORS setting 
    next();
});

server.get('/', function(req,res){
    mongodb.connect(connStr, function(err, dbConn) {
        if (err) throw err;
        var coll = dbConn.collection('ward');
        
        var query = { 
            "geometry": { 
                "$geoIntersects" : {  
                    "$geometry" : { 
                        "type" : "Point", 
                        "coordinates" : [ parseFloat(req.query.lng), parseFloat(req.query.lat)]
                    }
                }    
            } 
        };
        
        var proj = {"_id":0};
        
        var cursor = coll.find(query, proj);
        
        cursor.toArray( function(err,docs){
            if (err) throw err;
            res.json({"type":"FeatureCollection","features":docs});
            dbConn.close();
        });
       
    });
});

