import type { DestinationId, StageId, WorldId } from "../types/novel";

/**
 * Sistema de save — MÓDULO ÚNICO de acesso ao armazenamento do navegador.
 *
 * Nenhum outro arquivo lê ou escreve no `localStorage`. Há duas chaves
 * separadas e versionadas:
 *  - PROGRESSO (`echoes-of-astra:progress`): a partida em andamento. Apagado ao
 *    terminar o jogo ou ao começar um novo jogo.
 *  - MEMORIES (`echoes-of-astra:memories`): itens obtidos. Sobrevive ao fim do
 *    jogo e a novos saves.
 *
 * Robustez: toda leitura/escrita é protegida (armazenamento indisponível, cota,
 * JSON inválido). Save ausente, corrompido ou de versão incompatível vira
 * `null` (estado seguro = novo jogo), sem lançar erro e sem log no console. Um
 * save de progresso inválido é descartado; os Memories nunca são apagados por
 * causa dele.
 */

export const STORAGE_KEYS = {
  progress: "echoes-of-astra:progress",
  memories: "echoes-of-astra:memories",
  /** Chave antiga (zustand `persist`, v1): só lida para migrar os Memories. */
  legacy: "echoes-of-astra-save",
} as const;

export const PROGRESS_SAVE_VERSION = 1;
export const MEMORIES_SAVE_VERSION = 1;

/** Telas em que a partida pode ser retomada. */
export const RESUMABLE_SCREENS = ["prologue", "playing"] as const;
export type ResumableScreen = (typeof RESUMABLE_SCREENS)[number];

const HUB_PHASES = [
  "intro",
  "select-destination",
  "select-equipment",
  "stage",
  "final",
] as const;
export type SavedHubPhase = (typeof HUB_PHASES)[number];

const STAGE_IDS: readonly StageId[] = ["eagle", "lrv", "spirit", "phoenix"];
const DESTINATION_IDS: readonly DestinationId[] = ["moon", "mars"];
const WORLD_IDS: readonly WorldId[] = ["ship", "moon", "mars"];
const STAGE_PHASES = ["step", "outcome", "clear"] as const;

/** Posição numa cena linear (Ato 0, intro do Ato 1, Final Act). */
export interface ScenePositionSave {
  sceneId: string;
  lineIndex: number;
}

/** Posição exata dentro de um estágio do Ato 1. */
export interface StagePositionSave {
  stageId: StageId;
  stepIndex: number;
  phase: (typeof STAGE_PHASES)[number];
  lineIndex: number;
  /**
   * Id da fala atual. Nas descrições de item divididas, inclui a parte
   * (ex.: `lrv-clear-item-part-2`), para retomar na parte exata.
   */
  lineId: string | null;
  /** Opção escolhida, quando `phase === 'outcome'`. */
  chosenId: string | null;
}

/** Save de progresso (versão 1). */
export interface ProgressSave {
  version: typeof PROGRESS_SAVE_VERSION;
  savedAt: number;
  playerName: string;
  screen: ResumableScreen;
  world: WorldId;
  hubPhase: SavedHubPhase;
  selectedDestination: DestinationId | null;
  currentStage: StageId | null;
  completedStageIds: StageId[];
  /** Itens concedidos nesta partida (o catálogo global fica nos Memories). */
  obtainedItemIds: string[];
  /** Escolhas feitas: `"<stageId>:<stepId>"` → id da opção. */
  choicesMade: Record<string, string>;
  scenePosition: ScenePositionSave | null;
  stagePosition: StagePositionSave | null;
}

interface MemoriesSave {
  version: typeof MEMORIES_SAVE_VERSION;
  obtainedItemIds: string[];
}

/* -------------------------------------------------------------------------- */
/*  Acesso protegido ao armazenamento                                         */
/* -------------------------------------------------------------------------- */

function getStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

function readJson(key: string): unknown {
  const storage = getStorage();
  if (!storage) return null;
  try {
    const raw = storage.getItem(key);
    return raw === null ? null : (JSON.parse(raw) as unknown);
  } catch {
    return undefined; // corrompido
  }
}

function writeJson(key: string, value: unknown): boolean {
  const storage = getStorage();
  if (!storage) return false;
  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function removeKey(key: string): void {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.removeItem(key);
  } catch {
    // Armazenamento indisponível: nada a fazer.
  }
}

/* -------------------------------------------------------------------------- */
/*  Validação                                                                 */
/* -------------------------------------------------------------------------- */

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isString = (value: unknown): value is string => typeof value === "string";

const isIndex = (value: unknown): value is number =>
  typeof value === "number" && Number.isInteger(value) && value >= 0;

function isOneOf<T extends string>(
  list: readonly T[],
  value: unknown,
): value is T {
  return isString(value) && (list as readonly string[]).includes(value);
}

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(isString);

function parseScenePosition(value: unknown): ScenePositionSave | null | undefined {
  if (value === null) return null;
  if (!isRecord(value)) return undefined;
  if (!isString(value.sceneId) || !isIndex(value.lineIndex)) return undefined;
  return { sceneId: value.sceneId, lineIndex: value.lineIndex };
}

function parseStagePosition(value: unknown): StagePositionSave | null | undefined {
  if (value === null) return null;
  if (!isRecord(value)) return undefined;
  if (
    !isOneOf(STAGE_IDS, value.stageId) ||
    !isIndex(value.stepIndex) ||
    !isOneOf(STAGE_PHASES, value.phase) ||
    !isIndex(value.lineIndex) ||
    !(value.lineId === null || isString(value.lineId)) ||
    !(value.chosenId === null || isString(value.chosenId))
  ) {
    return undefined;
  }
  return {
    stageId: value.stageId,
    stepIndex: value.stepIndex,
    phase: value.phase,
    lineIndex: value.lineIndex,
    lineId: value.lineId,
    chosenId: value.chosenId,
  };
}

function parseProgress(value: unknown): ProgressSave | null {
  if (!isRecord(value) || value.version !== PROGRESS_SAVE_VERSION) return null;

  const scenePosition = parseScenePosition(value.scenePosition);
  const stagePosition = parseStagePosition(value.stagePosition);
  const choicesMade = value.choicesMade;

  if (
    typeof value.savedAt !== "number" ||
    !isString(value.playerName) ||
    !isOneOf(RESUMABLE_SCREENS, value.screen) ||
    !isOneOf(WORLD_IDS, value.world) ||
    !isOneOf(HUB_PHASES, value.hubPhase) ||
    !(value.selectedDestination === null ||
      isOneOf(DESTINATION_IDS, value.selectedDestination)) ||
    !(value.currentStage === null || isOneOf(STAGE_IDS, value.currentStage)) ||
    !Array.isArray(value.completedStageIds) ||
    !value.completedStageIds.every((id) => isOneOf(STAGE_IDS, id)) ||
    !isStringArray(value.obtainedItemIds) ||
    !isRecord(choicesMade) ||
    !Object.values(choicesMade).every(isString) ||
    scenePosition === undefined ||
    stagePosition === undefined
  ) {
    return null;
  }

  return {
    version: PROGRESS_SAVE_VERSION,
    savedAt: value.savedAt,
    playerName: value.playerName,
    screen: value.screen,
    world: value.world,
    hubPhase: value.hubPhase,
    selectedDestination: value.selectedDestination,
    currentStage: value.currentStage,
    completedStageIds: [...new Set(value.completedStageIds as StageId[])],
    obtainedItemIds: [...new Set(value.obtainedItemIds)],
    choicesMade: choicesMade as Record<string, string>,
    scenePosition,
    stagePosition,
  };
}

/* -------------------------------------------------------------------------- */
/*  Progresso                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Lê o save de progresso. Ausente → `null`. Corrompido ou de versão
 * incompatível → descartado e `null` (novo jogo), sem tocar nos Memories.
 */
export function loadProgress(): ProgressSave | null {
  const raw = readJson(STORAGE_KEYS.progress);
  if (raw === null) return null;
  const save = parseProgress(raw);
  if (!save) removeKey(STORAGE_KEYS.progress);
  return save;
}

export function hasProgress(): boolean {
  return loadProgress() !== null;
}

export function saveProgress(save: Omit<ProgressSave, "version" | "savedAt">): void {
  writeJson(STORAGE_KEYS.progress, {
    ...save,
    version: PROGRESS_SAVE_VERSION,
    savedAt: Date.now(),
  } satisfies ProgressSave);
}

export function clearProgress(): void {
  removeKey(STORAGE_KEYS.progress);
}

/* -------------------------------------------------------------------------- */
/*  Memories                                                                  */
/* -------------------------------------------------------------------------- */

/** Converte os ids da versão antiga (`memory-<stage>`) para os itens atuais. */
function migrateLegacyMemories(): string[] {
  const raw = readJson(STORAGE_KEYS.legacy);
  if (raw === null) return [];
  removeKey(STORAGE_KEYS.legacy);
  if (!isRecord(raw) || !isRecord(raw.state)) return [];
  const ids = raw.state.unlockedMemoryIds;
  if (!isStringArray(ids)) return [];
  return ids
    .map((id) => id.replace(/^memory-/, "item-"))
    .filter((id) => STAGE_IDS.some((stage) => id === `item-${stage}`));
}

/** Lê os itens obtidos (Memories). Nunca lança; inválido → lista vazia. */
export function loadMemories(): string[] {
  const legacy = migrateLegacyMemories();
  const raw = readJson(STORAGE_KEYS.memories);
  let ids: string[] = [];
  if (
    isRecord(raw) &&
    raw.version === MEMORIES_SAVE_VERSION &&
    isStringArray(raw.obtainedItemIds)
  ) {
    ids = raw.obtainedItemIds;
  }
  const merged = [...new Set([...ids, ...legacy])];
  if (legacy.length > 0) saveMemories(merged);
  return merged;
}

export function saveMemories(obtainedItemIds: string[]): void {
  writeJson(STORAGE_KEYS.memories, {
    version: MEMORIES_SAVE_VERSION,
    obtainedItemIds: [...new Set(obtainedItemIds)],
  } satisfies MemoriesSave);
}
