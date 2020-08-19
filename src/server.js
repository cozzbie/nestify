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
server.use(bodyParser.urlencoded({ extended: true }));
server.use((q, p, n) => {
	p.setHeader('Access-Control-Allow-Origin', '*');
	p.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
	p.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
	q.method == 'OPTIONS' ? p.status(200).send("OK") : n();
});


/**
 * Username/Password check
 * @param {Array} arr 
 */
const verifyCredentials = ([username, password]) => {
	if (username === 'admin' && password === 'admin') {
		return Promise.resolve();
	}
	return Promise.reject();
};


/**
 * Middleware for Basic Auth
 */
server.use(async (req, resp, next) => {
	const auth = req.headers['authorization'];

	if (auth) {
		const authParts = auth.split(' ');
		const type = authParts[0];

		if (type === 'Basic') {
			const token = authParts[1];
			const creds = Buffer.from(token, 'base64').toString('ascii');

			try {
				await verifyCredentials(creds.split(':'));
				return next();
			} catch (e) {
				return resp.status(401).send('The username/password provided is not valid');
			}
		} else {
			return resp.status(401).send('Invalid Authenctication Category.');
		}
	}

	return resp.status(401).send('Unauthorized.');
});


server.get('/', (req, resp) => {
	return resp.send('Please use a POST request to make a Nestify call');
});

server.post('/*', (req, resp) => {
	const args = req.path.split('/').slice(1);
	const json = req.body;
	const output = nestify({ json, args })

	return resp.send(output);
});

server.listen(2020, () => console.log('Nestify server listening'));

module.exports = server;