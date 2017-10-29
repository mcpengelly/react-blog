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
		this.state = { name: '', email: '', message: '', subscriberEmail: '' };

		this._notificationSystem = null;

		this.onSubmitClick = this.onSubmitClick.bind(this);
		this.onNameChange = this.onNameChange.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
		this.onMessageChange = this.onMessageChange.bind(this);
		this.onSubscriberEmailChange = this.onSubscriberEmailChange.bind(this);
		this.addNewSubscriberNotification = this.addNewSubscriberNotification.bind(this);
	}

	componentDidMount() {
		this._notificationSystem = this.refs.notificationSystem;
	}

	addNewSubscriberNotification() {
		let email = this.state.subscriberEmail;
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
					message:
						"I'm sending you a confirmation email to make sure you're not a robot. Check your email to confirm subscription.",
					level: 'success'
				});

				// clear input
				this.setState({ subscriberEmail: '' });
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

		const name = this.state.name;
		const email = this.state.email;
		const message = this.state.message;

		// if no input found at all, dont talk to server
		let empty = !name && !email && !message;
		if (empty) {
			this._notificationSystem.addNotification({
				message: "There isn't anything to send! Try entering a message",
				level: 'warning'
			});
		} else {
			const options = {
				method: 'POST',
				body: JSON.stringify({ name, email, message }),
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
					this.setState({ name: '', email: '', message: '' });
				});
		}
	}

	onNameChange(e) {
		this.setState({
			name: e.target.value
		});
	}

	onEmailChange(e) {
		this.setState({
			email: e.target.value
		});
	}

	onMessageChange(e) {
		this.setState({
			message: e.target.value
		});
	}

	onSubscriberEmailChange(e) {
		this.setState({
			subscriberEmail: e.target.value
		});
	}

	render() {
		return (
			<div style={{ width: '50%' }}>
				<form onSubmit={this.onSubmitClick.bind(this)}>
					<FormGroup role="form">
						<h4>Feel free drop me a email or contact me using the form below</h4>
						<TextBox
							value={this.state.name}
							caption="Name"
							fieldName="name"
							handleChange={this.onNameChange}
						/>
						<br />
						<TextBox
							value={this.state.email}
							caption="Email"
							fieldName="email"
							handleChange={this.onEmailChange}
						/>
						<br />
						<TextArea
							value={this.state.message}
							caption="Message"
							fieldName="message"
							handleChange={this.onMessageChange}
						/>
						<br />
						<Button type="submit" value="Send">
							Send <MailIcon />
						</Button>
						<NotificationSystem ref="notificationSystem" />
						<br />
						Want to get an email whenever there are new blog posts? Enter your email and
						click "Subscribe"
						<TextBox
							ref="subscriberEmail"
							value={this.state.subscriberEmail}
							fieldName="subscriberEmail"
							handleChange={this.onSubscriberEmailChange}
						/>
						<br />
						<Button onClick={this.addNewSubscriberNotification} value="Subscribe">
							Subscribe
						</Button>
					</FormGroup>
				</form>
			</div>
		);
	}
}
