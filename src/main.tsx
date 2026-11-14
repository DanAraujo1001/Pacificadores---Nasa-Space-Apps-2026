import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initAudioAutoplay } from './engine/audioAutoplay.ts'

// Liga a troca automática de trilha sonora conforme o estado do jogo.
// A partir daqui, o áudio acompanha o jogo sozinho (ver src/engine/audioAutoplay.ts).
initAudioAutoplay()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
