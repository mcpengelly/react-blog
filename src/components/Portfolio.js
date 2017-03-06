import React, { Component } from 'react';
import { Grid, Row, Accordion, Panel } from 'react-bootstrap';

import request from 'request';

export default class Portfolio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projectList: []
		};
	}

	// TODO: projects container? pass posts thru props?
	componentDidMount() {
		// make ajax request for portfolio items
		// setup using a fake json api for now
		// const root = 'https://jsonplaceholder.typicode.com';
		// const url = root + '/posts';
		const url = 'http://localhost:9000/api/projects';

		request.get(url, (err, res, body) => {
			if(err) {
				throw err;
			}
			this.setState({
				projectList: JSON.parse(body)
			});
		});
	}

	render() {
		const projectList = this.state.projectList.map((project, index) => {
			return (
				<Panel key={index} header={project.title} eventKey={index}>
					<img src={project.img} alt='project'></img>
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
}

