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
	/**
		projects api
	 */
	// GET list of projects
	app.get('/api/projects', (req, res) => {
		db
			.any('SELECT * from projects')
			.then(projects => {
				if (projects.length < 1) {
					res.send('no projects found');
				} else {
					res.send(projects);
				}
			})
			.catch(err => {
				res.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
			});
	});

	// GET project by id
	app.get('/api/projects/:id', (req, res) => {
		db
			.one('SELECT * from projects WHERE id = $1', [req.params.id])
			.then(post => {
				//TODO: return different message when nothing found?
				res.send(post);
			})
			.catch(err => {
				res.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
			});
	});

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

	// DELETE existing project using id
	app.delete(
		'/api/projects/:id',
		passport.authenticate('basic', {
			session: false
		}),
		(req, res) => {
			db
				.none('DELETE FROM projects WHERE id = $1', [req.params.id])
				.then(() => {
					res.send(`projects ID: ${req.params.id} has been deleted`);
				})
				.catch(err => {
					res.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
				});
		}
	);

	/**
		blog posts api
	*/
	// GET list of blog posts
	app.get('/api/posts', (req, res) => {
		db
			.any('SELECT * FROM posts')
			.then(posts => {
				if (posts.length < 1) {
					res.send('no posts found');
				} else {
					res.send(posts);
				}
			})
			.catch(error => {
				res.status(HTTP_INTERNAL_SERVER_ERROR).send(error);
			});
	});

	app.get('/api/posts/:id', (req, res) => {
		db
			.one('SELECT * from posts WHERE id = $1', [req.params.id])
			.then(post => {
				//TODO: return different message when nothing found?
				res.send(post);
			})
			.catch(err => {
				res.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
			});
	});

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

	// DELETE existing blog post using id
	app.delete(
		'/api/posts/:id',
		passport.authenticate('basic', {
			session: false
		}),
		(req, res) => {
			db
				.none('DELETE FROM posts WHERE id = $1', [req.params.id])
				.then(() => {
					res.send(`post ID: ${req.params.id} has been deleted`);
				})
				.catch(err => {
					res.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
				});
		}
	);

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
};
