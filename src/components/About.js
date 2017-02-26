import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import VerticalLine from './utility/VerticalLine';

export default class About extends Component {
	render(){
		return (
			<div>
				<h1>About Page</h1>
				<div width="500px">
					<section>
						<h3>What is this site for?</h3>
						<p>
						a place for me to share things I'm working on and a place to put past/future projects.
						</p>
						<h3>Who am I?</h3>
						<p>
						I'm Ottawa based professional web developer that started out making video games and was  drawn to web development by it's large and supportive open-source community.
						</p>
					</section>
					<div style={{display: 'inline-block', padding: '20px'}}>
						<ContactInfo />
					</div>
					<VerticalLine height="100"/>
					<div style={{display: 'inline-block', padding: '20px'}}>
						<ContactForm />
					</div>
				</div>
			</div>
		);
	}
};
