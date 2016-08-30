var express = require('express');

var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var dbHost = process.env.IP || '127.0.0.1';
var connStr = 'mongodb://' + dbHost + ':27017/test';

var server = express();
server.listen(process.env.PORT || 3000);

server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //CORS setting 
    next();
});

server.get('/', function(req, res) {
    res.send('express root route');
});

server.get('/data', function(req, res) {
    mongodb.connect(connStr, function(err, dbConn) {
        if (err) throw err;
        var coll = dbConn.collection('student');
        var proj = {"name": 1, "major": 1 };
        var cursor = coll.find({}, proj);
        cursor.sort({ "name": 1 });
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
        dbConn.collection('student').distinct("major", function(err, docs) {
            if (err) throw err;
            res.json(docs);
            dbConn.close();
        });

    });
});

server.get('/names/:subject', function(req,res){
    var subject = req.params.subject;
    mongodb.connect(connStr, function(err, dbConn) {
        if (err) throw err;
        var coll = dbConn.collection('student');
        var proj = { "name": 1, "_id": 0 };
        var cursor = coll.find({"major":subject}, proj);
        cursor.sort({ "name": 1 });
        cursor.toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
            dbConn.close();
        });
    });
    
});


server.get('/student/:id', function(req,res){
    
    var studentId = req.params.id;
    mongodb.connect(connStr, function(err, dbConn) {
        if (err) throw err;
        var coll = dbConn.collection('student');
        var query = { "_id" : new ObjectId(studentId) }
        var proj = {};
        coll.findOne(query, proj, function(err,doc){
            if (err) throw err;
            res.json(doc);
            dbConn.close();
        });
       
    });
    
});


server.get('/update', function(req,res){
    
    var studentId = req.query.hdnId;
    var grade = req.query.inpGrade;
    
    mongodb.connect(connStr, function(err,dbConn){
        
        if(err) throw err;
        
        var coll = dbConn.collection('student')
        
        var query = { "_id" : new ObjectId(studentId) };
        var update = { "$push" : { "grades" : parseInt(grade) } };
        
        coll.updateOne(query, update , function(err,result){
            if (err) throw err;
            res.json(result);
            dbConn.close();
        })
        
    });
    
});






