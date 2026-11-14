import { create } from 'zustand';
import { type WorldId } from '../types/novel.ts';

export type ScreenState = 'loading' | 'menu' | 'playing';

/** Qual equipamento (estágio) o jogador está visitando no momento. */
export type StageId = 'eagle' | 'lrv' | 'spirit' | 'phoenix';

/** Situação do nó de diálogo atual, usada para escolher a trilha. */
export type DialoguePhase = 'normal' | 'clear' | 'game-over';

interface GameState {
  currentScreen: ScreenState;
  currentWorld: WorldId;
  /** Estágio ativo durante o gameplay (null no menu/hub). */
  currentStage: StageId | null;
  /** Fase do diálogo: fluxo normal, estágio concluído ou game over. */
  dialoguePhase: DialoguePhase;
  setScreen: (screen: ScreenState) => void;
  setWorld: (world: WorldId) => void;
  setStage: (stage: StageId | null) => void;
  setDialoguePhase: (phase: DialoguePhase) => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentScreen: 'loading',
  currentWorld: 'ship',
  currentStage: null,
  dialoguePhase: 'normal',
  setScreen: (screen) => set({ currentScreen: screen }),
  setWorld: (world) => set({ currentWorld: world }),
  setStage: (stage) => set({ currentStage: stage }),
  setDialoguePhase: (phase) => set({ dialoguePhase: phase }),
}));
