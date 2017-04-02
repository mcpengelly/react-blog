import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import ContactForm from './utility/ContactForm';
import ContactInfo from './utility/ContactInfo';

export default class About extends Component {
	render(){
		const style = {
			display: 'flex',
			justifyContent: 'center'
		};

		return (
			<Grid style={{ backgroundColor: 'white' }}>

				<Row>
					<Col sm={12}>
						<h1>About</h1>
						<section style={{ textAlign: 'left' }}>
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
					<Col sm={12}>
						<div style={style}>
							<div style={{padding: '20px'}}>
								<ContactInfo />
							</div>

							<div style={{padding: '20px'}}>
								<ContactForm />
							</div>
						</div>
					</Col>
				</Row>

			</Grid>
		);
	}
};
