const pg = require('pg');
const mailer = require('nodemailer');
const shortid = require('shortid');

const pool = new pg.Pool({
	user: process.env.USERNAME,
	password: process.env.POSTGRES_PASSWORD,
	database: 'mydb',
	host: process.env.APP_HOST,
	max: 10, // max number of clients in pool
	idleTimeoutMillis: 1000,
	port: 5432
});

let querystring = '';
let uid;

// db table agnostic GET all
function getRows(table, client){
	client.query(`SELECT * FROM ${table}`, (err, result) => {
		if (err) throw err;
		return result.rows;
	});
}

function lookupById(table, id){
	client.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, result) => {
		if (err) throw err;

		// was successful
		release();
		if(result && result.rows) {
			res.send(result.rows);
		}
	});
}


app.get('/api/projects/all', (req, res) => {
	pool.connect((err, client, release) => {
		if (err) {
			throw err;
		}
		console.log(getRows('projects', client))
		res.send(getRows('projects', client));
	});
});


module.exports = function(app) {
	/**
	 	projects api
	 */
	// GET list of projects
	app.get('/api/projects', (req, res) => {
		pool.connect((err, client, release) => {
			if (err) {
				throw err;
			}

			client.query('SELECT * FROM projects', (err, result) => {
				if (err) {
					throw err;
				}

				// was successful
				release();
				if(result && result.rows) {
					res.send(result.rows);
				}
			});
		});
	});

	// CREATE new project
	app.post('/api/projects', (req, res) => {
		// authenticate?
		pool.connect((err, client, release) => {
			if (err) {
				throw err;
			}

			uid = shortid.generate();
			querystring = `INSERT INTO projects
				(id, title, description, img)
				VALUES (
					'${uid}',
					'${req.body.title || null}',
					'${req.body.description || null}',
					'${req.body.img || null}'
				)`;

			client.query(querystring, (err, result) => {
				if (err) {
					throw err;
				}

				// was successful
				release();
				res.send('insert finished');
			});
		});
	});

	// TODO: allow for partial updates (PATCH?)
	// UPDATE existing project using id
	app.put('/api/projects/:id', (req, res) => {
		// authenticate?
		pool.connect((err, client, release) => {
			if (err) {
				throw err;
			}

			querystring = `UPDATE projects
				SET
				title 		= '${req.body.title || null}',
				description = '${req.body.description || null}',
				img 		= '${req.body.img || null}'
				WHERE id	= '${req.params.id}'
			`;

			client.query(querystring, (err) => {
				if (err) {
					throw err;
				}

				// was successful
				release();
				res.send('update finished');
			});
		});
	});

	// DELETE existing project using id
	app.delete('/api/projects/:id', (req, res) => {
		// authenticate?
		pool.connect((err, client, release) => {
			if (err) {
				throw err;
			}

			querystring = `DELETE FROM projects WHERE id = '${req.params.id}'`;
			client.query(querystring, (err) => {
				if (err) {
					throw err;
				}

				// was successful
				release();
				res.send('delete finished');
			});
		});
	});

	/**
		blog posts api
	*/
	// GET list of blog posts
	app.get('/api/posts', (req, res) => {
		pool.connect((err, client, release) => {
			if (err) {
				throw err;
			}

			client.query('SELECT * FROM posts', (err, result) => {
				if (err) {
					throw err;
				}

				// was successful
				release();
				if(result && result.rows) {
					res.send(result.rows);
				} else {
					res.send('no posts in database');
				}
			});
		});
	});

	app.get('/api/posts/:id', (req, res) => {
		pool.connect((err, client, release) => {
			if (err) {
				throw err;
			}

			client.query(`SELECT * FROM posts WHERE id = '${req.params.id}'`, (err, result) => {
				if (err) {
					throw err;
				}

				// was successful
				release();
				if(result && result.rows) {
					res.send(result.rows);
				} else {
					res.send('no projects in the database');
				}
			});
		});
	});

	// TODO: shortbody property is body's first 120 chracters
	// CREATE new blog post
	app.post('/api/posts', (req, res) => {
		// authenticate?
		pool.connect((err, client, release) => {
			if (err) {
				throw err;
			}

			uid = shortid.generate();
			querystring = `INSERT INTO posts
				(id, title, content, shortcontent)
				VALUES (
					'${uid}',
					'${req.body.title || null}',
					'${req.body.content || null}',
					'${req.body.content.substring(0, 120) + '...'}'
				)`;

			client.query(querystring, (err) => {
				if (err) {
					throw err;
				}

				// was successful
				release();
				res.send('added new post');
			});
		});
	});

	// TODO: allow for partial updates (PATCH?)
	// UPDATE existing blog post using id
	app.put('/api/posts/:id', (req, res) => {
		// authenticate?
		pool.connect((err, client, release) => {
			if (err) {
				throw err;
			}

			querystring = `UPDATE posts SET
				title 			= '${req.body.title || null}',
				content			= '${req.body.content || null}',
				shortcontent 	= '${req.body.content.substring(0, 120) + '...'}',
				WHERE id = '${req.params.id}'
			`;

			client.query(querystring, (err) => {
				if (err) {
					throw err;
				}

				// was successful
				release();
				res.send('updated post');
			});
		});
	});

	// DELETE existing blog post using id
	app.delete('/api/posts/:id', (req, res) => {
		// authenticate?
		pool.connect((err, client, release) => {
			if (err) {
				throw err;
			}

			querystring = `DELETE FROM posts WHERE id = '${req.params.id}'`;
			client.query(querystring, (err) => {
				if (err) {
					throw err;
				}

				// was successful
				release();
				res.send('deleted post');
			});
		});
	});

	// Mailer
	const transporter = mailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'burnermcbernstein@gmail.com',
			pass: process.env.BURNER_PASS
		}
	});

	app.post('/api/send-mail', (req, res) => {
		// setup email data with unicode symbols
		const mailOptions = {
			from: '"Burna" <burnermcbernstein@gmail.com>', // sender address
			to: 'pengelly.mat@gmail.com',
			subject: `Hello from: ${req.body.email}`,
			text: `${req.body.name} has sent you: ${req.body.message}`
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				throw error;
			}
			console.log('Message %s sent: %s', info.messageId, info.response);
		});
		res.status(200);
		res.redirect('/about');
		res.send('email sent');
	});
};