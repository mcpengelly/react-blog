import React, { Component } from 'react';

import SocialMediaIcons from './SocialMediaIcons';

var style = { backgroundColor: 'grey' };

export default class Footer extends Component {
	render(){
		return (
			<footer style={style}>
				<SocialMediaIcons />
				<small>
					<p>
						{this.props.copyright}
					</p>
				</small>
			</footer>
		);
	}
};



