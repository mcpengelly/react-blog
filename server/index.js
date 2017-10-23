// server/index.js

"use strict";
const fs = require('fs');
const https = require('https');

const app = require('./app');
const DEV_PORT = process.env.PORT || 9000;
const PRODUCTION_PORT = process.env.PRODUCTION_PORT || 8443;

app.listen(DEV_PORT, () => {
	console.log(`App listening on port ${DEV_PORT}!`);
});


// Prod
// if(process.env.NODE_ENV === 'production'){
	var sslOptions = {
	  key: fs.readFileSync('./ssl/key.pem'),
	  cert: fs.readFileSync('./ssl/cert.pem'),
	  passphrase: 'boag'
	};

	https.createServer(sslOptions, app).listen(PRODUCTION_PORT)
// }
