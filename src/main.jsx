import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/style.css'
import './style/header.css'
import './style/Footer.css'
import './style/Modal.css'
import App from './App.jsx'
import AdminPanel from './components/AdminPanel.jsx'

const isAdminHash = window.location.hash === '#admin';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdminHash ? <AdminPanel /> : <App />}
  </StrictMode>,
)
