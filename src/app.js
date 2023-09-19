import React from 'react'
import { Link } from 'react-router-dom'
import projects from './helpers/projects'

function App() {
  return (
    <div className="wrapper">
      <div className="Name">
        <h1 className="title">Connor Wiebe</h1>
        <div className="Contact">
          <a
            href="https://github.com/connorwiebe"
            target="_blank"
            rel="noopener noreferrer"
            className="item"
          >
            Github&nbsp;/
          </a>
          <a
            href="https://www.linkedin.com/in/connorwiebe/"
            target="_blank"
            rel="noopener noreferrer"
            className="item"
          >
            &nbsp;LinkedIn&nbsp;/
          </a>
          <a
            href="mailto:connorwiebe11@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="item"
          >
            &nbsp;Email
          </a>
        </div>
      </div>
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
