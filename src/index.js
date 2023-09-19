import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './css.css'

const AppRoute = React.lazy(() => import('./app'))
const UltrafomoRoute = React.lazy(() => import('./ultrafomo/index'))

const app = createRoot(document.getElementById('app'))
app.render(
  <React.StrictMode>
    <React.Suspense>
      <Router>
        <Routes>
          <Route path="/" element={<AppRoute />} />
          <Route path="/ultrafomo" element={<UltrafomoRoute />} />
        </Routes>
      </Router>
    </React.Suspense>
  </React.StrictMode>
)
