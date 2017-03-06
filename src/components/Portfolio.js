import React, { Component } from 'react';
import { Grid, Row, Accordion, Panel } from 'react-bootstrap';

import request from 'request';

export default class Portfolio extends Component {
	constructor(props){
		super(props);
		this.state = {
			projectList: []
		};
	}

	componentDidMount(){
		//make ajax request for portfolio items
		//setup using a fake json api for now
		const root = 'https://jsonplaceholder.typicode.com';
		const url = root + '/photos';

		request.get(url, (err, res, body) => {
			if(err) {
				throw new Error('Url could not be resolved');
			}
			this.setState({
				projectList: JSON.parse(body)
			});
			console.log(body);
		});
	}

	render(){
		const projectList = this.state.projectList.map((project, index) => {
			return (
				<Panel key={index} header={project.title} eventKey={index}>
					<img src={project.url} alt='project'></img>
					<p>{project.description}</p>
				</Panel>
			);
		});

		return (
			<div>
				<h1>Past Projects</h1>
				<Grid>
					<Row>
						<Accordion>
							{projectList}
						</Accordion>
					</Row>
				</Grid>
			</div>
		);
	}
};

