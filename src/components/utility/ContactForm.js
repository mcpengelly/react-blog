import React, { Component } from 'react';
import { Button, FormGroup } from 'react-bootstrap';
import MailIcon from 'react-icons/lib/fa/envelope-o';
import NotificationSystem from 'react-notification-system';
import 'whatwg-fetch'; //fetch

import TextBox from './TextBox';
import TextArea from './TextArea';

export default class ContactForm extends Component {
	constructor(props) {
		super(props);
		this._notificationSystem = null;
		// this.state = { name: null, email: null, message: null };
	}

	componentDidMount() {
		this._notificationSystem = this.refs.notificationSystem;
	}

	addNewSubscriberNotification() {
		let email = this.refs.subscriberEmail.state.value;
		if (email) {
			const options = {
				method: 'POST',
				body: JSON.stringify({ subscriberEmail: email }),
				headers: {
					'Content-Type': 'application/json'
				}
			};

			fetch('/api/subscribe', options).then(() => {
				this._notificationSystem.addNotification({
					message: "I'm sending you a confirmation email to make sure you're not a robot",
					level: 'success'
				});

				// clear input
				this.refs.subscriberEmail.setState({ value: '' });
			});
		} else {
			this._notificationSystem.addNotification({
				message: `Sorry that email address doesnt look right.
					 Please enter a valid email address.`,
				level: 'error'
			});
		}
	}

	onSubmitClick(e) {
		e.preventDefault();

		const name = this.refs.name.state.value;
		const email = this.refs.email.state.value;
		const message = this.refs.message.state.value;

		// if no input found at all, dont talk to server
		let valid = !name && !email && !message;
		if (valid) {
			this._notificationSystem.addNotification({
				message: "There isn't anything to send! Try entering a message",
				level: 'warning'
			});
		} else {
			//es6 property value syntax
			let data = { name, email, message };

			const options = {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			};

			// send users email data to backend
			fetch('/api/send-mail', options)
				.then(response => {
					return response.text();
				})
				.then(() => {
					// display notification
					this._notificationSystem.addNotification({
						message: 'Email Sent. Thanks for the feedback!',
						level: 'success'
					});

					// clear inputs
					['name', 'email', 'message'].forEach(function(elem) {
						this.refs[elem].setState({ value: '' });
					});
				});
		}
	}

	//TODO swap state for refs?
	//add keyup handlers for form fields?
	render() {
		return (
			<div style={{ width: '50%' }}>
				<form onSubmit={this.onSubmitClick.bind(this)}>
					<FormGroup role="form">
						<h4>Feel free drop me a email or contact me using the form below</h4>
						<TextBox ref="name" caption="Name" fieldName="name" />
						<br />
						<TextBox ref="email" caption="Email" fieldName="email" />
						<br />
						<TextArea ref="message" caption="Message" fieldName="message" />
						<br />
						<Button type="submit" value="Send">
							Send <MailIcon />
						</Button>
						<NotificationSystem ref="notificationSystem" />
						<br />
						Want to get an email whenever there are new blog posts? Enter your email and
						click "Subscribe"
						<TextBox ref="subscriberEmail" fieldName="subscriberEmail" />
						<br />
						<Button
							onClick={this.addNewSubscriberNotification.bind(this)}
							value="Subscribe"
						>
							Subscribe
						</Button>
					</FormGroup>
				</form>
			</div>
		);
	}
}
