var http = require('http');
var url = require('url');

http.createServer(onRequest).listen(8081);

function onRequest(req,res) {
    res.setHeader('Access-Control-Allow-Origin','*');  //CORS
    
    var route = url.parse(req.url).pathname;
    
    // data - normally in a database of some sort, but just to illustrate ...
    var dataClients = [
        {"id": 1,"name": "Peter","pic":"http://lorempixel.com/200/200/cats/1"}, 
        {"id": 2,"name": "Jane", "pic":"http://lorempixel.com/200/200/cats/2"}, 
        {"id": 3,"name": "Tom",  "pic":"http://lorempixel.com/200/200/cats/3"}, 
        {"id": 4,"name": "Ann",  "pic":"http://lorempixel.com/200/200/cats/4"}
    ];
    
    
    switch (route) {
        
        case '/':
            res.write( 'This is the home page.' );
            break;
        
        case '/clients':
            res.write( JSON.stringify(dataClients) );
            break;
            
        case '/client':
            var parms = url.parse(req.url,true).query;
            
            // find the particular client using JavaScript filter()
            var client = dataClients.filter( function(c) { return c.id == parms.id; } );
            
            res.write( JSON.stringify(client) );
            break;
            
        default:
           res.write( 'Error! No such route defined!' );
           break;
    }
    
    res.end();
    
}
