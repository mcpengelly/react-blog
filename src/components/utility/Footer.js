import React from 'react'
import SocialMediaIcons from './SocialMediaIcons'

const footerStyle = { backgroundColor: 'white' }

function Footer (props) {
  return (
    <footer className='footer' style={footerStyle}>
      <SocialMediaIcons />
      <small>
        <p>{props.copyright}</p>
      </small>
    </footer>
  )
}

export default Footer
