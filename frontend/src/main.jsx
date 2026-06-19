import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'
import Context from './context/Context.jsx'
import 'regenerator-runtime/runtime'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Context>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1040',
            color: '#e5e7eb',
            border: '1px solid rgba(255,255,255,0.12)',
          },
        }}
      />
    </Context>
  </StrictMode>,
)
