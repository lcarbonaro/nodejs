// POST & GET requests (with data passed in)

// note: can test this via cURL utility in terminal
//
// curl -X POST -d '{"test":"curling"}' http://meetup-backend-lcarbonaro.c9users.io/
// curl -X GET http://meetup-backend-lcarbonaro.c9users.io?test=curling

var http = require('http');
var url  = require('url');

var server = http.createServer(onRequest);
server.listen(process.env.PORT);


function onRequest(req,res) {
    //console.log(req.url);  // so do not need url.parse().pathname for this?
    
    if( req.method==='POST' ) {
        
        // note: this will work for GET parms as well 
        // but for that url.parse().query is much simpler
        
        var reqBody = [];
        req.on('data', function(parm) {
            reqBody.push(parm);
        }).on('end', function() {
            reqBody = Buffer.concat(reqBody).toString();                         
            res.write( 'You POSTed: ' + JSON.parse(reqBody).test );             
            res.end();
            // assuming we sent in: {"test":"something"}
            // response would be: You POSTed: something
        });        
        
    } else {        
        //res.write('Must be a POST request!');
        //res.end();
        
        // assuming GET method
        var parms = url.parse(req.url,true).query;   
        res.write( 'You passed in: ' + parms.test );             
        res.end();
        // assuming we sent in: ?test=somethingelse
        // response would be: You GETed: somethingelse
       
    }   
    
}

