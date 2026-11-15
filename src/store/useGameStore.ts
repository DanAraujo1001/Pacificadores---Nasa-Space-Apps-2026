import { create } from "zustand";
import { getMemoryByStageId } from "../data/memories";
import type { DestinationId } from "../types/novel";
import type { DialoguePhase, StageId, WorldId } from "../types/novel";

export type ScreenState =
  | "loading"
  | "menu"
  | "prologue"
  | "playing"
  | "dialogue";

/**
 * Sub-fase do Ato 1 (tela `playing`):
 *  - `intro`: fala de abertura da ECO;
 *  - `select-destination`: escolher Lua ou Marte;
 *  - `select-equipment`: escolher o equipamento do destino;
 *  - `stage`: dentro de um estágio (ver `currentStage`);
 *  - `final`: resolução (todos os estágios concluídos).
 */
export type HubPhase =
  | "intro"
  | "select-destination"
  | "select-equipment"
  | "stage"
  | "final";

export type { StageId, DialoguePhase };

interface GameState {
  currentScreen: ScreenState;
  currentWorld: WorldId;
  /** Estágio ativo durante o gameplay (null no menu/hub). */
  currentStage: StageId | null;
  /** Fase do diálogo: fluxo normal, estágio concluído ou game over. */
  dialoguePhase: DialoguePhase;
  /** Sub-fase do Ato 1 dentro da tela `playing`. */
  hubPhase: HubPhase;
  /** Destino selecionado no hub (null até escolher). */
  selectedDestination: DestinationId | null;
  /** Estágios já concluídos — não podem ser refeitos. */
  completedStageIds: StageId[];
  /** Lembranças desbloqueadas (ids do catálogo). */
  unlockedMemoryIds: string[];
  setScreen: (screen: ScreenState) => void;
  setWorld: (world: WorldId) => void;
  setStage: (stage: StageId | null) => void;
  setDialoguePhase: (phase: DialoguePhase) => void;
  setHubPhase: (phase: HubPhase) => void;
  setSelectedDestination: (destination: DestinationId | null) => void;
  /** Marca um estágio como concluído (idempotente). */
  completeStage: (stage: StageId) => void;
  /** Reinicia o progresso do Ato 1 (novo jogo a partir do menu). */
  resetProgress: () => void;
  unlockMemory: (id: string) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentScreen: "loading",
  currentWorld: "ship",
  currentStage: null,
  dialoguePhase: "normal",
  hubPhase: "intro",
  selectedDestination: null,
  completedStageIds: [],
  unlockedMemoryIds: [],
  setScreen: (screen) => set({ currentScreen: screen }),
  setWorld: (world) => set({ currentWorld: world }),
  setStage: (stage) => set({ currentStage: stage }),
  setHubPhase: (phase) => set({ hubPhase: phase }),
  setSelectedDestination: (destination) =>
    set({ selectedDestination: destination }),
  completeStage: (stage) => {
    const { completedStageIds } = get();
    if (completedStageIds.includes(stage)) return;
    set({ completedStageIds: [...completedStageIds, stage] });
  },
  resetProgress: () =>
    set({
      currentStage: null,
      dialoguePhase: "normal",
      hubPhase: "intro",
      selectedDestination: null,
      completedStageIds: [],
      unlockedMemoryIds: [],
    }),
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