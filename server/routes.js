var pgp = require('pg-promise')({});
const mailer = require('nodemailer');
const shortid = require('shortid');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const pgpConfig = {
	host: process.env.PGHOST || 'localhost',
	user: process.env.PGUSER || 'postgres',
	password: process.env.PGPASS || 'postgres',
	database: process.env.PGDATABASE || 'postgres',
	port: 5432
};

// Mailer
const transporter = mailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'burnermcbernstein@gmail.com',
		pass: process.env.BURNER_PASS
	}
});

const db = pgp(pgpConfig);

let querystring = '';
let uid;

const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_ACCEPTED = 202;

passport.use(
	new BasicStrategy(function(username, password, done) {
		db
			.one('SELECT password FROM users WHERE username = $1', [username])
			.then(user => {
				if (password === user.password) {
					done(null, user);
				} else {
					done(null, false);
				}
			})
			.catch(error => {
				done(null, error);
			});
	})
);

module.exports = function(app) {
	//TODO: find a better name for these
	function getAll(relation) {
		app.get(`/api/${relation}`, (req, res) => {
			db
				.any(`SELECT * from ${relation}`)
				.then(data => {
					if (data.length < 1) {
						res.send(`no ${relation} found`);
					} else {
						res.send(data);
					}
				})
				.catch(err => {
					res.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
				});
		});
	}

	function getOneById(relation) {
		app.get(`/api/${relation}/:id`, (req, res) => {
			db
				.one(`SELECT * from ${relation} WHERE id = $1`, [req.params.id])
				.then(data => {
					//TODO: return different message when nothing found?
					res.send(data);
				})
				.catch(err => {
					res.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
				});
		});
	}

	function deleteById(relation) {
		app.delete(
			`/api/${relation}/:id`,
			passport.authenticate('basic', {
				session: false
			}),
			(req, res) => {
				db
					.none(`DELETE FROM ${relation} WHERE id = $1`, [req.params.id])
					.then(() => {
						res.send(`${relation} ID: ${req.params.id} has been deleted`);
					})
					.catch(err => {
						res.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
					});
			}
		);
	}

	getAll('projects');
	getAll('posts');
	getOneById('projects');
	getOneById('posts');
	deleteById('projects');
	deleteById('posts');

	// a function that creates one database entry
	function db_createOne(table, data) {
		const fields = data
			.map(key => {
				return key;
			})
			.join(',');

		const values = data
			.map(key => {
				return '${' + key + '}';
			})
			.join(',');

		db
			.one(`INSERT INTO ${relation} (${fields}) VALUES (${values}) returning id`)
			.then(id => {
				console.log(id);
				res.send(id);
			})
			.catch(err => {
				res.send(err);
			});
	}
	// a function that accepts a reques to create a database entry
	function createOne(relation, targetKeys) {
		app.post(`/api/${relation}`, (req, res) => {});
	}
	// CREATE new project
	app.post(
		'/api/projects',
		passport.authenticate('basic', {
			session: false
		}),
		(req, res) => {
			uid = shortid();
			querystring = `
				INSERT INTO projects (id, title, description, img) VALUES ($1, $2, $3, $4)
			`;

			db
				.none(querystring, [uid, req.body.title, req.body.description, req.body.img])
				.then(() => {
					res.status(HTTP_CREATED).send(`project created with id: ${uid}`);
				})
				.catch(err => {
					res.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
				});
		}
	);

	// TODO: allow for partial updates (PATCH?)
	// UPDATE existing project using id
	app.put(
		'/api/projects/:id',
		passport.authenticate('basic', {
			session: false
		}),
		(req, res) => {
			querystring = `
				UPDATE projects SET title = $1, description = $2, img = $3 WHERE id = $4
			`;
			db
				.none(querystring, [
					req.body.title,
					req.body.description,
					req.body.img,
					req.params.id
				])
				.then(() => {
					res.send(`updated project: ${req.params.id}`);
				})
				.catch(err => {
					res.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
				});
		}
	);

	// CREATE new blog post
	app.post(
		'/api/posts',
		passport.authenticate('basic', {
			session: false
		}),
		(req, res) => {
			uid = shortid.generate();
			querystring =
				'INSERT INTO posts (id, title, content) VALUES ($1, $2, $3) returning title';

			db
				.one(querystring, [uid, req.body.title, req.body.content])
				.then(post => {
					// mail all active subscribers
					db
						.any('SELECT * FROM subscribers WHERE active = TRUE')
						.then(activeSubscribers => {
							// TODO? send 1 volley of emails
							if (activeSubscribers) {
								activeSubscribers.forEach(sub => {
									const hostname =
										process.env.HOSTNAME || 'http://localhost:9000';
									const path = `/api/unsubscribe/${sub.id}`;
									const mailOptions = {
										from: '"Burna" <burnermcbernstein@gmail.com>',
										to: sub.email,
										subject: `New Post, ${post.title} is available at mattpengelly.com`,
										html: `
											A new post is up! check it out
											<a href="${hostname}">here</a>

											Tired of emails?
											<a href="${hostname + path}">Unsubscribe</a>
										`
									};

									transporter.sendMail(mailOptions);
								});
							}
						})
						.catch(err => {
							throw err;
						});
				})
				.then(() => {
					res.status(HTTP_CREATED).send(`new post with ID: ${uid} created`);
				})
				.catch(err => {
					res.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
				});
		}
	);

	// TODO: allow for partial updates (PATCH)
	// UPDATE existing blog post using id
	app.put(
		'/api/posts/:id',
		passport.authenticate('basic', {
			session: false
		}),
		(req, res) => {
			querystring = 'UPDATE posts SET title = $1, content = $2 WHERE id = $3';

			db
				.none(querystring, [req.body.title, req.body.content, req.params.id])
				.then(() => {
					res.send(`updated post: ${req.params.id}`);
				})
				.catch(err => {
					res.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
				});
		}
	);

	// mailer: emails me on behalf of user
	app.post('/api/send-mail', (req, res) => {
		const mailOptions = {
			from: '"Burna" <burnermcbernstein@gmail.com>', // sender address
			to: 'pengelly.mat@gmail.com',
			subject: `Hello from: ${req.body.email || 'Unknown'}`,
			text: `${req.body.name || 'Anonymous'} has sent you: ${req.body.message}`
		};

		transporter.sendMail(mailOptions, err => {
			if (err) {
				throw err;
			}
		});

		res.redirect('/about');
	});

	// checks if user is in the mailing list, if not, add him and set active = false
	// TODO refactor with named promises?
	app.post('/api/subscribe', (req, res) => {
		db.task('insertIfNotExists', t => {
			return t
				.oneOrNone(
					'SELECT * FROM subscribers WHERE email = $1',
					req.body.subscriberEmail,
					u => u
				)
				.then(existingUser => {
					if (!existingUser) {
						uid = shortid();
						return t.one(
							'INSERT INTO subscribers (id, email, active) VALUES ($1, $2, $3) returning id',
							[uid, req.body.subscriberEmail, false]
						);
					} else {
						return existingUser;
					}
				})
				.then(user => {
					//mail the subscriber a confirmation email
					const hostname = process.env.HOSTNAME || 'http://localhost:9000';
					const path = `/api/confirm/${user.id}`;
					const mailOptions = {
						from: '"Burna" <burnermcbernstein@gmail.com>', // sender address
						to: [req.body.subscriberEmail],
						subject: `Subscriber Confirmation for mattpengelly.com`,
						html: `
							Click the button below to confirm your subscription to <strong>mattpengelly.com</strong> and receive updates for new blogposts. If you didn't subscribe please ignore this email, you will not receive any further emails.
							<a href="${hostname + path}">Subscribe</a>
						`
					};

					transporter.sendMail(mailOptions);
				})
				.then(() => {
					res.status(HTTP_ACCEPTED).send('mailing list updated');
				})
				.catch(err => {
					res.send(err);
				});
		});
	});

	// lookup subscriber by id and set active = true
	// jumps to .catch if query doesnt find any subscriber with the correct id
	// is there a better way to handle this?
	// is url params the best way to do this? there might be other ways?
	// TODO refactor with named promises?
	app.get('/api/confirm/:id', (req, res) => {
		db
			.one('UPDATE subscribers SET active = TRUE WHERE id = $1 returning *', [req.params.id])
			.then(sub => {
				if (sub) {
					//mail the subscriber a success email
					const hostname = process.env.HOSTNAME || 'http://localhost:9000';
					const path = `/api/unsubscribe/${sub.id}`;
					const mailOptions = {
						from: '"Burna" <burnermcbernstein@gmail.com>', // sender address
						to: [sub.email],
						subject: `Successfully added to mattpengelly.com mailing list`,
						html: `
							You've been added to mattpengelly.com mailing list, you'll receive an email when new blog posts are available.

							Tired of emails? <a href="${hostname + path}">Unsubscribe</a>
						`
					};

					transporter.sendMail(mailOptions);
				}
			})
			.then(() => {
				res.status(HTTP_ACCEPTED).send(`Successfully added as a subscriber!`);
			})
			.catch(err => {
				res.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
			});
	});

	app.get('/api/unsubscribe/:id', (req, res) => {
		db
			.none('UPDATE subscribers SET active = FALSE WHERE id = $1', [req.params.id])
			.then(() => {
				res
					.status(HTTP_ACCEPTED)
					.send(
						"You've been removed from the subscriber list and will no longer receive emails from mattpengelly.com"
					);
			})
			.catch(err => {
				res.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
			});
	});
};
