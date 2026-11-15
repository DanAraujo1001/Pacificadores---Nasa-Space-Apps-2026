import { create } from "zustand";
import { getMemoryByStageId } from "../data/memories";
import type { DialoguePhase, StageId, WorldId } from "../types/novel";

export type ScreenState =
  | "loading"
  | "menu"
  | "prologue"
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
  setScreen: (screen: ScreenState) => void;
  setWorld: (world: WorldId) => void;
  setStage: (stage: StageId | null) => void;
  setDialoguePhase: (phase: DialoguePhase) => void;
  unlockMemory: (id: string) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentScreen: "loading",
  currentWorld: "ship",
  currentStage: null,
  dialoguePhase: "normal",
  unlockedMemoryIds: [],
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
  unlockMemory: (id) => {
    const { unlockedMemoryIds } = get();
    if (unlockedMemoryIds.includes(id)) return;
    set({ unlockedMemoryIds: [...unlockedMemoryIds, id] });
  },
}));