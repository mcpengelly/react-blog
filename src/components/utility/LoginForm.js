import React from 'react'
import { observer } from 'mobx-react'
import Paper from 'material-ui/Paper'
import AuthStore from '../stores/authentication-store'

import { withStyles } from 'material-ui/styles'
const styles = {
  container: {
    paddingTop: 25,
    maxWidth: 900,
    minHeight: 200,
    margin: 'auto'
  }
}
const LoginForm = observer(
  class LoginForm extends React.Component {
    constructor () {
      super()
      this.state = {
        username: '',
        password: ''
      }
      this.handleChange = this.handleChange.bind(this)
      this.login = this.login.bind(this)
      this.logout = this.logout.bind(this)
      this.authStore = new AuthStore()
    }
    handleChange (inputField) {
      return e => {
        this.setState({
          [inputField]: e.currentTarget.value
        })
      }
    }
    clearInputFields () {
      this.setState({
        username: '',
        password: ''
      })
    }
    login () {
      const data = {
        username: this.state.username,
        password: this.state.password
      }

      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }

      fetch('/api/login', options)
        // .then(res => {
        //   // dispatch an action changing isLoggedIn app state to true
        // })
        .then(this.clearInputFields.bind(this))
    }
    logout () {
      fetch('/logout').then(res => {
        console.log('res', res)
      })
    }
    render () {
      const { username, password } = this.state
      const { classes } = this.props

      return (
        <Paper className={classes.container}>
          <div>
            username:<input
              type='text'
              value={username}
              onChange={this.handleChange('username')}
            />
            <br />
            password:<input
              type='text'
              value={password}
              onChange={this.handleChange('password')}
            />
            <br />
            <input type='button' value='login' onClick={this.login} />
            <input type='button' value='logout' onClick={this.logout} />
          </div>
        </Paper>
      )
    }
  }
)

export default withStyles(styles)(LoginForm)
