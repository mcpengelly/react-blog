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
	// TODO: individual project container
	componentDidMount() {
		// fetch portfolio items
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
				<Grid style={{ backgroundColor: 'white' }}>
					<Row>
						<h1>Projects</h1>
						<Accordion>
							{projectList}
						</Accordion>
					</Row>
				</Grid>
			</div>
		);
	}
}

