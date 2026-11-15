import { create } from "zustand";
import {
  clearProgress,
  loadProgress,
  RESUMABLE_SCREENS,
  saveProgress,
  type ScenePositionSave,
  type StagePositionSave,
} from "../engine/saveSystem";
import { useMemoriesStore } from "./useMemoriesStore";
import type { DestinationId } from "../types/novel";
import type { DialoguePhase, StageId, WorldId } from "../types/novel";

export type ScreenState =
  | "loading"
  | "menu"
  | "name-entry"
  | "story-loading"
  | "prologue"
  | "playing"
  | "team";

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
export type { ScenePositionSave, StagePositionSave };

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
  /** Itens concedidos NESTA partida (o registro global fica nos Memories). */
  obtainedItemIds: string[];
  /** Escolhas feitas: `"<stageId>:<stepId>"` → id da opção. */
  choicesMade: Record<string, string>;
  /** Posição na cena linear atual (Ato 0, intro do Ato 1, Final Act). */
  scenePosition: ScenePositionSave | null;
  /** Posição exata no estágio atual. */
  stagePosition: StagePositionSave | null;
  /** Há uma partida em andamento sendo salva automaticamente. */
  runActive: boolean;
  /** Nome do protagonista digitado pelo jogador. */
  playerName: string;
  /** Destino do fade (null = sem transição ativa). */
  pendingFadeTo: ScreenState | null;
  /** Se true, o commit do fade também reseta a sessão (volta à Home). */
  homeResetOnFade: boolean;
  setScreen: (screen: ScreenState) => void;
  setWorld: (world: WorldId) => void;
  setStage: (stage: StageId | null) => void;
  setDialoguePhase: (phase: DialoguePhase) => void;
  setHubPhase: (phase: HubPhase) => void;
  setSelectedDestination: (destination: DestinationId | null) => void;
  /** Marca um estágio como concluído (idempotente). */
  completeStage: (stage: StageId) => void;
  setPlayerName: (name: string) => void;
  /** Concede um item uma única vez (partida + Memories). */
  grantItem: (itemId: string) => void;
  recordChoice: (stage: StageId, stepId: string, choiceId: string) => void;
  setScenePosition: (position: ScenePositionSave | null) => void;
  setStagePosition: (position: StagePositionSave | null) => void;
  /** Novo jogo: apaga o save de progresso (Memories ficam) e começa do zero. */
  startNewGame: () => void;
  /** Retoma o save de progresso. Retorna false se não houver save válido. */
  continueGame: () => boolean;
  /** Fim do jogo: encerra o save de progresso (Memories ficam). */
  endRun: () => void;
  /** Fade para outra tela (sem reset de progresso de sessão). */
  fadeToScreen: (screen: ScreenState) => void;
  /** Inicia o fade para a Home (não troca a tela imediatamente). */
  goHome: () => void;
  /** Aplica a troca de tela no meio do fade (tela preta). */
  commitFade: () => void;
}

/** Estado de sessão de uma partida nova (sem tela/nome). */
const FRESH_RUN = {
  currentWorld: "ship" as WorldId,
  currentStage: null,
  dialoguePhase: "normal" as DialoguePhase,
  hubPhase: "intro" as HubPhase,
  selectedDestination: null,
  completedStageIds: [] as StageId[],
  obtainedItemIds: [] as string[],
  choicesMade: {} as Record<string, string>,
  scenePosition: null,
  stagePosition: null,
};

export const useGameStore = create<GameState>()((set, get) => ({
  currentScreen: "loading",
  ...FRESH_RUN,
  runActive: false,
  playerName: "",
  pendingFadeTo: null,
  homeResetOnFade: false,
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
  setDialoguePhase: (phase) => set({ dialoguePhase: phase }),
  setPlayerName: (name) => set({ playerName: name.trim() }),
  grantItem: (itemId) => {
    useMemoriesStore.getState().addItem(itemId);
    const { obtainedItemIds } = get();
    if (obtainedItemIds.includes(itemId)) return;
    set({ obtainedItemIds: [...obtainedItemIds, itemId] });
  },
  recordChoice: (stage, stepId, choiceId) => {
    const key = `${stage}:${stepId}`;
    const { choicesMade } = get();
    if (choicesMade[key] === choiceId) return;
    set({ choicesMade: { ...choicesMade, [key]: choiceId } });
  },
  setScenePosition: (position) => set({ scenePosition: position }),
  setStagePosition: (position) => set({ stagePosition: position }),
  startNewGame: () => {
    clearProgress();
    set({ ...FRESH_RUN, runActive: true });
  },
  continueGame: () => {
    const save = loadProgress();
    if (!save) return false;
    const { pendingFadeTo } = get();
    if (pendingFadeTo) return false;
    // Garante nos Memories os itens desta partida (sem duplicar).
    save.obtainedItemIds.forEach((id) =>
      useMemoriesStore.getState().addItem(id),
    );
    // Regra de negócio: estágio concluído continua bloqueado. Se o save parou
    // num estágio já concluído (ex.: Home durante o fade de volta ao hub), ou
    // num estágio sem estágio definido, retoma na escolha de destino.
    const stageLocked =
      save.hubPhase === "stage" &&
      (save.currentStage === null ||
        save.completedStageIds.includes(save.currentStage));
    set({
      currentWorld: stageLocked ? "ship" : save.world,
      currentStage: stageLocked ? null : save.currentStage,
      dialoguePhase: "normal",
      hubPhase: stageLocked ? "select-destination" : save.hubPhase,
      selectedDestination: stageLocked ? null : save.selectedDestination,
      completedStageIds: save.completedStageIds,
      obtainedItemIds: save.obtainedItemIds,
      choicesMade: save.choicesMade,
      scenePosition: save.scenePosition,
      stagePosition: stageLocked ? null : save.stagePosition,
      playerName: save.playerName,
      runActive: true,
      pendingFadeTo: save.screen,
      homeResetOnFade: false,
    });
    return true;
  },
  endRun: () => {
    clearProgress();
    set({ runActive: false });
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
      // Volta à Home: a sessão em memória é limpa, mas o save de progresso em
      // disco continua (o autosave não escreve fora das telas retomáveis).
      set({
        ...FRESH_RUN,
        pendingFadeTo: null,
        homeResetOnFade: false,
        currentScreen: "menu",
        runActive: false,
      });
      return;
    }

    set({
      pendingFadeTo: null,
      homeResetOnFade: false,
      currentScreen: pendingFadeTo,
    });
  },
}));

/* -------------------------------------------------------------------------- */
/*  Autosave                                                                  */
/* -------------------------------------------------------------------------- */

let stopAutosave: (() => void) | null = null;

/**
 * Salva o progresso automaticamente sempre que o estado da partida muda (cada
 * avanço de fala, escolha, item e conclusão de estágio passam pelo store).
 * Só escreve quando há partida ativa numa tela retomável, e só quando o
 * conteúdo mudou (comparação do JSON), para não gerar escritas à toa.
 * Chame UMA vez na inicialização (feito em `main.tsx`).
 */
export function initProgressAutosave(): () => void {
  if (stopAutosave) return stopAutosave;
  let lastWritten = "";

  const persist = (state: GameState) => {
    if (!state.runActive) {
      // Partida encerrada/pausada na Home: a próxima escrita sempre acontece.
      lastWritten = "";
      return;
    }
    const screen = state.currentScreen;
    if (!(RESUMABLE_SCREENS as readonly string[]).includes(screen)) return;
    const snapshot = {
      playerName: state.playerName,
      screen: screen as (typeof RESUMABLE_SCREENS)[number],
      world: state.currentWorld,
      hubPhase: state.hubPhase,
      selectedDestination: state.selectedDestination,
      currentStage: state.currentStage,
      completedStageIds: state.completedStageIds,
      obtainedItemIds: state.obtainedItemIds,
      choicesMade: state.choicesMade,
      scenePosition: state.scenePosition,
      stagePosition: state.stagePosition,
    };
    const serialized = JSON.stringify(snapshot);
    if (serialized === lastWritten) return;
    lastWritten = serialized;
    saveProgress(snapshot);
  };

  stopAutosave = useGameStore.subscribe(persist);
  return () => {
    stopAutosave?.();
    stopAutosave = null;
  };
}
