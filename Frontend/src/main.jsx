import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ReportsAnalytics from './components/ReportsAnalytics.jsx'
import Audit from './components/Audit.jsx'
import Dashboard from './components/Dashboard.jsx' // wherever your dashboard lives

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
 <App/>
    </BrowserRouter>
  </StrictMode>,
)