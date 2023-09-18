import React from 'react'
import Main from './main'
import Navigation from './navigation'
import Notifications from './notifications'
import NotificationProvider from './notification_provider'
import './index.css'

function App() {
  return (
    <NotificationProvider>
      <Navigation />
      <Main />
      <Notifications />
    </NotificationProvider>
  )
}

export default App
