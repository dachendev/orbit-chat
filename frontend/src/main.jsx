import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthUserContextProvider } from './features/auth'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthUserContextProvider>
      <App />
    </AuthUserContextProvider>
  </StrictMode>
)
