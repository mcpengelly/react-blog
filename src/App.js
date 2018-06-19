import React, { Component } from 'react'
import { Redirect } from 'react-router'

import NavBar from './components/utility/NavBar'
import Footer from './components/utility/Footer'
import backgroundImage from './assets/img/escheresque.png'
import './App.css'

/* Background pattern from Subtle Patterns */
const background = { backgroundImage: 'url(' + backgroundImage + ')' }

class App extends Component {
  constructor () {
    super()
    this.state = {
      redirect: false
    }
  }
  componentDidMount () {
    if (window.location.pathname.endsWith('/')) {
      this.setState({
        redirect: true
      })
    }
  }
  redirect () {
    if (this.state.redirect) {
      return <Redirect to='/blog' />
    }
  }
  render () {
    return (
      <div className='App' style={background}>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        />

        <div className='App-body'>
          <NavBar />
          {this.props.children}
          {this.redirect()}
        </div>
        <Footer copyright='Matt Pengelly 2018' />
      </div>
    )
  }
}

export default App
