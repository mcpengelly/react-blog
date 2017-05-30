import React, { Component } from 'react';
import { Button, FormGroup } from 'react-bootstrap';
import MailIcon from 'react-icons/lib/fa/envelope-o';
import 'whatwg-fetch'; //fetch

import TextBox from './TextBox';
import TextArea from './TextArea';

export default class ContactForm extends Component {
	onSubmitClick(e) {
		e.preventDefault();
		let name = this.refs.name.state.value;
		let email = this.refs.email.state.value;
		let message = this.refs.message.state.value;

		let data = {
			name: name,
			email: email,
			message: message
		};

		const options = {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		};

		fetch('/api/send-mail', options)
		.then(function(response) {
			console.log(response.status);     //=> number 100–599
			console.log(response.statusText); //=> String
			console.log(response.headers);    //=> Headers
			console.log(response.url);        //=> String

			// return response.text()
		}, function(error) {
			console.log(error.message) //=> String
		});
	}

	render(){
		return (
			<form onSubmit={this.onSubmitClick.bind(this)}>
				<FormGroup role="form">
					<h4>drop me a email or contact me using the form below</h4>

					<TextBox ref="name" caption="Name" fieldName="name" /><br/>
					<TextBox ref="email" caption="Email" fieldName="email" /><br/>
					<TextArea ref="message" caption="Message" fieldName="message" /><br/>
					<Button type="submit" value="Send">Send <MailIcon /></Button>
				</FormGroup>
			</form>
		);
	}
}

