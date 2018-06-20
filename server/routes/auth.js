const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bodyParser = require('body-parser')

// TODO: other forms of authentication?
// JWT, Google?
module.exports = (app, db) => {
  // Local authentication
  passport.use(
    new LocalStrategy((username, password, done) => {
      db
        .one('SELECT * FROM users WHERE username = $1', [username])
        .then(user => {
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

  // req body middleware
  app.use(require('cookie-parser')())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(
    require('express-session')({
      secret: 'keyboard cat', // what should this be?
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

  passport.serializeUser((user, done) => {
    console.log('serializeUser:', user)
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    console.log('deserializeUser:', id)
    db
      .one('SELECT * FROM users WHERE id = $1', [id])
      .then(user => {
        done(null, user)
      })
      .catch(error => {
        done(error)
      })
  })

  /**
   * Authentication: Handles Logging into session
   */
  app.post(
    '/api/login',
    passport.authenticate('local', {
      // successRedirect: '/profile',
      // failureRedirect: '/error'
    }),
    (req, res) => {
      res.json({ isLoggedIn: true })
    }
  )

  /**
   * Authentication: Handles logging out of passportjs session (deletes req.user object)
   */
  app.get('/api/logout', (req, res) => {
    req.logout()
    // res.redirect('/')
  })
}
