import React, { Component } from 'react'
import NotificationSystem from 'react-notification-system'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

const styles = {
  container: {
    padding: 25
  },
  textField: {
    margin: 10,
    width: 200
  },
  textArea: {
    margin: 10,
    width: 400
  },
  submitButton: {
    margin: 10
  }
}

class ContactForm extends Component {
  constructor (props) {
    super(props)
    this.state = { name: '', email: '', message: '', subscriberEmail: '' }

    this.onSubmitClick = this.onSubmitClick.bind(this)
    this.onHandleChange = this.onHandleChange.bind(this)
    this.addNewSubscriberNotification = this.addNewSubscriberNotification.bind(
      this
    )

    this._notificationSystem = null
  }

  componentDidMount () {
    this._notificationSystem = this.refs.notificationSystem
  }

  addNewSubscriberNotification () {
    let email = this.state.subscriberEmail
    if (email) {
      const options = {
        method: 'POST',
        body: JSON.stringify({ subscriberEmail: email }),
        headers: {
          'Content-Type': 'application/json'
        }
      }

      fetch('/api/subscribe', options).then(() => {
        this._notificationSystem.addNotification({
          message:
            "I'm sending you a confirmation email to make sure you're not a robot. Check your email to confirm subscription.",
          level: 'success'
        })

        // clear input
        this.setState({ subscriberEmail: '' })
      })
    } else {
      this._notificationSystem.addNotification({
        message: `Sorry that email address doesnt look right.
           Please enter a valid email address.`,
        level: 'error'
      })
    }
  }

  onSubmitClick (e) {
    e.preventDefault()

    const name = this.state.name
    const email = this.state.email
    const message = this.state.message

    // if no input found at all, dont talk to server
    let empty = !name && !email && !message
    if (empty) {
      this._notificationSystem.addNotification({
        message: "There isn't anything to send! Try entering a message",
        level: 'warning'
      })
    } else {
      const options = {
        method: 'POST',
        body: JSON.stringify({ name, email, message }),
        headers: {
          'Content-Type': 'application/json'
        }
      }

      // send users email data to backend
      fetch('/api/send-mail', options)
        .then(response => {
          return response.text()
        })
        .then(() => {
          // display notification
          this._notificationSystem.addNotification({
            message: 'Email Sent. Thanks for the feedback!',
            level: 'success'
          })

          // clear inputs
          this.setState({ name: '', email: '', message: '' })
        })
    }
  }

  onHandleChange (name) {
    return e => {
      this.setState({
        [name]: e.target.value
      })
    }
  }

  render () {
    const { classes } = this.props

    return (
      <form className={classes.container} onSubmit={this.onSubmitClick}>
        <Typography className={classes.titles} variant='title'>
          Feel free drop me a email or contact me using the form below
        </Typography>

        <TextField
          className={classes.textField}
          label='Name'
          autoComplete='name'
          value={this.state.name}
          onChange={this.onHandleChange('name')}
        />
        <br />
        <TextField
          className={classes.textField}
          label='Email'
          autoComplete='email'
          value={this.state.email}
          onChange={this.onHandleChange('email')}
        />
        <br />
        <TextField
          className={classes.textArea}
          label='Message'
          multiline
          rows='4'
          value={this.state.message}
          onChange={this.onHandleChange('message')}
        />
        <br />
        <Button
          className={classes.submitButton}
          type='submit'
          variant='raised'
          color='primary'
        >
          Send<Icon>send</Icon>
        </Button>

        <NotificationSystem ref='notificationSystem' />
        <br />
        <Typography className={classes.titles} variant='title'>
          Want to get an email whenever there are new blog posts? Enter your
          email and click "Subscribe". Don't worry, you can unsubscribe anytime
          via the emails I send you.
        </Typography>
        <TextField
          className={classes.textField}
          label='Email'
          autoComplete='email'
          value={this.state.subscriberEmail}
          onChange={this.onHandleChange('subscriberEmail')}
        />
        <br />
        <Button
          className={classes.submitButton}
          onClick={this.addNewSubscriberNotification}
          variant='raised'
          color='primary'
        >
          Subscribe
        </Button>
      </form>
    )
  }
}

export default withStyles(styles)(ContactForm)
