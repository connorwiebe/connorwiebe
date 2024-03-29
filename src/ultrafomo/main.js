import React from 'react'
import Search from './search'
import Stats from './stats'
import Chart from './chart'

function Main() {
  const [positions, setPositions] = React.useState({})

  return (
    <main className="main-container">
      <div className="main">
        <Chart positions={positions} setPositions={setPositions} />
        <Stats positions={positions} setPositions={setPositions} />
      </div>
      <Search positions={positions} setPositions={setPositions} />
    </main>
  )
}

export default Main
