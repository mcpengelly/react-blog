import React, { Component } from 'react';
import A from './A';

//load icons
import FaGithub from 'react-icons/lib/fa/github';
import FaLinkedIn from 'react-icons/lib/fa/linkedin';
import FaTwitter from 'react-icons/lib/fa/twitter';

export default class Footer extends Component {
	render(){
		return (
			<footer style={{ backgroundColor: 'grey' }}>
				<A linkTo="https://github.com/mcpengelly"><FaGithub /></A>
				<A linkTo="https://www.linkedin.com/in/matt-pengelly-575ba886"><FaLinkedIn /></A>
				<A linkTo="https://twitter.com/typycyl"><FaTwitter /></A>
				<small><p style={{ display: 'inline-block' }}>{this.props.copyright}</p></small>
			</footer>
		);
	}
};



