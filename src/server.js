/**
 * TASK TWO
 */

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const server = express();
const nestify = require('./').nestify

server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyparser.urlencoded({ extended: true }));
server.use((q, p, n) => {
	p.setHeader('Access-Control-Allow-Origin', '*');
	p.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
	p.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
	q.method == 'OPTIONS' ? p.status(200).send("OK") : n();
});


server.all('/', (q, p) => {

});

server.listen(3000, () => {
	console.log('');
});

module.exports = server;