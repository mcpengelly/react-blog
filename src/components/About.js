import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

export default class About extends Component {
	render(){
		return (
			<div>
				<h1>About Page</h1>
				<div>
					<ContactInfo />
				</div>
				<div>
					<ContactForm />
				</div>
			</div>
		);
	}
};
