import React, { Component } from 'react';

export default class ContactForm extends Component {
	render(){
		return (
			<div>
				<form>
					<h4>Leave a message?</h4>
					<label>
						Name:
						<input type="text" name="name" />
					</label><br/>

					<label>
						Email:
						<input type="text" name="email" />
					</label><br/>

					<label>
						Message:
						<input type="text" name="message" />
					</label><br/>

					<input type="submit" value="Send" />
				</form>
			</div>
		);
	}
}
