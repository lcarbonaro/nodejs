var express = require('express');
var server = express();

var mongodb = require('mongodb').MongoClient;
var dbHost = process.env.IP || '127.0.0.1';
var connStr = 'mongodb://' + dbHost + ':27017/test';

server.listen(process.env.PORT || 3000);

// see http://expressjs.com/en/4x/api.html#app.use
// and http://enable-cors.org/server_expressjs.html
// tl;dr: we want this code to be applied for every request
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


server.get('/', function(req, res) {
    res.send('express root route');
});

server.get('/data', function(req, res) {
    mongodb.connect(connStr, function(err, dbConn) {
        if (err) throw err;
        var coll = dbConn.collection('student');
        var project = {"name":1,"major":1, "_id":0};
        var cursor = coll.find({},project);
        cursor.sort({"name":1});
        cursor.toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
            dbConn.close();
        });
    });
});

server.get('/majors', function(req, res) {
    mongodb.connect(connStr, function(err, dbConn) {
        if (err) throw err;
        
        var coll = dbConn.collection('student');

        // distinct() method - https://mongodb.github.io/node-mongodb-native/api-generated/collection.html#distinct
        coll.distinct('major', function(err, docs) {
            if (err) throw err;
            res.json(docs.sort());   // simple array sort
            dbConn.close(); 
        });

    });
});

server.get('/names/:major', function(req, res) {
    mongodb.connect(connStr, function(err, dbConn) {

        if (err) throw err;
        
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

