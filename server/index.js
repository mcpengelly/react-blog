'use strict';
const fs = require('fs');

const app = require('./app');
const HTTP_PORT = process.env.PORT || 4000;

app.listen(HTTP_PORT, () => {
	console.log(`App listening on port ${HTTP_PORT}!`);
});
