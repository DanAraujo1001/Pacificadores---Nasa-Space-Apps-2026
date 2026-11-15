import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getMemoryByStageId } from "../data/memories";
import type { DialoguePhase, StageId, WorldId } from "../types/novel";

export type ScreenState =
  | "loading"
  | "menu"
  | "name-entry"
  | "story-loading"
  | "playing"
  | "dialogue";

export type { StageId, DialoguePhase };

interface GameState {
  currentScreen: ScreenState;
  currentWorld: WorldId;
  /** Estágio ativo durante o gameplay (null no menu/hub). */
  currentStage: StageId | null;
  /** Fase do diálogo: fluxo normal, estágio concluído ou game over. */
  dialoguePhase: DialoguePhase;
  /** Lembranças desbloqueadas (ids do catálogo). */
  unlockedMemoryIds: string[];
  /** Nome do protagonista digitado pelo jogador. */
  playerName: string;
  /** Destino do fade (null = sem transição ativa). */
  pendingFadeTo: ScreenState | null;
  /** Se true, o commit do fade também reseta estágio/mundo (volta à Home). */
  homeResetOnFade: boolean;
  setScreen: (screen: ScreenState) => void;
  setWorld: (world: WorldId) => void;
  setStage: (stage: StageId | null) => void;
  setDialoguePhase: (phase: DialoguePhase) => void;
  setPlayerName: (name: string) => void;
  unlockMemory: (id: string) => void;
  /** Fade para outra tela (sem reset de progresso de sessão). */
  fadeToScreen: (screen: ScreenState) => void;
  /** Inicia o fade para a Home (não troca a tela imediatamente). */
  goHome: () => void;
  /** Aplica a troca de tela no meio do fade (tela preta). */
  commitFade: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      currentScreen: "loading",
      currentWorld: "ship",
      currentStage: null,
      dialoguePhase: "normal",
      unlockedMemoryIds: [],
      playerName: "",
      pendingFadeTo: null,
      homeResetOnFade: false,
      setScreen: (screen) => set({ currentScreen: screen }),
      setWorld: (world) => set({ currentWorld: world }),
      setStage: (stage) => set({ currentStage: stage }),
      setDialoguePhase: (phase) => {
        set({ dialoguePhase: phase });

        if (phase !== "clear") return;

        const stage = get().currentStage;
        if (!stage) return;

        const memory = getMemoryByStageId(stage);
        if (!memory) return;

        const { unlockedMemoryIds } = get();
        if (unlockedMemoryIds.includes(memory.id)) return;

        set({ unlockedMemoryIds: [...unlockedMemoryIds, memory.id] });
      },
      setPlayerName: (name) => set({ playerName: name.trim() }),
      unlockMemory: (id) => {
        const { unlockedMemoryIds } = get();
        if (unlockedMemoryIds.includes(id)) return;
        set({ unlockedMemoryIds: [...unlockedMemoryIds, id] });
      },
      fadeToScreen: (screen) => {
        const { currentScreen, pendingFadeTo } = get();
        if (pendingFadeTo || currentScreen === screen) return;
        set({ pendingFadeTo: screen, homeResetOnFade: false });
      },
      goHome: () => {
        const { currentScreen, pendingFadeTo } = get();
        if (pendingFadeTo || currentScreen === "menu") return;
        set({ pendingFadeTo: "menu", homeResetOnFade: true });
      },
      commitFade: () => {
        const { pendingFadeTo, homeResetOnFade } = get();
        if (!pendingFadeTo) return;

        if (homeResetOnFade) {
          set({
            pendingFadeTo: null,
            homeResetOnFade: false,
            currentScreen: "menu",
            currentWorld: "ship",
            currentStage: null,
            dialoguePhase: "normal",
          });
          return;
        }

        set({
          pendingFadeTo: null,
          homeResetOnFade: false,
          currentScreen: pendingFadeTo,
        });
      },
    }),
    {
      name: "echoes-of-astra-save",
      version: 1,
      partialize: (state) => ({
        unlockedMemoryIds: state.unlockedMemoryIds,
        playerName: state.playerName,
      }),
    },
  ),
);
