import React, { Component } from 'react'
import './App.css'

import NavBar from './components/utility/NavBar'
import Footer from './components/utility/Footer'

/* Background pattern from Subtle Patterns */
import backgroundImage from './assets/img/escheresque.png'

const style = {
  position: 'fixed',
  zIndex: 2,
  width: '100%',
  height: '2%'
}

class App extends Component {
  render () {
    return (
      <div
        className='App'
        style={{ backgroundImage: 'url(' + backgroundImage + ')' }}
      >
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        />

        <div style={style}>
          <NavBar />
        </div>

        <div className='App-intro'>{this.props.children}</div>

        <Footer copyright='Matt Pengelly 2017' />
      </div>
    )
  }
}

export default App
