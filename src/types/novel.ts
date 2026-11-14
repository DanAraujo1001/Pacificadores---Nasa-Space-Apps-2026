export type WorldId = 'ship' | 'moon' | 'mars';

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