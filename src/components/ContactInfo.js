import React, { Component } from 'react';
import SocialMediaIcons from './utility/SocialMediaIcons';

export default class ContactInfo extends Component {
	render(){
		return (
			<div>
				<h4>Contact Information:</h4>
				<address>
					Github: mcpengelly<br />
					<a href="mailto:pengelly.mat@gmail.com">pengelly.mat@gmail.com</a><br />
					Ottawa, Ontario; Canada<br />
				</address>
				<SocialMediaIcons />
			</div>
		);
	}
};
