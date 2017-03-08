const pg = require('pg');
const mailer = require('nodemailer');

const pool = new pg.Pool({
	user: 'matthewpengelly',
	password: 'postgres',
	database: 'mydb',
	host: 'localhost',
	max: 10, // max number of clients in pool
	idleTimeoutMillis: 1000,
	port: 5432
});


module.exports = function(app){
	// Projects API
	// GET list of projects
	app.get('/api/projects', (req, res) => {
		pool.connect((err, client, release) => {
			if (err) {
				res.status(500);
				throw err;
			}

			client.query('SELECT * FROM projects', (err, result) => {
				if (err) {
					res.status(500);
					throw err;
				}
				// was successful
				res.status(200);
				if(result && result.rows) {
					release();
					res.send(result.rows);
				} else {
					release();
					res.send('no projects in the database');
				}
			});
		});
	});

	// CREATE new project
	//TODO: ID
	app.post('/api/projects', (req, res) => {
		// authenticate?
		pool.connect((err, client, release) => {
			if (err) {
				res.status(500);
				throw err;
			}

			const querystring = `INSERT INTO projects VALUES ('${req.query.title}', '${req.query.description}')`;
			client.query(querystring, (err, result) => {
				if (err) {
					res.status(500);
					throw err;
				}

				// was successful
				res.status(200);
				release();
				res.send(result.rows);
			});
		});
	});
	// TODO: UPDATE project
	// TODO: DELETE project

	//TODO: Blogpost api

	// Mailer
	const transporter = mailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'gmail.user@gmail.com',
			pass: 'yourpass'
		}
	});

	app.post('/api/send-mail', (req, res) => {
		// setup email data with unicode symbols
		const mailOptions = {
			from: '"Burna" <burner@gmail.com>', // sender address
			to: 'pengelly.mat@gmail.com',
			subject: `Hello from: ${req.body.email}`,
			text: `${req.body.name} has sent you: ${req.body.message}`
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);
			}
			console.log('Message %s sent: %s', info.messageId, info.response);
		});
		res.status(200);
		res.send('email sent');
	});
};
