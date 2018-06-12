var mysql = require('mysql');
var process = require('process');
var Knex = require('knex');

var dbconfig = {
    user: process.env.SQL_USER || 'root',
    password: process.env.SQL_PASSWORD || 'dev-assist-06192018',
    database: process.env.SQL_DATABASE || 'bank_db'
};

if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
    dbconfig.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
} else {
    dbconfig.host = '35.193.193.132';
}

var knex = Knex({
    client: 'mysql',
    connection: dbconfig
});

module.exports = knex;