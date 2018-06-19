import React from 'react'
import FaGithub from 'react-icons/lib/fa/github'
import FaLinkedIn from 'react-icons/lib/fa/linkedin'
import FaTwitter from 'react-icons/lib/fa/twitter'
import { withStyles } from 'material-ui/styles'

const styles = {
  socMedIcons: {
    padding: '5px'
  }
}

const SocialMediaIcons = props => {
  const { classes } = props

  return (
    <div className='social-media-icons'>
      <a className={classes.socMedIcons} href='https://github.com/mcpengelly'>
        <FaGithub />
      </a>
      <a
        className={classes.socMedIcons}
        href='https://www.linkedin.com/in/matt-pengelly-575ba886'
      >
        <FaLinkedIn />
      </a>
      <a className={classes.socMedIcons} href='https://twitter.com/typycyl'>
        <FaTwitter />
      </a>
    </div>
  )
}

export default withStyles(styles)(SocialMediaIcons)
