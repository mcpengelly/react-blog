import React, { Component } from 'react'

import ContactForm from './utility/ContactForm'
import ContactInfo from './utility/ContactInfo'

export default class About extends Component {
  render () {
    return (
      <div>
        <h1>About</h1>
        <section>More info coming soon...</section>
        <ContactForm />
        <ContactInfo />
      </div>
    )
  }
}
