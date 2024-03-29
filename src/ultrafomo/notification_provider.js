import React from 'react'

export const NotificationContext = React.createContext(null)

export default function NotificationContextEl({ children }) {
  const [notification, setNotification] = React.useState({})

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}
