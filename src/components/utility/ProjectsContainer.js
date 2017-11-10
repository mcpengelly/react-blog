import React, { Component } from 'react';

import Project from './Project';

const imgPath = '/uploads/';

export default class ProjectsContainer extends Component {
	render() {
		const projectList = this.props.projects.map((project, index) => {
			return (
				<Project
					index={index}
					header={project.title}
					img={imgPath + project.img}
					description={project.description}
				/>
			);
		});

		return <div>{projectList}</div>;
	}
}
