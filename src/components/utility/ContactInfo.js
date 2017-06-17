import React, { Component } from 'react';

const SOFlair = () => {
	return (
		<a href="http://stackoverflow.com/users/7664140/matt-pengelly">
			<img src="http://stackoverflow.com/users/flair/7664140.png"
				width="256"
				height="74"
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
					Ontario, Canada<br />
				</address>
				<SOFlair />
			</div>
		);
	}
};
