import React from 'react'

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
    </div>
  )
}

export default App
