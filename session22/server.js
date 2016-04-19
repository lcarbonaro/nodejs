var http = require('http');

http.createServer( onRequest ).listen( 8081 );  // ports 8081, 8082 work for both local and c9


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

