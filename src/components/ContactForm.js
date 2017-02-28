import React, { Component } from 'react';
import TextBox from './utility/TextBox';
import TextArea from './utility/TextArea';

import MailIcon from 'react-icons/lib/fa/envelope-o';

export default class ContactForm extends Component {
	render(){
		return (
			<div>
				<form>
					<h4>Leave me a message?</h4>

					<TextBox caption="Name" fieldName="name" /><br/>
					<TextBox caption="Email" fieldName="email" /><br/>
					<TextArea caption="Message" fieldName="message" /><br/>
					<button type="submit" value="Send">Send <MailIcon /></button>
				</form>
			</div>
		);
	}
}

