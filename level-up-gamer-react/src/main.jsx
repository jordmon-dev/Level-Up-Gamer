import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// 1. Importar el enrutador
import { BrowserRouter } from 'react-router-dom'

// (Aquí deben estar tus imports de css)
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './styles.css' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Envolver App con BrowserRouter */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)