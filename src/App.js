import React, { Component } from 'react'
import { Redirect } from 'react-router'

import NavBar from './components/utility/NavBar'
import Footer from './components/utility/Footer'
import backgroundImage from './assets/img/escheresque.png'
import './App.css'

/* Background pattern from Subtle Patterns */
const background = { backgroundImage: 'url(' + backgroundImage + ')' }

class App extends Component {
  render () {
    return (
      <div className='App' style={background}>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        />

        <div className='App-body'>
          <NavBar />
          <Redirect to='/blog' />
          {this.props.children}
        </div>
        <Footer copyright='Matt Pengelly 2018' />
      </div>
    )
  }
}

export default App
