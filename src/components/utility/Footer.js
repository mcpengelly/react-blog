import React, { Component } from 'react'

import SocialMediaIcons from './SocialMediaIcons'

var style = { backgroundColor: 'white' }
var textStyle = { color: 'black' }

export default class Footer extends Component {
  render () {
    return (
      <footer className='footer' style={style}>
        <SocialMediaIcons style={textStyle} />
        <small>
          <p style={textStyle}>{this.props.copyright}</p>
        </small>
      </footer>
    )
  }
}
