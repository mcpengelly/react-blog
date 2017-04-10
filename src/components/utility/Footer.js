import React, { Component } from 'react';

import SocialMediaIcons from './SocialMediaIcons';

var style = {
	backgroundColor: '#4F5350',
};

var textStyle = {
	color: 'white',
};

export default class Footer extends Component {
	render(){
		return (
			<footer className="footer" style={style}>
				<SocialMediaIcons style={textStyle} />
				<small>
					<p style={textStyle}>
						{this.props.copyright}
					</p>
				</small>
			</footer>
		);
	}
};



