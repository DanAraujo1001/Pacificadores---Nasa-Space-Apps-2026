import type { StageId, StageScript } from '../../types/novel';
import { EAGLE_STAGE } from './eagle';
import { LRV_STAGE } from './lrv';
import { SPIRIT_STAGE } from './spirit';
import { PHOENIX_STAGE } from './phoenix';

/** Registro central de roteiros de estágio, indexado por `StageId`. */
export const STAGE_SCRIPTS: Record<StageId, StageScript> = {
  eagle: EAGLE_STAGE,
  lrv: LRV_STAGE,
  spirit: SPIRIT_STAGE,
  phoenix: PHOENIX_STAGE,
};

export function getStageScript(stageId: StageId): StageScript {
  return STAGE_SCRIPTS[stageId];
}
