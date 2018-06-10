var mysql = require('mysql');
var dbconfig = {
    connectionLimit: 10,
    host: '35.193.193.132',
    port: 3306,
    user: 'root',
    password: 'dev-assist-06192018',
    database: 'bank_db',
    connectTimeout: 10000
};

var pool = mysql.createPool(dbconfig);

pool.getConnection(function (err, connection) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to Database!!!');
    }
});

pool.on('error', function (err) {
    console.log(err.code);
});

module.exports = pool;