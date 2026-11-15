import type {
  DestinationConfig,
  EquipmentConfig,
  StageId,
} from "../types/novel";
import {
  BACKGROUND_ASSETS,
  DESTINATION_ICON_ASSETS,
  EQUIPMENT_ICON_ASSETS,
} from "./sceneAssets";

/**
 * Fonte única dos destinos (Lua / Marte) e dos equipamentos de cada um.
 *
 * Nenhuma tela deve embutir a lista de estágios manualmente — todas consomem
 * esta config. Para adicionar/remover um estágio, mexe-se só aqui.
 */
export const DESTINATIONS: DestinationConfig[] = [
  {
    id: "moon",
    label: "The Moon",
    stageIds: ["eagle", "lrv"],
    backgroundAsset: BACKGROUND_ASSETS.chooseMoon,
    backgroundPlaceholderLabel: "The Moon — choose equipment",
    iconAsset: DESTINATION_ICON_ASSETS.moon,
    // Retângulo do SVG de referência (1519×569): x=1261 y=125 w=211 h=221.
    hotspot: {
      desktop: { left: "83.0145%", top: "16.9684%" },
      narrow: { left: "83.0145%", top: "16.9684%" },
    },
    iconWidth: { desktop: "13.8907%", narrow: "13.8907%" },
    iconHeight: { desktop: "38.8401%", narrow: "38.8401%" },
  },
  {
    id: "mars",
    label: "Mars",
    stageIds: ["spirit", "phoenix"],
    backgroundAsset: BACKGROUND_ASSETS.chooseMars,
    backgroundPlaceholderLabel: "Mars — choose equipment",
    iconAsset: DESTINATION_ICON_ASSETS.mars,
    // Retângulo do SVG de referência (1519×569): x=342 y=124 w=251 h=230.
    hotspot: {
      desktop: { left: "22.5148%", top: "17.7926%" },
      narrow: { left: "22.5148%", top: "17.7926%" },
    },
    iconWidth: { desktop: "16.524%", narrow: "16.524%" },
    iconHeight: { desktop: "40.4218%", narrow: "40.4218%" },
  },
];

/** Metadados por equipamento (rótulo, destino e ícone do hub). */
export const EQUIPMENT: Record<StageId, EquipmentConfig> = {
  eagle: {
    stageId: "eagle",
    label: "Eagle",
    world: "moon",
    iconAsset: EQUIPMENT_ICON_ASSETS.eagle,
    hotspot: {
      desktop: { left: "28%", top: "56%" },
      narrow: { left: "24%", top: "62%" },
    },
  },
  lrv: {
    stageId: "lrv",
    label: "LRV",
    world: "moon",
    iconAsset: EQUIPMENT_ICON_ASSETS.lrv,
    hotspot: {
      desktop: { left: "58%", top: "60%" },
      narrow: { left: "74%", top: "66%" },
    },
  },
  spirit: {
    stageId: "spirit",
    label: "Spirit",
    world: "mars",
    iconAsset: EQUIPMENT_ICON_ASSETS.spirit,
    hotspot: {
      desktop: { left: "30%", top: "58%" },
      narrow: { left: "24%", top: "64%" },
    },
  },
  phoenix: {
    stageId: "phoenix",
    label: "Phoenix",
    world: "mars",
    iconAsset: EQUIPMENT_ICON_ASSETS.phoenix,
    hotspot: {
      desktop: { left: "64%", top: "56%" },
      narrow: { left: "74%", top: "60%" },
    },
  },
};

/** Todos os ids de estágio, derivados da config (sem lista solta). */
export const ALL_STAGE_IDS: StageId[] = DESTINATIONS.flatMap(
  (destination) => destination.stageIds,
);

export function getDestination(
  id: DestinationConfig["id"],
): DestinationConfig | undefined {
  return DESTINATIONS.find((destination) => destination.id === id);
}

export function getEquipment(stageId: StageId): EquipmentConfig {
  return EQUIPMENT[stageId];
}
