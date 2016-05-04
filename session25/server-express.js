var express = require('express');
var server = express();

// data - normally in a database of some sort, but just to illustrate ...
var dataClients = [
    {"id": 1,"name": "Peter","pic":"http://lorempixel.com/200/200/cats/1"}, 
    {"id": 2,"name": "Jane", "pic":"http://lorempixel.com/200/200/cats/2"}, 
    {"id": 3,"name": "Tom",  "pic":"http://lorempixel.com/200/200/cats/3"}, 
    {"id": 4,"name": "Ann",  "pic":"http://lorempixel.com/200/200/cats/4"}
];

server.listen(8081);

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

server.get('/', function(req, res) {
    res.send('This is the home page.');
});

server.get('/clients', function(req, res) {
    res.json(dataClients);  // no longer need JSON.stringify here, or parse on front-end
});

server.get('/client', function(req, res) {
    var id = req.query.id;

    // find the particular client using JavaScript filter()
    var client = dataClients.filter(function(c) {
        return c.id == id;
    });

    res.json(client);
});

// not really needed anymore
server.get('*', function(req, res){
    res.send( 'Error! No such route defined!' );
});
