import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'
import { StyledEngineProvider } from '@mui/material/styles'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import './theme.css'
import App from './App.tsx'

const AppWithProviders = () => {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate}>
      <App />
    </HeroUIProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <AuthProvider>
          <AppWithProviders />
        </AuthProvider>
      </BrowserRouter>
    </StyledEngineProvider>
  </StrictMode>,
)
