const mailer = require('nodemailer')
const changeCase = require('change-case')
const multer = require('multer')
const path = require('path')
const camelcaseKeys = require('camelcase-keys')

const {
  CREATED,
  ACCEPTED,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR
} = require('../http-status-codes')

const HOSTNAME = process.env.HOSTNAME || 'http://localhost:3000'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

// Mailer
const transporter = mailer.createTransport({
  // TODO: move this out of file?
  service: 'gmail',
  auth: {
    user: 'burnermcbernstein@gmail.com',
    pass: process.env.BURNER_PASS
  }
})

module.exports = function (app, db) {
  /**
   * Projects API: CRUD
   */
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

  /**
   * Posts API: CRUD
   */
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

  /**
   * Mailer: Sends me an email on behalf of the user
   */
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

  /**
   * Subscribe: Route for allowing new users to subscribe to email notifications
   */
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
          res.status(ACCEPTED).send('mailing list updated')
        })
        .catch(err => {
          res.status(INTERNAL_SERVER_ERROR).send(err)
        })
    })
  })

  // Authenticate user subscription
  // lookup subscriber by id and set active = true
  // jumps to .catch if query doesnt find any subscriber with the correct id
  // is url params the best way to do this? there might be other ways?

  /**
   * Subscribe: Route for confirming that the user is valid for email notifications
   */
  app.get('/api/confirm/:id', (req, res) => {
    db
      .one('UPDATE subscribers SET active = TRUE WHERE id = $1 returning *', [
        req.params.id
      ])
      .then(subscriber => {
        if (subscriber) {
          // mail the subscriber a success email
          const path = `/api/unsubscribe/${subscriber.id}`
          const mailOptions = {
            from: '"Burna" <burnermcbernstein@gmail.com>',
            to: [subscriber.email],
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
        res.status(ACCEPTED).send(`Successfully added as a subscriber!`)
      })
      .catch(err => {
        res.status(INTERNAL_SERVER_ERROR).send(err)
      })
  })

  /**
   * Subscribe: Route for unsubscribing from email notifications
   */
  app.get('/api/unsubscribe/:id', (req, res) => {
    db
      .none('UPDATE subscribers SET active = FALSE WHERE id = $1', [
        req.params.id
      ])
      .then(() => {
        res
          .status(ACCEPTED)
          .send(
            "You've been removed from the subscriber list and will no longer receive emails from mattpengelly.com"
          )
      })
      .catch(err => {
        res.status(INTERNAL_SERVER_ERROR).send(err)
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
          res.status(INTERNAL_SERVER_ERROR).send(err)
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
          res.status(INTERNAL_SERVER_ERROR).send(err)
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
          res.status(INTERNAL_SERVER_ERROR).send(err)
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

        dbCreateOne(table, filteredData)
          .then(result => {
            res.json({ msg: `created new ${table}, id: ${result.id}` })
          })
          .catch(err => {
            res.status(INTERNAL_SERVER_ERROR).send(err)
          })
      }
    )
  }

  function dbCreateOne (table, data) {
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

      dbUpdateById(table, id, filteredData)
        .then(result => {
          res
            .status(ACCEPTED)
            .json({ msg: `updated existing ${table}, id: ${result.id}` })
        })
        .catch(err => {
          res.status(INTERNAL_SERVER_ERROR).send(err)
        })
    })
  }

  function dbUpdateById (table, id, data) {
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

  /**
   * Checks that the req.user object exists, signalling that the user is authenticated and has a session
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next the next callback
   */
  function isAuthenticated (req, res, next) {
    console.log('req.user', req.user)
    if (req.user) {
      return next()
    } else {
      return res.status(UNAUTHORIZED).json({
        error: 'User not authenticated'
      })
    }
  }

  /**
   * Inserts a new row into the database and then invokes a callback function TODO: ? Could also have promisified createOne functions which would allow
   * ex: createOne(args).then(notifyActiveSubscribers) TODO: remove when complete
   * @param {string} relation table to affect
   * @param {Array} targetKeys keys that should be used
   * @param {Function} callback function to be called after the database is modified
   */
  function createAndCallback (relation, targetKeys, callback) {
    // TODO: test this functionality with notify
    app.post(
      '/api/posts',
      [isAuthenticated, upload.single('file')],
      (req, res) => {
        console.log('req.file', req.file)
        const data = { ...req.body, img: req.file ? req.file.originalname : '' }
        const filteredData = _filterData(data, targetKeys)

        dbCreateOne(relation, filteredData)
          .then(callback)
          .then(postId => {
            res.status(CREATED).send(`new post created, id: ${postId}`)
          })
          .catch(err => {
            res.status(INTERNAL_SERVER_ERROR).send(err)
          })
      }
    )
  }

  /**
   *
   * @param {Object} post the post object returned from the database
   */
  function notifyActiveSubscribers (post) {
    // mail all active subscribers
    db
      .any('SELECT * FROM subscribers WHERE active = TRUE')
      .then(activeSubscribers => {
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
}
