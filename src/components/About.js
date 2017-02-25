import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import VerticalLine from './VerticalLine';

export default class About extends Component {
	render(){
		return (
			<div>
				<h1>About Page</h1>
				<div width="500px">
					<div style={{display: 'inline-block', padding: '10px'}}>
						<ContactInfo />
					</div>
					<VerticalLine height="75"/>
					<div style={{display: 'inline-block', padding: '10px'}}>
						<ContactForm />
					</div>
				</div>
			</div>
		);
	}
};
