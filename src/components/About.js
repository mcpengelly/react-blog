import React, { Component } from 'react'

import ContactForm from './utility/ContactForm'
import ContactInfo from './utility/ContactInfo'

const style = {
  margin: '0 auto',
  maxWidth: '55em',
  backgroundColor: 'white'
}
const leftAlign = { textAlign: 'left' }
const hrStyle = { borderColor: 'lightgrey' }

export default class About extends Component {
  render () {
    return (
      <div>
        <h1>About</h1>
        <section style={leftAlign}>More info coming soon...</section>

        <center>
          <ContactForm />
        </center>

        <hr style={hrStyle} />
        <ContactInfo style={leftAlign} />
      </div>
    )
  }
}
