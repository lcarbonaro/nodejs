var http = require('http');
var url = require('url');

http.createServer(onRequest).listen(8081, function(){
    console.log('server started');
});

function onRequest(req,res) {
    res.setHeader('Access-Control-Allow-Origin','*');  //CORS
    
    var route = url.parse(req.url).pathname;
    
    // data - normally in a database of some sort, but just to illustrate ...
    var dataClients = [{
        "id": 1,
        "name": "Jane",
        "pic":"http://lorempixel.com/200/200/cats/Jane"
    }, {
        "id": 2,
        "name": "Jack",
        "pic":"http://lorempixel.com/200/200/cats/Jack"
    }, {
        "id": 3,
        "name": "Joe",
        "pic":"http://lorempixel.com/200/200/cats/Joe"
    }, {
        "id": 4,
        "name": "Jill",
        "pic":"http://lorempixel.com/200/200/cats/Jill"
    }];
    
    var dataProds = [{
        "id": 110,
        "name": "cars"
    }, {
        "id": 111,
        "name": "pizza"
    }, {
        "id": 112,
        "name": "software"
    }, {
        "id": 113,
        "name": "phones"
    }];
    
    
    
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
            
        case '/products':
            res.write( JSON.stringify(dataProds) );
            break;
            
        case '/product':
            var parms = url.parse(req.url,true).query;
            
            // find the particular product using JavaScript filter()
            var product = dataProds.filter( function(p) { return p.id == parms.id; } );
            
            res.write( JSON.stringify(product) );
            break;
            
        default:
           res.write( 'Error! No such route defined!' );
           break;
    }
    
    res.end();
    
}


// recap slides:  https://docs.google.com/presentation/d/1WJi91dwFPPxsg-1zXLjdAGVD0hgG4jR84906KiwYi84/edit?usp=sharing


// send requests to this server by pointing to:  http://meetup-backend-lcarbonaro.c9users.io:8081/