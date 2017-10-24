import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import ContactForm from './utility/ContactForm';
import ContactInfo from './utility/ContactInfo';

const style = {
	margin: '0 auto',
	maxWidth: '55em',
	backgroundColor: 'white'
};
const leftAlign = { textAlign: 'left' };
const hrStyle = { borderColor: 'lightgrey' };

export default class About extends Component {
	render() {
		return (
			<Grid style={style}>
				<Row>
					<Col sm={12}>
						<h1>About</h1>
						<section style={leftAlign}>More info coming soon...</section>
					</Col>
				</Row>

				<hr style={hrStyle} />

				<Row>
					<center>
						<ContactForm />
					</center>
				</Row>

				<hr style={hrStyle} />
				<Row>
					<ContactInfo style={leftAlign} />
				</Row>
			</Grid>
		);
	}
}
// <Col style={centerStyle} sm={12}>
// 	<div style={padElements}>
// 		<ContactInfo />
// 	</div>
// 	<div style={padElements}>
// 		<ContactForm />
// 	</div>
// </Col>
