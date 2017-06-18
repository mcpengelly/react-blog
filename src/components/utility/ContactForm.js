import React, { Component } from 'react';
import { Button, FormGroup } from 'react-bootstrap';
import MailIcon from 'react-icons/lib/fa/envelope-o';
import NotificationSystem  from 'react-notification-system'
import 'whatwg-fetch'; //fetch

import TextBox from './TextBox';
import TextArea from './TextArea';

export default class ContactForm extends Component {

	constructor(props){
		super(props);
		this._notificationSystem = null;
	}

	componentDidMount() {
		// setup notification system
		this._notificationSystem = this.refs.notificationSystem
	}

	addEmailSubmitNotification() {
		this._notificationSystem.addNotification({
			message: 'Email Sent. Thanks for the feedback!',
			level: 'success'
		});
	}

	onSubmitClick(e) {
		e.preventDefault();

		let name = this.refs.name.state.value;
		let email = this.refs.email.state.value;
		let message = this.refs.message.state.value;

		// if no input found ignore submit click
		if(!name && !email && !message){
			return;
		}

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

		// send users email data to backend
		fetch('/api/send-mail', options)
		.then((response)  => {
			return response.text();
		})
		.then(() => {
			// display notification
			this.setState({ isActive: true });

			// clear input
			this.refs.name.setState({ value: '' });
			this.refs.email.setState({ value: '' });
			this.refs.message.setState({ value: '' });
		});
	}

	render(){
		return (
			<div>

				<form style={{ width:'50%' }} onSubmit={this.onSubmitClick.bind(this)}>
					<FormGroup role="form">
						<h4>Feel free drop me a email or contact me using the form below</h4>

						<TextBox ref="name" caption="Name" fieldName="name" /><br/>
						<TextBox ref="email" caption="Email" fieldName="email" /><br/>
						<TextArea ref="message" caption="Message" fieldName="message" /><br/>
						<Button type="submit"
								onClick={this.addEmailSubmitNotification.bind(this)}
								value="Send">
							Send <MailIcon />
						</Button>
						<NotificationSystem ref="notificationSystem" />
					</FormGroup>
				</form>

			</div>
		);
	}
}
