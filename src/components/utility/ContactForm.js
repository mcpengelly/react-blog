import React, { Component } from 'react'
import MailIcon from 'react-icons/lib/fa/envelope-o'
import NotificationSystem from 'react-notification-system'
import 'whatwg-fetch' // fetch
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'

export default class ContactForm extends Component {
  constructor (props) {
    super(props)
    this.state = { name: '', email: '', message: '', subscriberEmail: '' }

    this._notificationSystem = null
    this.onSubmitClick = this.onSubmitClick.bind(this)
    this.onHandleChange = this.onHandleChange.bind(this)
    this.addNewSubscriberNotification = this.addNewSubscriberNotification.bind(
      this
    )
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

  onHandleChange (e) {
    console.log(e.target.value)
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render () {
    return (
      <div>
        <form onSubmit={this.onSubmitClick}>
          <h4>Feel free drop me a email or contact me using the form below</h4>

          <TextField
            label='Name'
            value={this.state.name}
            handleChange={this.onHandleChange}
          />
          <TextField
            label='Email'
            value={this.state.email}
            handleChange={this.onHandleChange}
          />

          <TextField
            label='Message'
            value={this.state.message}
            handleChange={this.onHandleChange}
          />
          <Button type='submit' variant='raised' color='primary'>
            Send
            <Icon>send</Icon>
          </Button>
          <Button type='submit' value='Send'>
            Send <MailIcon />
          </Button>
          <NotificationSystem ref='notificationSystem' />
          <br />
          <p>
            Want to get an email whenever there are new blog posts? Enter your
            email and click "Subscribe"
          </p>
          <TextField
            label='Message'
            value={this.state.subscriberEmail}
            handleChange={this.onHandleChange}
          />
          <br />
          <Button
            onClick={this.addNewSubscriberNotification}
            type='submit'
            variant='raised'
            color='primary'
          >
            Subscribe
          </Button>
          <Button onClick={this.addNewSubscriberNotification} value='Subscribe'>
            Subscribe
          </Button>
        </form>
        {/* <TextBox
          value={this.state.subscriberEmail}
          fieldName='subscriberEmail'
          handleChange={this.onHandleChange}
        /> */}
        {/*            <TextBox
          value={this.state.name}
          caption='Name'
          fieldName='name'
          handleChange={this.onHandleChange}
        /> */}
        {/*            <TextBox
          value={this.state.email}
          caption='Email'
          fieldName='email'
          handleChange={this.onHandleChange}
        /> */}
        {/*            <TextArea
          value={this.state.message}
          caption='Message'
          fieldName='message'
          handleChange={this.onHandleChange}
        /> */}
      </div>
    )
  }
}
