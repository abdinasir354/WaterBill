import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './auth/AuthContext'
import { DataProvider } from './auth/DataContext'

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <DataProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </DataProvider>
    </StrictMode>
  </BrowserRouter>
);
