import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { useThemeStore } from './stores/useThemeStore'
import { initErrorReporter } from './lib/errorReporter'

initErrorReporter()

const html = document.documentElement
const theme = useThemeStore.getState().theme
html.classList.add(theme)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  try {
    navigator.serviceWorker.register('/service-worker.js')
  } catch {
    // service worker registration failed, app still works without PWA
  }
}
