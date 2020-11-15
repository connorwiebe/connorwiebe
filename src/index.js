import React from 'react'
import ReactDOM from 'react-dom'
import projects from './helpers/projects'
import './css.css'

const App = () => {

  return (
    <div className="wrapper">
      <div className="Name">
        <h1 className="title">Connor Wiebe</h1>
        <div className="Contact">
          <a href="https://github.com/connorwiebe" target="_blank" rel="noopener noreferrer" className="item">Github&nbsp;/</a>
          <a href="https://www.linkedin.com/in/connorwiebe/" target="_blank" rel="noopener noreferrer" className="item">&nbsp;LinkedIn&nbsp;/</a>
          <a href="mailto:connorwiebe11@gmail.com" target="_blank" rel="noopener noreferrer" className="item">&nbsp;Email</a>
        </div>
      </div>
      <div className="Projects">
        {projects.map((project, i) => (
          <div key={i} className="Container">
            <div className="Project">
              <div className="info">
                <h3 className="title">
                  <a href={project.url} target="_blank" rel="noopener noreferrer">{project.title}</a>
                </h3>
                <p className="details">{project.description}</p>
              </div>
              <div className="image">
                <img src={require(`./images/${project.title}.png`)} alt={project.title} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const app = document.getElementById('app')
ReactDOM.render(<App />, app)
