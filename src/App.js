import React, { Component } from 'react'
import './App.css'

import NavBar from './components/utility/NavBar'
import Footer from './components/utility/Footer'

/* Background pattern from Subtle Patterns */
import backgroundImage from './assets/img/escheresque.png'

class App extends Component {
  render () {
    return (
      <div
        className='App'
        style={{ backgroundImage: 'url(' + backgroundImage + ')' }}
      >
        <Header />
        <div className='App-body' />
        <Footer copyright='Matt Pengelly 2017' />
      </div>
    )
  }
}

const Header = () => {
  return (
    <div>
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/icon?family=Material+Icons'
      />

      <NavBar />
    </div>
  )
}

export default App
