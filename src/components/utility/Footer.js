import React, { Component } from 'react';

import SocialMediaIcons from './SocialMediaIcons';

export default class Footer extends Component {
	render(){
		return (
			<footer style={{ backgroundColor: 'grey' }}>
				<SocialMediaIcons />
				<small>
					<p style={{ display: 'inline-block' }}>
						{this.props.copyright + ' ' + new Date().getFullYear()}
					</p>
				</small>
			</footer>
		);
	}
};



