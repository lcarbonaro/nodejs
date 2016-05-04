var http = require('http');
var url = require('url');
var mysql = require('mysql');

var dbHost = process.env.IP || 'localhost',
    dbUser = process.env.C9_USER || 'root';

var connection = mysql.createConnection({
    host     : dbHost,
    user     : dbUser,
    password : '',
    database : 'c9'   // change if not on Cloud9
});


http.createServer(onRequest).listen(8081);


function onRequest(req,res) {
    res.setHeader('Access-Control-Allow-Origin','*');  //CORS
    
    var route = url.parse(req.url).pathname;
    var sql;
    
    switch (route) {
        
        case '/categories':
            sql = 'select `id`,`name` from `category`';
            connection.query(sql, function(err, rows) {
                if (err) {
                    console.error('categories sql error: ' + err.stack);
                } else {
                    res.write(JSON.stringify(rows));
                    res.end();
                }
            });
            break;
        
        case '/expense':
            var parms = url.parse(req.url,true).query,
                setFlds = {
                    date: new Date(),
                    amount: parms.amount,
                    categoryId: parms.category
                };
            
            sql = 'insert into `expense` set ?';
            
            connection.query(sql, [setFlds], function(err, result) {
                if (err) {
                    console.error('expense sql error: ' + err.stack);
                } else {
                    res.write( JSON.stringify(result) );
                    res.end();
                }
            });
            
            break;
            
        case '/summary':
            sql = 'select c.name, sum(e.amount) as `total` from `category` c left outer join `expense` e on c.id = e.categoryId group by c.id';
            connection.query(sql, function(err, rows) {
                if (err) {
                    console.error('summary sql error: ' + err.stack);
                } else {
                    res.write(JSON.stringify(rows));
                    res.end();
                }
            });
            break;
            
        default:
           res.write( 'Error! No such route defined!' );
           res.end();
           break;
    }
    
    
}
