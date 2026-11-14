export type WorldId = 'ship' | 'moon' | 'mars';

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

export type CharacterId = '';

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