// server/index.js

'use strict';
const fs = require('fs');
const https = require('https');

const app = require('./app');
const HTTP_PORT = process.env.PORT || 80;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;

app.listen(HTTP_PORT, () => {
	console.log(`App listening on port ${HTTP_PORT}!`);
});

// Local https
if (process.env.NODE_ENV === 'dev') {
	var sslOptions = {
		key: fs.readFileSync(__dirname + '/ssl/server.key'),
		cert: fs.readFileSync(__dirname + '/ssl/server.cert')
	};

	https.createServer(sslOptions, app).listen(HTTPS_PORT);
}
