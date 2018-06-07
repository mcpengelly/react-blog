import React from 'react'
import Cookies from 'universal-cookie'

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

    fetch('/login', options).then(this.clearInputFields.bind(this))
  }
  logout () {
    fetch('/logout').then(res => {
      console.log('res', res)
    })
  }
  render () {
    const { username, password } = this.state
    return (
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
    )
  }
}

export default LoginForm
