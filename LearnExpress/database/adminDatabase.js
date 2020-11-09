var mysql = require('mysql');
//Create connection
var con = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'express',
    timezone: 'utc'
});
con.connect(function(err){
    if(err) throw err;
});

module.exports = con;