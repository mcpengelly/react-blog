import React from 'react'

import Project from './Project'

const imgPath = '/uploads/'

function ProjectsContainer (props) {
  const projects = props.projects.map((project, index) => {
    return (
      <Project
        key={index}
        title={project.title}
        img={imgPath + project.img}
        description={project.description}
      />
    )
  })
  return <div>{projects}</div>
}

export default ProjectsContainer
