import React, { Component } from 'react';
import { Button, FormGroup } from 'react-bootstrap';
import MailIcon from 'react-icons/lib/fa/envelope-o';

import TextBox from './TextBox';
import TextArea from './TextArea';

export default class ContactForm extends Component {
	onSubmitClick(e) {
		console.log(e);

	}

	render(){
		return (
			<form onSubmit={this.onSubmitClick} action="/api/send-mail" method="post">
				<FormGroup role="form">
					<h4>drop me a email or contact me using the form below</h4>

					<TextBox caption="Name" fieldName="name" /><br/>
					<TextBox caption="Email" fieldName="email" /><br/>
					<TextArea caption="Message" fieldName="message" /><br/>
					<Button type="submit" value="Send">Send <MailIcon /></Button>
				</FormGroup>
			</form>
		);
	}
}

