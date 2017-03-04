import React, { Component } from 'react';
import { Grid, Row, Accordion, Panel } from 'react-bootstrap';

import Projects from './data/Projects';

export default class Portfolio extends Component {
	render(){
		let projectList = Projects.map((project, index) => {
			return (
				<Panel header={project.title} eventKey={index}>
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
						<Accordion expanded="true">
							{projectList}
						</Accordion>
					</Row>
				</Grid>
			</div>
		);
	}
};

