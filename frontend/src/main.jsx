import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

// Set default base URL for API calls in production. 
// Locally, VITE_API_URL is undefined, so it defaults to '' (using Vite's proxy).
// In production (Vercel), we will set VITE_API_URL to the live Render backend URL.
axios.defaults.baseURL = import.meta.env.VITE_API_URL || '';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
