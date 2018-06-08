var pgp = require('pg-promise')({})
const mailer = require('nodemailer')
const changeCase = require('change-case')
const passport = require('passport')
const multer = require('multer')
const path = require('path')
const camelcaseKeys = require('camelcase-keys')
const LocalStrategy = require('passport-local').Strategy
const bodyParser = require('body-parser')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

const pgpConfig = {
  host: process.env.PGHOST || 'localhost',
  user: process.env.PGUSER || 'mapengel', // postgres
  password: process.env.PGPASS || 'postgres',
  database: process.env.PGDATABASE || 'postgres',
  port: process.env.PGPORT || 5432
}

const db = pgp(pgpConfig)

// Mailer
const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'burnermcbernstein@gmail.com',
    pass: process.env.BURNER_PASS
  }
})

const HOSTNAME = process.env.HOSTNAME || 'http://localhost:3000'
const HTTP_INTERNAL_SERVER_ERROR = 500
const HTTP_CREATED = 201
const HTTP_ACCEPTED = 202

// Basic authentication
passport.use(
  new LocalStrategy(function (username, password, done) {
    db
      .one('SELECT password FROM users WHERE username = $1', [username])
      .then(user => {
        console.log(user)
        if (!password || !user) {
          done('invalid credentials')
        }

        if (password !== user.password) {
          done('invalid credentials')
        }

        done(null, user)
      })
      .catch(error => {
        done(error)
      })
  })
)

module.exports = function (app) {
  // req body middleware
  app.use(require('cookie-parser')())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(
    require('express-session')({
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
      cookie: {
        httpOnly: false,
        secure: false
      }
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser(function (user, done) {
    console.log('serializeUser:', user)
    done(null, user)
  })

  passport.deserializeUser(function (usr, done) {
    console.log('deserializeUser:', usr)
    db
      .one('SELECT * FROM users WHERE password = $1', [usr.password])
      .then(user => {
        done(null, user)
      })
      .catch(error => {
        done(error)
      })
  })

  // Generic GET all
  function getAll (relation) {
    app.get(`/api/${relation}`, (req, res) => {
      db
        .any(`SELECT * from ${relation}`)
        .then(data => {
          if (data.length < 1) {
            res.send(`no ${relation} found`)
          } else {
            // send back a list of entries with their keys camelCased
            res.json(data.map(obj => camelcaseKeys(obj)))
          }
        })
        .catch(err => {
          res.status(HTTP_INTERNAL_SERVER_ERROR).send(err)
        })
    })
  }

  // Generic GET by id
  function getOneById (relation) {
    app.get(`/api/${relation}/:id`, (req, res) => {
      db
        .one(`SELECT * from ${relation} WHERE id = $1`, [req.params.id])
        .then(data => {
          res.json(camelcaseKeys(data))
        })
        .catch(err => {
          res.status(HTTP_INTERNAL_SERVER_ERROR).send(err)
        })
    })
  }

  // Generic DELETE by id
  function deleteById (relation) {
    app.delete(`/api/${relation}/:id`, (req, res) => {
      db
        .none(`DELETE FROM ${relation} WHERE id = $1`, [req.params.id])
        .then(() => {
          res.send(`${relation} ID: ${req.params.id} has been deleted`)
        })
        .catch(err => {
          res.status(HTTP_INTERNAL_SERVER_ERROR).send(err)
        })
    })
  }

  // Generic CREATE route
  function createOne (relation, targetKeys) {
    app.post(
      `/api/${relation}`,
      upload.single('file'),
      // passport.authenticate('basic', {
      //   session: true
      // }),
      (req, res) => {
        console.log('req.user', req.user)

        let data
        if (req.file) {
          data = { ...req.body, img: req.file.originalname }
        } else {
          data = req.body
        }

        const table = changeCase.snakeCase(relation)
        const filteredData = _filterData(data, targetKeys)
        console.log('projects filteredData', filteredData)

        db_createOne(table, filteredData)
          .then(result => {
            res.json({ msg: `created new ${table}, id: ${result.id}` })
          })
          .catch(err => {
            res.status(HTTP_INTERNAL_SERVER_ERROR).send(err)
          })
      }
    )
  }

  function db_createOne (table, data) {
    const sortedKeys = Object.keys(data).sort()

    // assumes db columns are snake cased
    const fields = sortedKeys.map(_snakeCase).join(',')
    const values = sortedKeys.map(_prepValueAccessors).join(',')

    return db.one(
      `INSERT INTO ${table} (${fields}) VALUES (${values}) RETURNING id`,
      data
    )
  }

  // Generic UPDATE route
  function updateById (relation, targetKeys) {
    app.put(`/api/${relation}/:id`, upload.single('file'), (req, res) => {
      const id = req.params.id
      const data = req.body

      // update the image location if image data was sent
      if (req.file) {
        data.img = req.file.originalname
      }

      const table = changeCase.snakeCase(relation)
      const filteredData = _filterData(data, targetKeys)

      db_updateById(table, id, filteredData)
        .then(result => {
          res
            .status(HTTP_ACCEPTED)
            .json({ msg: `updated existing ${table}, id: ${result.id}` })
        })
        .catch(err => {
          res.status(HTTP_INTERNAL_SERVER_ERROR).send(err)
        })
    })
  }

  function db_updateById (table, id, data) {
    const sortedKeys = Object.keys(data).sort()

    // assumes db columns are snake cased
    const fields = sortedKeys.map(_snakeCase).join(',')
    const values = sortedKeys.map(_prepValueAccessors).join(',')

    return db.one(
      `UPDATE ${table} SET (${fields}) = (${values}) WHERE id = '${id}' RETURNING id`,
      data
    )
  }

  function _filterData (data, targetKeys) {
    return Object.keys(data)
      .filter(key => targetKeys.includes(key))
      .reduce((obj, key) => {
        // set object keys equal to data's values
        obj[key] = data[key]
        return obj
      }, {})
  }

  function _snakeCase (key) {
    return changeCase.snakeCase(key)
  }

  function _prepValueAccessors (key) {
    return '${' + key + '}'
  }

  /** projects api **/
  getAll('projects')
  getOneById('projects')
  deleteById('projects')
  createOne('projects', [
    'id',
    'title',
    'description',
    'lastUpdatedDate',
    'img'
  ])
  updateById('projects', ['title', 'description', 'lastUpdatedDate', 'img'])

  function notifyActiveSubscribers (post) {
    // mail all active subscribers
    db
      .any('SELECT * FROM subscribers WHERE active = TRUE')
      .then(activeSubscribers => {
        // TODO? send 1 volley of emails
        if (activeSubscribers && activeSubscribers.length) {
          activeSubscribers.forEach(sub => {
            const path = `/api/unsubscribe/${sub.id}`
            const mailOptions = {
              from: '"Burna" <burnermcbernstein@gmail.com>',
              to: sub.email,
              subject: `New Post, ${post.title} is available at ${HOSTNAME}`,
              html: `
                A new post is up! check it out
                <a href="${HOSTNAME}" target="_blank">
                    Here
                </a>

                Tired of emails?
                <a href="${HOSTNAME + path}" target="_blank">
                    Unsubscribe
                </a>
              `
            }

            transporter.sendMail(mailOptions)
          })
        }
      })
    return post.id
  }

  /** posts api **/
  getAll('posts')
  getOneById('posts')
  deleteById('posts')
  createAndCallback(
    'posts',
    ['id', 'title', 'content', 'catchPhrase', 'lastUpdatedDate', 'img'],
    notifyActiveSubscribers
  )
  updateById('posts', [
    'title',
    'content',
    'catchPhrase',
    'lastUpdatedDate',
    'img'
  ])

  /* login api */
  app.post(
    '/api/login',
    passport.authenticate('local', {
      // successRedirect: '/profile',
      // failureRedirect: '/error'
    }),
    (req, res) => {
      res.send('authenticated!')
    }
  )

  app.get('/api/logout', (req, res) => {
    req.logout()
    // res.redirect('/')
  })

  function isAuthenticated (req, res, next) {
    console.log('req.user', req.user)
    if (req.user) {
      return next()
    } else {
      return res.status(401).json({
        error: 'User not authenticated'
      })
    }
  }

  app.get('/profile', isAuthenticated, (req, res) => {
    res.send('user profile access')
  })

  // mailer: emails me on behalf of user
  app.post('/api/send-mail', (req, res) => {
    const mailOptions = {
      from: '"Burna" <burnermcbernstein@gmail.com>', // sender address
      to: 'pengelly.mat@gmail.com',
      subject: `Hello from: ${req.body.email || 'Unknown'}`,
      text: `${req.body.name || 'Anonymous'} has sent you: ${req.body.message}`
    }

    transporter.sendMail(mailOptions, err => {
      if (err) {
        throw err
      }
    })

    res.redirect('/about')
  })

  // checks if user is in the mailing list, if not, add him and set active = false
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
            return t.one(
              'INSERT INTO subscribers (email, active) VALUES ($1, $2) returning id',
              [req.body.subscriberEmail, false]
            )
          } else {
            return existingUser
          }
        })
        .then(user => {
          // mail the subscriber a confirmation email
          const path = `/api/confirm/${user.id}`
          const mailOptions = {
            from: '"Burna" <burnermcbernstein@gmail.com>', // sender address
            to: [req.body.subscriberEmail],
            subject: `Subscriber Confirmation for mattpengelly.com`,
            html: `
                Click the button below to confirm your subscription to <strong>mattpengelly.com</strong> and receive updates for new blogposts. If you didn't subscribe please ignore this email, you will not receive any further emails.

                <a href="${HOSTNAME + path}" target="_blank">
                    Subscribe
                </a>
            `
          }

          transporter.sendMail(mailOptions)
        })
        .then(() => {
          res.status(HTTP_ACCEPTED).send('mailing list updated')
        })
        .catch(err => {
          res.send(err)
        })
    })
  })

  // lookup subscriber by id and set active = true
  // jumps to .catch if query doesnt find any subscriber with the correct id
  // is url params the best way to do this? there might be other ways?
  app.get('/api/confirm/:id', (req, res) => {
    db
      .one('UPDATE subscribers SET active = TRUE WHERE id = $1 returning *', [
        req.params.id
      ])
      .then(sub => {
        if (sub) {
          // mail the subscriber a success email
          const path = `/api/unsubscribe/${sub.id}`
          const mailOptions = {
            from: '"Burna" <burnermcbernstein@gmail.com>', // sender address
            to: [sub.email],
            subject: `Successfully added to mattpengelly.com mailing list`,
            html: `
                You've been added to mattpengelly.com mailing list, you'll receive an email when new blog posts are available.

                Tired of emails?
                <a href="${HOSTNAME + path}" target="_blank">
                    Unsubscribe
                </a>
            `
          }

          transporter.sendMail(mailOptions)
        }
      })
      .then(() => {
        res.status(HTTP_ACCEPTED).send(`Successfully added as a subscriber!`)
      })
      .catch(err => {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send(err)
      })
  })

  app.get('/api/unsubscribe/:id', (req, res) => {
    db
      .none('UPDATE subscribers SET active = FALSE WHERE id = $1', [
        req.params.id
      ])
      .then(() => {
        res
          .status(HTTP_ACCEPTED)
          .send(
            "You've been removed from the subscriber list and will no longer receive emails from mattpengelly.com"
          )
      })
      .catch(err => {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send(err)
      })
  })

  function createAndCallback (relation, targetKeys, callback) {
    // app.post('/api/posts', [isAuthenticated, upload.single('file')], (req, res) => {
    app.post('/api/posts', isAuthenticated, (req, res) => {
      console.log('req.file', req.file)
      const data = { ...req.body, img: req.file ? req.file.originalname : '' }
      const filteredData = _filterData(data, targetKeys)

      db_createOne(relation, filteredData)
        .then(callback)
        .then(postId => {
          res.status(HTTP_CREATED).send(`new post created, id: ${postId}`)
        })
        .catch(err => {
          res.status(HTTP_INTERNAL_SERVER_ERROR).send(err)
        })
    })
  }
}
