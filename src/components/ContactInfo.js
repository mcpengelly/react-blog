import React, { Component } from 'react';
import SocialMediaIcons from './utility/SocialMediaIcons';

const SOFlair = () => {
	return (
		<a href="http://stackoverflow.com/users/7664140/matt-pengelly">
			<img src="http://stackoverflow.com/users/flair/7664140.png"
				width="208"
				height="58"
				alt="profile for Matt Pengelly at Stack Overflow, Q&amp;A for professional and enthusiast programmers"
				title="profile for Matt Pengelly at Stack Overflow, Q&amp;A for professional and enthusiast programmers"
				/>
		</a>
	);
}

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
				<SOFlair />
			</div>
		);
	}
};
