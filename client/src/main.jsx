import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import AdminContextProvider from './context/AdminContext.jsx'
import ProviderContextProvider from './context/ProviderContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <ProviderContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </ProviderContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
)
