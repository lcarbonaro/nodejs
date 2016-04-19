var http = require('http');
var url  = require('url');

var port = process.env.PORT || 3000;  // can use 8081 or 8082

var argv = require('optimist').argv;  // start with: nodemon server.js --port 8081

http.createServer(onRequest).listen( argv.port );  // instead of listen(port)


function onRequest( request, response ) {

    // allows calling this back-end resource from anywhere (CORS) 
    response.setHeader('Access-Control-Allow-Origin','*');

    var route = url.parse(request.url).pathname;
    
    switch(route) {
    
        case '/':
            response.write('hi world');
            break;
        
        case '/data':        
            var data = { "id":1 , "name":"John" , "member":true   };
            response.write( JSON.stringify(data) );
            break;
    }
    
    response.end();
}



// send requests to this server by pointing to:  https://meetup-backend-lcarbonaro.c9users.io/

// webdev slide   https://docs.google.com/presentation/d/1hqlrwx-sZmVlcLpYyH2wIVvdJ_c4KLe5_GrxAhj4Pt8/edit?usp=sharing