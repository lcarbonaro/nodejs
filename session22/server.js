var http = require('http');

var port = process.env.PORT;  // ports 8081 or 8082 work on c9 as well

http.createServer( onRequest ).listen( port );  


function onRequest( request, response ) {

    // allows calling this back-end resource from anywhere (CORS) 
    response.setHeader('Access-Control-Allow-Origin','*');

    // first example
    //response.write('hi world');

    // second example    
    var data = { "id":1 , "name":"John" , "member":true   };
    response.write( JSON.stringify(data) );
    
    response.end();
}

