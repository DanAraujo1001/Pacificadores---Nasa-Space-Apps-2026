import { create } from 'zustand';
import { Howl, Howler } from 'howler';
import { type GameEvent } from '../types/novel.ts';
import { EVENT_MUSIC } from '../data/audioTracks.ts';

interface AudioState {
  muted: boolean;
  volume: number;
  /** Evento cuja trilha está tocando no momento (ou null). */
  currentEvent: GameEvent | null;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
  playSfx: (src: string) => void;
  /** Toca a trilha diretamente por URL (uso avançado). */
  playBgm: (src: string) => void;
  /**
   * Toca a música do evento informado. Se a trilha desse evento já estiver
   * tocando, não reinicia — ideal para disparar ao entrar numa cena e seguir
   * avançando os diálogos sem cortar a música.
   */
  playEventMusic: (event: GameEvent) => void;
  stopBgm: () => void;
}

let currentBgm: Howl | null = null;
/** URL da trilha atualmente carregada, para evitar reiniciar a mesma faixa. */
let currentBgmSrc: string | null = null;

/**
 * Navegadores bloqueiam áudio até o primeiro gesto do usuário (clique/tecla).
 * Quando o Howler destrava o contexto de áudio, garantimos que a BGM atual
 * esteja tocando (ela pode ter sido criada antes da interação). Assim o
 * desenvolvedor não precisa se preocupar com isso.
 */
Howler.autoUnlock = true;
if (typeof window !== 'undefined') {
  const resumeOnUnlock = () => {
    const muted = useAudioStore.getState().muted;
    if (currentBgm && !currentBgm.playing() && !muted) {
      currentBgm.play();
    }
  };
  // 'unlock' dispara quando o contexto de áudio é liberado pelo gesto do usuário.
  // Usamos listeners nativos como rede de segurança entre navegadores.
  const kick = () => {
    resumeOnUnlock();
  };
  window.addEventListener('pointerdown', kick, { once: false });
  window.addEventListener('keydown', kick, { once: false });
}

export const useAudioStore = create<AudioState>((set, get) => ({
  muted: false,
  volume: 0.5,
  currentEvent: null,

  toggleMute: () => {
    const newMuted = !get().muted;
    Howler.mute(newMuted);
    set({ muted: newMuted });
  },

  setVolume: (vol: number) => {
    Howler.volume(vol);
    set({ volume: vol });
  },

  playSfx: (src: string) => {
    if (get().muted) return;
    const sound = new Howl({
      src: [src],
      volume: get().volume,
      // Fallback silencioso caso o arquivo ainda não exista.
      onloaderror: () => {
        console.warn(`[audio] SFX não encontrado: ${src}`);
      },
    });
    sound.play();
  },

  playBgm: (src: string) => {
    // Já está tocando essa mesma faixa: não faz nada.
    if (currentBgmSrc === src && currentBgm) return;

    if (currentBgm) {
      currentBgm.unload(); // Para e descarrega a música anterior.
    }

    const bgm = new Howl({
      src: [src],
      loop: true,
      volume: get().volume * 0.6, // BGM um pouco mais baixa que SFX.
      onloaderror: () => {
        console.warn(`[audio] trilha não encontrada: ${src}`);
        if (currentBgmSrc === src) {
          currentBgm = null;
          currentBgmSrc = null;
        }
      },
    });

    currentBgm = bgm;
    currentBgmSrc = src;

    if (!get().muted) {
      bgm.play();
    }
  },

  playEventMusic: (event: GameEvent) => {
    // Mesmo evento já ativo: mantém a música tocando sem reiniciar.
    if (get().currentEvent === event) return;

    const src = EVENT_MUSIC[event];
    set({ currentEvent: event });
    get().playBgm(src);
  },

  stopBgm: () => {
    if (currentBgm) {
      currentBgm.stop();
    }
    set({ currentEvent: null });
  },
}));
