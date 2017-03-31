import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import request from 'request';

import ProjectsContainer from './utility/ProjectsContainer';

export default class Portfolio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projectList: []
		};
	}

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
		return (
			<div>
				<Grid style={{ backgroundColor: 'white' }}>
					<Row>
						<h1>Projects</h1>
						<ProjectsContainer projects={this.state.projectList}/>
					</Row>
				</Grid>
			</div>
		);
	}
}

