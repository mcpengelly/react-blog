import React, { Component } from 'react';

export default class ContactInfo extends Component {
	render(){
		return (
			<div>
				<address>
					name: matt pengelly<br/>
					github: mcpengelly<br/>
					<a href="mailto:pengelly.mat@gmail.com">pengelly.mat@gmail.com</a><br/>
					Ottawa, Ontario; Canada<br/>
				</address>
			</div>
		);
	}
};
