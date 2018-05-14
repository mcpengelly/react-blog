import React, { Component } from 'react'
import './App.css'

import NavBar from './components/utility/NavBar'
import Footer from './components/utility/Footer'

/* Background pattern from Subtle Patterns */
import backgroundImage from './assets/img/escheresque.png'
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
          {this.props.children}
        </div>
        <Footer copyright='Matt Pengelly 2017' />
      </div>
    )
  }
}

export default App
