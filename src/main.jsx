import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Dev-only: suppress known library warnings (THREE.Clock deprecation, React DevTools promo)
if (import.meta.env.DEV) {
  const origWarn = console.warn
  console.warn = (...args) => {
    const msg = args[0]
    if (typeof msg === 'string' && (msg.includes('THREE.Clock') || msg.includes('React DevTools'))) return
    origWarn.apply(console, args)
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
