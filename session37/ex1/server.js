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
        var coll = dbConn.collection('lm');
        
        // this filter has two conditions on fields 
        // "properties.TYPEDESC" and "geometry"
        // implicit 'and' (as opposed to 'or')
        var query = { 
            "properties.TYPEDESC": "PARKS",
            "geometry" : { 
                "$nearSphere" : { 
                    "$geometry" : { 
                        "type" : "Point" ,
                        "coordinates" : [ -79.6436414, 43.5875534 ] 
                    } ,
                    "$maxDistance" : 500
                } 
            } 
        };
        
        // note re:regular expression operator
        // above can use something like: "properties.TYPEDESC" : { "$regex": /^police/i } ,
        // matches any TYPEDESC that starts with the letters 'police', case insensitive
        
        var proj = {"_id":0};
        
        var cursor = coll.find(query, proj);
        
        cursor.toArray( function(err,docs){
            if (err) throw err;
            res.json({"type":"FeatureCollection","features":docs});
            dbConn.close();
        });
       
    });
});


server.get('/types', function(req, res) {
    mongodb.connect(connStr, function(err, dbConn) {
        if (err) throw err;
        dbConn.collection('lm').distinct("properties.TYPEDESC", function(err, docs) {
            if (err) throw err;
            res.json(docs.sort());
            dbConn.close();
        });

    });
});


server.get('/search', function(req,res){
    mongodb.connect(connStr, function(err, dbConn) {
        if (err) throw err;
        var coll = dbConn.collection('lm');
        
        // this filter has two conditions on fields 
        // "properties.TYPEDESC" and "geometry"
        // implicit 'and' (as opposed to 'or')
        var query = { 
            "properties.TYPEDESC": req.query.type,
            "geometry" : { 
                "$nearSphere" : { 
                    "$geometry" : { 
                        "type" : "Point" ,
                        "coordinates" : [ parseFloat(req.query.lng), parseFloat(req.query.lat) ] 
                    } ,
                    "$maxDistance" : parseInt(req.query.dist)
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