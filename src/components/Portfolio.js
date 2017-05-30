import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
// import request from 'request';

import ProjectsContainer from './utility/ProjectsContainer';

const style = {
	margin: '0 auto',
	maxWidth: '50em',
	backgroundColor: 'white'
};

export default class Portfolio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projectList: []
		};
	}

	componentDidMount() {
		// fetch portfolio items
		fetch('/api/projects')
		.then((response) => {
			return response.json();
		})
		.then((text) => {
			// set state to list received from backend
			this.setState({
				projectList: text
			});
		})
		.catch((error) => {
			throw error;
		});
	}

	render() {
		return (
			<div>
				<Grid style={style}>
					<Row>
						<h1>Projects</h1>
						<ProjectsContainer projects={this.state.projectList}/>
					</Row>
				</Grid>
			</div>
		);
	}
}

