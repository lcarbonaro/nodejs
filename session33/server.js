var express = require('express');
var server = express();

var mongodb = require('mongodb').MongoClient;
var dbHost = process.env.IP || '127.0.0.1';


server.listen(process.env.PORT || 3000);

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


server.get('/', function(req, res) {
    res.send('express root route');
});

server.get('/data', function(req, res) {
    mongodb.connect("mongodb://" + dbHost + ":27017/test", function(err, db) {
        if (err) throw err;

        db.collection('student').find({}, {"name": 1,"major":1,"_id": 0}).sort({"name": 1}).toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
            db.close();
        });


    });
});

server.get('/majors', function(req, res) {
    mongodb.connect('mongodb://' + dbHost + ':27017/test', function(err, dbConn) {

        if (err) throw err;

        // distinct() method - https://mongodb.github.io/node-mongodb-native/api-generated/collection.html#distinct

        dbConn.collection('student').distinct('major', function(err, docs) {
            if (err) throw err;
            res.json(docs);
            dbConn.close(); 
        });

    });
});

server.get('/names/:major', function(req, res) {
    mongodb.connect('mongodb://' + dbHost + ':27017/test', function(err, dbConn) {

        if (err) throw err;
        
        // $in operator - https://docs.mongodb.com/manual/reference/operator/query/in/
        
        var coll = dbConn.collection('student');
        
        // matches major parameter against major field
        var query =  {"major": req.params.major }; 
        
        var project = {"name":1, "_id":0};

        var cursor = coll.find( query, project );
        cursor.sort({"name":1})
        
        cursor.toArray(function(err,docs){
            if(err) throw err;
            res.json(docs);
            dbConn.close();
        });

    });
});

