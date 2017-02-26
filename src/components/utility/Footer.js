import React, { Component } from 'react';
import A from './A';

//TODO: load an icon for the external links
export default class Footer extends Component {
	render(){
		return (
			<footer style={{ backgroundColor: 'grey' }}>
				<A linkTo="https://github.com/mcpengelly">Github</A>
				<A linkTo="https://www.linkedin.com/in/matt-pengelly-575ba886">LinkedIn</A>
				<A linkTo="https://twitter.com/typycyl">Twitter</A>
				<small><p style={{ display: 'inline-block' }}>{this.props.copyright}</p></small>
			</footer>
		);
	}
};


