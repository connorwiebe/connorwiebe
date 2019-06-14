import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import projects from './helpers/projects'
import './css.css'

const App = () => {

  const projectEls = projects.map((project, i) => {
    return (
      <div key={ i } className="Container">
        <div className="Project">
          <div className="info">
              <h3 className="title">
                <a href={ project.url }>{ project.title }</a>
              </h3>
            <p className="details">{ project.description }</p>
          </div>
          <div className="image">
            <img src={ project.image } alt={ project.title }/>
          </div>
        </div>
      </div>
    )
  })

  // useEffect(() => {
  //   ;(async () => {
  //     const projects = await (await fetch('/api/projects')).json()
  //   })()
  // }, [])


  return (
    <div className="wrapper">
      <div className="Name">
        <h1 className="title">Connor Wiebe</h1>
          <div className="Contact">
            <a href="https://github.com/connorwiebe" className="item">Github&nbsp;/</a>
            <a href="mailto:connorwiebe11@gmail.com" className="item">&nbsp;Email</a>
          </div>
      </div>
      <div className="Projects">
        { projectEls }
      </div>
    </div>
  )
}

const app = document.getElementById('app')
ReactDOM.render(<App/>, app)
