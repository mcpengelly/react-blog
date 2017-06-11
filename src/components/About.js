import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import ContactForm from './utility/ContactForm';
import ContactInfo from './utility/ContactInfo';

const style = {
	margin: '0 auto',
	maxWidth: '50em',
	backgroundColor: 'white'
};
const leftAlign = { textAlign: 'left' };
const centerStyle = { display: 'flex', justifyContent: 'center' };
const padElements = { padding: '5%' };

export default class About extends Component {

	render(){
		return (
			<Grid style={style}>

				<Row>
					<Col sm={12}>
						<h1>About</h1>
						<section style={leftAlign}>
						</section>
					</Col>
				</Row>

				<Row>
					<Col style={centerStyle} sm={12}>
						<div style={padElements}>
							<ContactInfo />
						</div>
						<div style={padElements}>
							<ContactForm />
						</div>
					</Col>
				</Row>

			</Grid>
		);
	}
};
