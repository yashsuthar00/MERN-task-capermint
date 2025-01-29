import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LoadingProvider } from './context/LoadingContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </StrictMode>,
)
