import { ITEM_ICON_ASSETS } from "../config/sceneAssets";
import type { StageId } from "../types/novel";

/**
 * Catálogo central de ITENS de conquista (um por estágio).
 *
 * Fonte ÚNICA da verdade para: id, estágio de origem, nome exibido, descrição
 * (mesmo texto da fala da Eco, usado também no Memories) e caminho do ícone.
 * Consumido pela tela de item obtido (`ItemReward`), pelo Memories e pelo save.
 *
 * As descrições são VERBATIM das falas de item do roteiro
 * (`echoes_of_astra_game_script.md`) e dos dados de estágio (`*-clear-item`),
 * sem o prefixo "Item Obtained:" (esse prefixo existe só na fala da Eco).
 *
 * Ícones: `iconAsset` aponta para o arquivo final; enquanto não existir, a UI
 * cai para um placeholder neutro com o nome do item (ver `ItemReward`/`MemorySlot`).
 */
export interface GameItem {
  id: string;
  /** Estágio que concede o item. */
  stageId: StageId;
  /** Nome exibido (UI e Memories). */
  name: string;
  /** Descrição (sem o prefixo "Item Obtained:"). */
  description: string;
  /** Caminho do ícone/sprite do item (pode ainda não existir em disco). */
  iconAsset: string;
}

export const ITEMS: GameItem[] = [
  {
    id: "item-eagle",
    stageId: "eagle",
    name: "Tranquility Base Plaque",
    description:
      "Eagle Descent Stage (Apollo 11). The lunar module that landed in the Sea of Tranquility on July 20, 1969. Its descent stage remains on the Moon as an abandoned launchpad, carrying a plaque stating that humans came in peace for all mankind. The ascent stage (the upper half) lifted off, docked with the command module Columbia, and was later jettisoned into lunar orbit; after signal loss it is believed to have crashed on the lunar surface, with its exact impact site never confirmed (NASA estimates Mare Crisium, roughly 800 km / 500 miles from Tranquility Base).",
    iconAsset: ITEM_ICON_ASSETS.eagle,
  },
  {
    id: "item-lrv",
    stageId: "lrv",
    name: "Genesis Rock, Big Muley & Orange Soil",
    description:
      "Three famous samples the Lunar Roving Vehicles helped astronauts reach and bring home. The Genesis Rock, an ancient piece of the Moon's early crust, was collected by Apollo 15 in 1971. Big Muley, the largest rock returned by any Apollo mission (about 11.7 kg), was picked up by Apollo 16 in 1972. The Orange Soil, tiny beads of volcanic glass, was found by Apollo 17 at Shorty Crater in 1972. With the rovers, crews drove far beyond their landing sites and hauled back treasures from places no one had reached before.",
    iconAsset: ITEM_ICON_ASSETS.lrv,
  },
  {
    id: "item-spirit",
    stageId: "spirit",
    name: "Pure Silica Mars",
    description:
      "Nearly pure silica soil uncovered by the Mars Exploration Rover \u201cSpirit\u201d (MER-A) at Home Plate, in the Columbia Hills of Gusev Crater, in 2007. Spirit landed on January 4, 2004 for a ~90-sol (Martian-day) prime mission and kept working for over six years. This bright, silica-rich soil is some of the strongest evidence that hot water once flowed on Mars, the kind of hydrothermal setting where life can take hold. Spirit's last communication came on March 22, 2010 (Sol 2210), and NASA declared the mission complete on May 25, 2011.",
    iconAsset: ITEM_ICON_ASSETS.spirit,
  },
  {
    id: "item-phoenix",
    stageId: "phoenix",
    name: "Martian Ice Core",
    description:
      "Phoenix Mars Lander. Landed on the Martian arctic plains (Vastitas Borealis) on May 25, 2008. Using a robotic arm to trench and analyze soil and ice, it confirmed the presence of water ice on Mars. It operated for 157 sols, its last communication on November 2, 2008, before the darkness of Martian winter and dwindling solar power brought the mission to an end.",
    iconAsset: ITEM_ICON_ASSETS.phoenix,
  },
];

/**
 * Texto da fala de item obtido dita pela Eco, no formato do roteiro:
 * "Item Obtained: [nome]. [descrição]". Gerado do catálogo para não duplicar.
 */
export function itemObtainedText(id: string): string {
  const item = getItemById(id);
  if (!item) throw new Error(`Item desconhecido: ${id}`);
  return `Item Obtained: ${item.name}. ${item.description}`;
}

export function getItemById(id: string): GameItem | undefined {
  return ITEMS.find((item) => item.id === id);
}
