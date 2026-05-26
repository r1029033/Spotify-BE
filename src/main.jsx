import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import 'primereact/resources/themes/lara-dark-green/theme.css'
//import 'primeicons/primeicons.css';
//import 'primereact/resources/primereact.min.css'
import './assets/styles/general/_base.scss'
import App from './App.jsx'
import './assets/styles/main.scss'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
