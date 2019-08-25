import React from 'react'
import ReactDOM from 'react-dom'
import projects from './helpers/projects'
import worldData from './helpers/world-data'
import './css.css'

import { geoMercator, geoPath, geoBounds, geoCentroid, geoDistance } from 'd3-geo'
import { feature } from 'topojson-client'

const App = () => {

  const [topology, setTopology] = React.useState()
  const [users, setUsers] = React.useState()
  const [{ projection }, setProjection] = React.useState({ projection: null })

  React.useEffect(() => {
    ;(async () => {
      const users = (await (await fetch('https://hl1upt3s0a.execute-api.ca-central-1.amazonaws.com/dev')).json()).filter(({username}) => !!username)
      const topology = feature(worldData, worldData.objects.countries)

      const bounds = geoBounds(topology)
      const distance = geoDistance(bounds[0], bounds[1])
      const center = geoCentroid(topology)
      const scale = 400 / distance / Math.sqrt(2)

      setProjection({ projection: geoMercator().scale(scale).center(center) })
      setUsers(users)
      setTopology(topology.features)
    })()
  }, [])

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
        { projects.map((project, i) => (
          <div key={i} className="Container">
            <div className="Project">
              <div className="info">
                  <h3 className="title">
                    <a href={project.url}>{project.title}</a>
                  </h3>
                <p className="details">{project.description}</p>
              </div>
              { project.title === 'jsjot' ? (
                <div className="presentation">
                  <svg viewBox="0 0 845 545">
                    <g className="countries">
                      { topology && topology.map((d, i) => (
                        <path
                          key={i}
                          d={ geoPath().projection(projection)(d) }
                          className="country"
                          fill={"#eef4f7"}
                          stroke="#fff"
                          strokeWidth={0.5}
                        />
                      )) }
                    </g>
                    <g className="markers">
                      { users && users.map((user, i) => (
                        <circle
                          key={i}
                          cx={projection([user.long, user.lat])[0]}
                          cy={projection([user.long, user.lat])[1]}
                          r={1.3}
                          fill="#1c2023"
                          className="marker"
                        />
                      )) }
                    </g>
                  </svg>
                </div>
              ) : (
                <div className="image">
                  <img src={project.image} alt={project.title}/>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const app = document.getElementById('app')
ReactDOM.render(<App/>, app)
