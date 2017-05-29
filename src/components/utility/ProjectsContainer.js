import React, { Component } from 'react';

import Project from './Project';

export default class ProjectsContainer extends Component {

		render(){
				const projectList = this.props.projects.map((project, index) => {
						return (
								<Project
									index={index}
									header={project.title}
									img={project.img}
									description={project.description}
								/>
						);
				});

				return (
						<div>
							{projectList}
						</div>
				);
		}
};


