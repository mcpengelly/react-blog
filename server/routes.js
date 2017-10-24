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

	function getAll(relation){
		app.get(`/api/${relation}`, (req, res) => {
			db
				.any(`SELECT * from ${relation}`)
				.then(data => {
					if (data.length < 1) {
						res.send('no ${relation} found');
					} else {
						res.send(data);
					}
				})
				.catch(err => {
					res.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
				});
		});
	}

	function getOneById(relation){
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

	function deleteById(relation){
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
					console.log(err);
					res.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
				});
		}
	);

	/**
		blog posts api
	*/

	// CREATE new blog post
	app.post(
		'/api/posts',
		passport.authenticate('basic', {
			session: false
		}),
		(req, res) => {
			uid = shortid.generate();
			querystring = 'INSERT INTO posts (id, title, content) VALUES ($1, $2, $3)';

			db
				.none(querystring, [uid, req.body.title, req.body.content])
				.then(() => {
					res.status(HTTP_CREATED).send(`new post with ID: ${uid} created`);
				})
				.catch(err => {
					res.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
				});
		}
	);

	// TODO: allow for partial updates (PATCH?)
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

	// Mail Service
	app.post('/api/send-mail', (req, res) => {
		// setup email data with unicode symbols
		const mailOptions = {
			from: '"Burna" <burnermcbernstein@gmail.com>', // sender address
			to: 'pengelly.mat@gmail.com',
			subject: `Hello from: ${req.body.email || 'Unknown'}`,
			text: `${req.body.name || 'Anonymous'} has sent you: ${req.body.message}`
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, err => {
			if (err) {
				throw err;
			}
			console.log('mail sent.');
		});

		res.redirect('/about');
	});

	// Subscribe
	// only insert a new subscriber if the email isnt already in the mailing list
	// TODO: sometimes breaks, need FE to show different messages based on response data
	app.post('/api/subscribe', (req, res) => {
		db.task('getInsertUserId', t => {
			return t
				.oneOrNone(
					'SELECT email FROM subscribers WHERE email = $1',
					req.body.subscriberEmail,
					u => u && u.email
				)
				.then(userEmail => {
					//if userEmail doesnt exist then run a query to add it
					return t.none(
						'INSERT INTO subscribers(email) VALUES($1)',
						req.body.subscriberEmail
					);
				})
				.then(()=>{
					res.send('hey')
				})
				.catch(err => {
					res.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
				});
		})
	});
};
