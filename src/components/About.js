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
							<h3>What is this site for?</h3>
							<p>
								A place for me to share things I'm working on and a place to put past/future projects.
							</p>
							<h3>Who am I?</h3>
							<p>
								I'm an Ottawa based professional web developer that started out making video games and
								was drawn to web development by it's large and supportive open-source community.
							</p>
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
