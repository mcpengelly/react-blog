import React, { Component } from 'react';

import SocialMediaIcons from './SocialMediaIcons';

export default class Footer extends Component {
	render(){
		var style = { backgroundColor: 'grey' };
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



