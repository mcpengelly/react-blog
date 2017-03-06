// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const mailer = require('nodemailer');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// req body middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});




// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'gmail.user@gmail.com',
		pass: 'yourpass'
	}
});

app.post('/send-mail', (req, res) => {
	// setup email data with unicode symbols
	let mailOptions = {
		from: '"Burna" <burner@gmail.com>', // sender address
		to: 'pengelly.mat@gmail.com',
		subject: 'Hello from: ' + req.body.email,
		text: req.body.name + ' has sent you: ' + req.body.message,
		html: '<b>Hello world ?</b>
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message %s sent: %s', info.messageId, info.response);
	});
});

module.exports = app;
