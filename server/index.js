// server/index.js

'use strict';

const app = require('./app');
const https = require('https');

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});

// Test in prod
// if(process.env.NODE_ENV === 'production'){
// 	https.createServer({}, app).listen(443);
// }

