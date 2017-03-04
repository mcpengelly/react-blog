import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

export default class About extends Component {
	render(){
		return (
			<div>
				<h1>About</h1>
				<div>
					<section>
						<h3>What is this site for?</h3>
						<p>
							A place for me to share things I'm working on and a place to put past/future projects.
						</p>
						<h3>Who am I?</h3>
						<p>
							I'm an Ottawa based, professional web developer that started out making video games and was drawn to web development by it's large and supportive open-source community.
						</p>
					</section>

					<hr/>

					<div style={{
						display: 'flex',
						justifyContent: 'center',
						backgroundColor: 'white',
						borderRadius: '15px'
					}}>
						<div style={{padding: '20px'}}>
							<ContactInfo />
						</div>

						<div style={{padding: '20px'}}>
							<ContactForm />
						</div>
					</div>

				</div>
			</div>
		);
	}
};
