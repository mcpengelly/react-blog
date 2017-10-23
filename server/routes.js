const pg = require("pg");
var pgp = require('pg-promise')({
    // Initialization Options
});
const mailer = require("nodemailer");
const shortid = require("shortid");
const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;

const pool = new pg.Pool({
	host: process.env.PGHOST || 'localhost',
	user: process.env.PGUSER || 'postgres',
	password: process.env.PGPASS || 'postgres',
	database: process.env.PGDATABASE || 'postgres',
	max: 10, // max number of clients in pool
	idleTimeoutMillis: 1000,
	port: 5432
});

let querystring = '';
let uid;

//**
const pgpConfig = {
	host: process.env.PGHOST || 'localhost',
	user: process.env.PGUSER || 'postgres',
	password: process.env.PGPASS || 'postgres',
	database: process.env.PGDATABASE || 'postgres',
	port: 5432
};
const db = pgp(pgpConfig);
//**

passport.use(
	new BasicStrategy(function(username, password, done) {
		//****
		// pool.connect((err, client, release) => {
		// 	if (err) {
		// 		return done(err);
		// 	}
		// 	let pwQuery = `SELECT password FROM users WHERE username = '${username}'`;
		// 	client.query(pwQuery, (err, result) => {
		// 		if (err) {
		// 			return done(err);
		// 		}

		// 		release();
		// 		if (!result) {
		// 			return done(null, false);
		// 		}

		// 		console.log("result.rows[0]:", result.rows[0]);
		// 		if (result.rows[0] && result.rows[0].password === password) {
		// 			return done(null, result);
		// 		}
		// 	});
		// });
		//****
		db
		.one('SELECT password FROM users WHERE username = $1', [username])
		.then((data) => {
			if(!data) {
				done(null, false)
			}
			else {
				done(null, data)
			}
		})
		.catch((error) => {
			done(null, error)
		});
	})
);

module.exports = function(app) {
	/**
		projects api
	 */
	// GET list of projects
	app.get("/api/projects", (req, res) => {
		// pool.connect((err, client, release) => {
		// 	if (err) {
		// 		throw err;
		// 	}

		// 	client.query("SELECT * FROM projects", (err, result) => {
		// 		if (err) {
		// 			throw err;
		// 		}

		// 		// was successful
		// 		release();
		// 		if (result && result.rows) {
		// 			res.send(result.rows);
		// 		}
		// 	});
		// });
		db
		.any('SELECT * from projects')
		.then((projects) => {
			if(!projects) {
				res.status(204).send('no projects found');
			}
			else {
				res.status(200).send(projects);
			}
		})
		.catch((err) => {
			res.status(500).send(err);
		})
	});

	// CREATE new project
	app.post(
		"/api/projects",
		passport.authenticate("basic", {
			session: false
		}),
		(req, res) => {
			pool.connect((err, client, release) => {
				if (err) {
					throw err;
				}

				uid = shortid.generate();
				querystring = `
					INSERT INTO projects
						(id, title, description, img)
						VALUES (
							'${uid}',
							'${req.body.title || null}',
							'${req.body.description || null}',
							'${req.body.img || null}'
						)
				`;

				client.query(querystring, err => {
					if (err) {
						throw err;
					}

					// was successful
					release();
					res.send("insert finished");
				});
			});
		}
	);

	// TODO: allow for partial updates (PATCH?)
	// UPDATE existing project using id
	app.put(
		"/api/projects/:id",
		passport.authenticate("basic", {
			session: false
		}),
		(req, res) => {
			pool.connect((err, client, release) => {
				if (err) {
					throw err;
				}

				querystring = `
					UPDATE projects SET
						title 		= '${req.body.title || null}',
						description = '${req.body.description || null}',
						img 		= '${req.body.img || null}'
						WHERE id	= '${req.params.id}'
				`;

				client.query(querystring, err => {
					if (err) {
						throw err;
					}

					// was successful
					release();
					res.send("update finished");
				});
			});
		}
	);

	// DELETE existing project using id
	app.delete(
		"/api/projects/:id",
		passport.authenticate("basic", {
			session: false
		}),
		(req, res) => {
			pool.connect((err, client, release) => {
				if (err) {
					throw err;
				}

				querystring = `DELETE FROM projects WHERE id = '${req.params.id}'`;
				client.query(querystring, err => {
					if (err) {
						throw err;
					}

					// was successful
					release();
					res.send("delete finished");
				});
			});
		}
	);

	/**
		blog posts api
	*/
	// GET list of blog posts
	app.get("/api/posts", (req, res) => {
		// pool.connect((err, client, release) => {
		// 	if (err) {
		// 		throw err;
		// 	}

		// 	client.query("SELECT * FROM posts", (err, result) => {
		// 		if (err) {
		// 			throw err;
		// 		}

		// 		// was successful
		// 		release();
		// 		if (result && result.rows) {
		// 			res.send(result.rows);
		// 		} else {
		// 			res.send("no posts in database");
		// 		}
		// 	});
		// });

		db
		.any('SELECT * FROM posts')
		.then((posts) => {
			if(!posts) {
				res.status(204).send('no posts found');
			}
			else {
				res.status(200).send(posts);
			}
		})
		.catch((error) =>  {
			res.send(error)
		});

	});

	app.get("/api/posts/:id", (req, res) => {
		// pool.connect((err, client, release) => {
		// 	if (err) {
		// 		throw err;
		// 	}

		// 	client.query(
		// 		`SELECT * FROM posts WHERE id = '${req.params.id}'`,
		// 		(err, result) => {
		// 			if (err) {
		// 				throw err;
		// 			}

		// 			// was successful
		// 			release();
		// 			if (result && result.rows) {
		// 				res.send(result.rows);
		// 			} else {
		// 				res.send("no projects in the database");
		// 			}
		// 		}
		// 	);
		// });
		db
		.one('SELECT * from posts WHERE id = $1', [req.params.id])
		.then((post) => {
			if(!post) { //TOFIX
				res.status(204).send('post with id: ' + req.params.id + ' not found');
			}
			else {
				res.status(200).send(post);
			}
		})
		.catch((err) => {
			res.status(500).send(err);
		})

	});

	// CREATE new blog post
	app.post(
		"/api/posts",
		passport.authenticate("basic", {
			session: false
		}),
		(req, res) => {
			pool.connect((err, client, release) => {
				if (err) {
					throw err;
				}

				uid = shortid.generate();
				querystring = `
					INSERT INTO posts (id, title, content)
						VALUES (
							'${uid}',
							'${req.body.title || null}',
							'${req.body.content || null}'
						)
				`;

				client.query(querystring, err => {
					if (err) {
						throw err;
					}

					// was successful
					release();
					res.send("added new post");
				});
			});
		}
	);

	// TODO: allow for partial updates (PATCH?)
	// UPDATE existing blog post using id
	app.put(
		"/api/posts/:id",
		passport.authenticate("basic", {
			session: false
		}),
		(req, res) => {
			pool.connect((err, client, release) => {
				if (err) {
					throw err;
				}

				querystring = `
					UPDATE posts SET
						title 		= '${req.body.title || null}',
						content		= '${req.body.content || null}',
						WHERE id 	= '${req.params.id}'
				`;

				client.query(querystring, err => {
					if (err) {
						throw err;
					}

					// was successful
					release();
					res.send("updated post");
				});
			});
		}
	);

	// DELETE existing blog post using id
	app.delete(
		"/api/posts/:id",
		passport.authenticate("basic", {
			session: false
		}),
		(req, res) => {
			// pool.connect((err, client, release) => {
			// 	if (err) {
			// 		throw err;
			// 	}

			// 	querystring = `DELETE FROM posts WHERE id = '${req.params.id}'`;
			// 	client.query(querystring, err => {
			// 		if (err) {
			// 			throw err;
			// 		}

			// 		// was successful
			// 		release();
			// 		res.send("deleted post");
			// 	});
			// });

			db
			.none('DELETE FROM posts WHERE id = $1', [req.params.id])
			.then(() => {
				res.status(200).send('postID: ' + req.params.id + ' has been deleted');
			})
			.catch((err) => {
				res.status(500).send(err);
			})
		}
	);

	// Mailer
	const transporter = mailer.createTransport({
		service: "gmail",
		auth: {
			user: "burnermcbernstein@gmail.com",
			pass: process.env.BURNER_PASS
		}
	});

	app.post("/api/send-mail", (req, res) => {
		// setup email data with unicode symbols
		const mailOptions = {
			from: '"Burna" <burnermcbernstein@gmail.com>', // sender address
			to: "pengelly.mat@gmail.com",
			subject: `Hello from: ${req.body.email || "Unknown"}`,
			text: `${req.body.name || "Anonymous"} has sent you: ${req.body
				.message}`
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error) => {
			if (error) {
				throw error;
			}
			console.log("mail sent.");
		});

		res.redirect("/about");
	});
};
