import React from 'react'

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
  login () {
    const data = {
      username: this.state.username,
      password: this.state.password
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        // Authorization: 'Basic dGVzdDp0ZXN0',
        'Content-Type': 'application/json'
      }
    }

    fetch('/api/login', options)
      .then(res => {
        console.log('res', res)
      })
      .then(this.clearInputFields.bind(this))
  }
  logout () {
    fetch('/api/logout').then(res => {
      console.log('res', res)
    })
  }
  clearInputFields () {
    this.setState({
      username: '',
      password: ''
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
        password:<input
          type='text'
          value={password}
          onChange={this.handleChange('password')}
        />
        <input type='button' value='login' onClick={this.login} />
        <input type='button' value='logout' onClick={this.logout} />
      </div>
    )
  }
}

export default LoginForm
