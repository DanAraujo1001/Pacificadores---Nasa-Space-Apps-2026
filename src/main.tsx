import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { initAudioAutoplay } from "./engine/audioAutoplay";
import { initProgressAutosave } from "./store/useGameStore";

// Liga a troca automática de trilha sonora conforme o estado do jogo.
initAudioAutoplay();
// Liga o save automático do progresso (módulo único: `engine/saveSystem`).
initProgressAutosave();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
