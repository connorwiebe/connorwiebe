import React from 'react'
import { Link } from 'react-router-dom'
import projects from '../helpers/projects'

function App() {
  return (
    <div className="wrapper">
      <div className="Projects">
        {projects.map((project) => (
          <div key={project.url} className="Container">
            <div className="Project">
              <div className="info">
                <h3 className="title">
                  <Link
                    to={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="details">{project.description}</p>
              </div>
              <div className="image">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={`./images/${project.title}.png`}
                    alt={project.title}
                  />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
