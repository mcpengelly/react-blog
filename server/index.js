// server/index.js

'use strict';

// setup process.env variables
require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});
