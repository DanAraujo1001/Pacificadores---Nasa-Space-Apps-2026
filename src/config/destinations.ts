import type { DestinationConfig, EquipmentConfig, StageId } from '../types/novel';
import { EQUIPMENT_ICON_ASSETS } from './sceneAssets';

/**
 * Fonte única dos destinos (Lua / Marte) e dos equipamentos de cada um.
 *
 * Nenhuma tela deve embutir a lista de estágios manualmente — todas consomem
 * esta config. Para adicionar/remover um estágio, mexe-se só aqui.
 */
export const DESTINATIONS: DestinationConfig[] = [
  {
    id: 'moon',
    label: 'The Moon',
    stageIds: ['eagle', 'lrv'],
  },
  {
    id: 'mars',
    label: 'Mars',
    stageIds: ['spirit', 'phoenix'],
  },
];

/** Metadados por equipamento (rótulo, destino e ícone do hub). */
export const EQUIPMENT: Record<StageId, EquipmentConfig> = {
  eagle: {
    stageId: 'eagle',
    label: 'Eagle',
    world: 'moon',
    iconAsset: EQUIPMENT_ICON_ASSETS.eagle,
  },
  lrv: {
    stageId: 'lrv',
    label: 'LRV',
    world: 'moon',
    iconAsset: EQUIPMENT_ICON_ASSETS.lrv,
  },
  spirit: {
    stageId: 'spirit',
    label: 'Spirit',
    world: 'mars',
    iconAsset: EQUIPMENT_ICON_ASSETS.spirit,
  },
  phoenix: {
    stageId: 'phoenix',
    label: 'Phoenix',
    world: 'mars',
    iconAsset: EQUIPMENT_ICON_ASSETS.phoenix,
  },
};

/** Todos os ids de estágio, derivados da config (sem lista solta). */
export const ALL_STAGE_IDS: StageId[] = DESTINATIONS.flatMap(
  (destination) => destination.stageIds,
);

export function getDestination(
  id: DestinationConfig['id'],
): DestinationConfig | undefined {
  return DESTINATIONS.find((destination) => destination.id === id);
}

export function getEquipment(stageId: StageId): EquipmentConfig {
  return EQUIPMENT[stageId];
}
