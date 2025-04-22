import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PdfSummarizer from './ocr.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <PdfSummarizer /> */}
    <App/>
  </StrictMode>,
)
