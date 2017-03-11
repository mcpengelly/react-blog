import MailIcon from 'react-icons/lib/fa/envelope-o';
import { Button } from 'react-bootstrap';

import React, { Component } from 'react';
import TextBox from './utility/TextBox';
import TextArea from './utility/TextArea';

export default class ContactForm extends Component {
	render(){
		return (
			<div>
				<form action="/api/send-mail" method="post">
					<h4>Leave me a message?</h4>

					<TextBox caption="Name" fieldName="name" /><br/>
					<TextBox caption="Email" fieldName="email" /><br/>
					<TextArea caption="Message" fieldName="message" /><br/>
					<Button type="submit" value="Send">Send <MailIcon /></Button>
				</form>
			</div>
		);
	}
}

