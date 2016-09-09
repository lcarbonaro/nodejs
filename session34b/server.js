var express = require('express');

var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var dbHost = process.env.IP || '127.0.0.1';
var connStr = 'mongodb://'+dbHost+':27017/test';

server = express();

server.listen(3000);

server.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    next();
});

server.get('/', function(req,res){
    console.log(req.query);
    var ft = req.query.chkFullTime ? req.query.chkFullTime : 0;
    var oc = req.query.radOC ? req.query.radOC : '';
    console.log('ft=',ft);
    console.log('oc=',oc);
    res.end();
});  // server.get('/'

server.get('/student/:id', function(req,res){
    var studentId = new ObjectId(req.params.id);

    mongodb.connect(connStr, function(err,dbConn){
        if(err) throw err;
        var coll = dbConn.collection('student');

        // fetch distinct values in field 'likes'
        coll.distinct('likes', function(err,arr){

            // what if no likes found to start with?
            // for example, a new field we're just introducing
            // and there are no previous values
            // define a default list?
            // e.g. [ "Books", "Music", "Sports", "Party" ]

            var likes = arr.length>0 ? arr : [ "Books", "Music", "Sports", "Party" ];

            // fetch distinct values in field 'oncampus'
            coll.distinct('oncampus', function(err,arr){
                if(err) throw err;
                var oncampus = arr.length>0 ? arr : ["Yes","No","Sometimes","Don't Know"];

                // fetch student document
                var where = { "_id" : studentId };
                var project = {};

                coll.findOne(where, project, function(err,doc){
                    if(err) throw err;

                    // 'fix' doc re: likes options
                    var newLikes = likes.map( function(i){
                        var o = { "val": i, "txt": i};
                        if(doc.likes===i){
                            o.sel=true;
                        }
                        return o;
                    });
                    doc.likes = { "options": newLikes };

                    // 'fix' doc re: oncampus radio buttons
                    var newOnCampus = oncampus.map( function(i){
                        var o = { "val": i, "txt": i};
                        if(doc.oncampus===i){
                            o.sel=true;
                        }
                        return o;
                    });
                    doc.oncampus = { "radio": newOnCampus };

                    res.json(doc);
                    dbConn.close();
                });  // coll.findOne

            });  // coll.distinct('oncampus'

        });  // coll.distinct('likes'

    });  // mongodb.connect

});  // server.get('/student/:id'
