import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import SocialMediaIcons from './SocialMediaIcons'

const styles = {
  footer: {
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
