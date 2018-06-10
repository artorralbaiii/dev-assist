'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API Router
var api = require('./api.js')(express);
app.use('/api', api);

app.use(express.static('./bower_components/'));
app.use(express.static('./src/client/'));
app.use(express.static('./'));
app.use('/*', express.static('./src/client/index.html'));

var server = require('http').Server(app);
var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('Express server is listening on port ' + port);
    console.log('\n ___dirname = ' + __dirname + '\nprocess.cwd = ' + process.cwd());
});