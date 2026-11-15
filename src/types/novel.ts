export type WorldId = 'ship' | 'moon' | 'mars';

/** Equipamento / estágio de missão visitável. */
export type StageId = 'eagle' | 'lrv' | 'spirit' | 'phoenix';

/** Situação do nó de diálogo atual (também usada pela trilha). */
export type DialoguePhase = 'normal' | 'clear' | 'game-over';

/**
 * Eventos narrativos que disparam uma trilha sonora específica.
 * Cada estágio e ato do roteiro (echoes_of_astra_game_script.md) é um evento.
 */
export type GameEvent =
  | 'prologue' // ACT 0: sótão, chuva
  | 'hub' // ACT 1: seleção de missão (ECO)
  | 'stage-eagle' // STAGE 1: Lua — Eagle (Apollo 11)
  | 'stage-lrv' // STAGE 2: Lua — LRVs
  | 'stage-spirit' // STAGE 3: Marte — Spirit
  | 'stage-phoenix' // STAGE 4: Marte — Phoenix
  | 'stage-clear' // Sucesso de um estágio
  | 'game-over' // Evento falhou / sinal perdido
  | 'final'; // FINAL ACT: resolução

/**
 * Identificadores de personagens com fala no roteiro
 * (echoes_of_astra_game_script.md). O protagonista é parametrizado por nome,
 * mas seu id é estável para posicionamento e configuração.
 */
export type CharacterId =
  | '' // vazio: legado / nó sem personagem definido
  | 'protagonist'
  | 'grandpa-tadeu'
  | 'eco'
  | 'narrator';

/** Lado da tela onde o sprite do personagem é ancorado. */
export type CharacterSide = 'left' | 'right';

/**
 * Configuração central e única de um personagem: nome exibido, lado da tela,
 * caminho do sprite e rótulo do placeholder. Consumida por todas as cenas,
 * para que posição/alinhamento não fiquem espalhados em vários arquivos.
 */
export interface CharacterConfig {
  id: CharacterId;
  /** Nome exibido no nameplate da caixa de diálogo. */
  displayName: string;
  side: CharacterSide;
  /** Caminho do sprite final (pode ainda não existir em disco). */
  spriteAsset: string | null;
  /** Texto mostrado no placeholder quando o sprite não existe. */
  placeholderLabel: string;
}

/** Uma fala de uma cena linear (sem escolhas), como o Ato 0. */
export interface ScriptLine {
  id: string;
  /** Quem fala. null = narração / rubrica sem personagem em cena. */
  speakerId: CharacterId | null;
  text: string;
  /**
   * Quando definido, o personagem entra em cena a partir desta fala.
   * Usado para controlar continuidade (quem está em cena e quando).
   */
  entersCharacterId?: CharacterId;
  /** Quando true, o personagem indicado sai de cena após esta fala. */
  exitsCharacterId?: CharacterId;
}

/** Roteiro de uma cena linear (prólogo/epílogo). */
export interface LinearScene {
  id: string;
  world: WorldId;
  backgroundAsset: string | null;
  backgroundPlaceholderLabel: string;
  lines: ScriptLine[];
}

export type Expression = 'neutral' | 'happy' | 'sad' | 'glitch';

export interface DialogueChoice {
  id: string;
  label: string;
  nextNodeId: string;
  effects?: {
    empathy?: number;
    science?: number;
    unlockLogId?: string;
  };
}

export interface DialogueNode {
  id: string;
  speakerId: CharacterId;
  expression: Expression;
  telemetryStatus?: string;
  text: string;
  choices?: DialogueChoice[];
  nextNodeId?: string;
  isEnding?: boolean;
}

export interface MissionScript {
  id: string;
  world: WorldId;
  characterId: CharacterId;
  characterName: string;
  missionTag: string;
  backgroundAsset: string;
  initialNodeId: string;
  nodes: Record<string, DialogueNode>;
}