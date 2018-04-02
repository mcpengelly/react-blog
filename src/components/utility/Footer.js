import React from 'react'
import SocialMediaIcons from './SocialMediaIcons'
import { withStyles } from 'material-ui/styles'

const styles = {
  footer: {
    // backgroundColor: 'white',
    padding: 10
  }
}

function Footer (props) {
  return (
    <footer className={props.classes.footer}>
      <SocialMediaIcons />
      <small>
        <p>{props.copyright}</p>
      </small>
    </footer>
  )
}

export default withStyles(styles)(Footer)
