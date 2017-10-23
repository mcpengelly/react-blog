// server/index.js

"use strict";

const app = require("./app");
const https = require("https");

const PORT = process.env.PORT || 9000;

/* Redirect http to https */
app.get('*', function(req,res,next) {
  if(req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production')
    res.redirect('https://'+req.hostname+req.url)
  else
    next() /* Continue to other routes if we're not redirecting */
});

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});



// Test in prod
// if(process.env.NODE_ENV === 'production'){
// 	https.createServer({}, app).listen(443);
// }
