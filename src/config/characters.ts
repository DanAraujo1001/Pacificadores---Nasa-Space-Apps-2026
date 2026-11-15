import type { CharacterConfig, CharacterId } from "../types/novel";
import {
  type CharacterSpriteKey,
  type SpriteExpression,
  resolveCharacterSprite,
} from "./sceneAssets";

/**
 * Nome padrão do protagonista (fallback). O jogador define o nome na tela de
 * entrada (`playerName` no store); este valor só é usado quando nenhum nome
 * foi digitado.
 */
export const PROTAGONIST_NAME = "Vanguard";

/**
 * Token usado nos dados de roteiro no lugar de `(Protagonist's Name)`.
 * Substituído em tempo de render pelo nome do jogador (ou pelo fallback).
 */
export const PROTAGONIST_NAME_TOKEN = "{PROTAGONIST_NAME}";

/** Resolve o nome do protagonista: o digitado pelo jogador, ou o fallback. */
export function resolveProtagonistName(playerName?: string): string {
  const trimmed = playerName?.trim();
  return trimmed ? trimmed : PROTAGONIST_NAME;
}

/**
 * Substitui o token de nome do protagonista pelo nome do jogador.
 * Sem `playerName`, usa o fallback `PROTAGONIST_NAME`.
 */
export function withProtagonistName(text: string, playerName?: string): string {
  return text
    .split(PROTAGONIST_NAME_TOKEN)
    .join(resolveProtagonistName(playerName));
}

/** Mapeia CharacterId → chave do pack de sprites. */
const SPRITE_KEY_BY_CHARACTER: Partial<
  Record<Exclude<CharacterId, "">, CharacterSpriteKey>
> = {
  protagonist: "protagonist",
  "grandpa-tadeu": "grandpaTadeu",
  eco: "eco",
  eagle: "eagle",
  lrv: "lrv",
  spirit: "spirit",
  phoenix: "phoenix",
};

/**
 * Configuração central e única de posicionamento/identidade dos personagens.
 *
 * Regra de palco (obrigatória):
 *  - O protagonista fica SEMPRE à esquerda.
 *  - Todo personagem novo que entra em cena fica à direita.
 *
 * Defina lados, nomes e sprites APENAS aqui. As cenas consomem esta config,
 * então não há coordenadas nem caminhos soltos espalhados pelos componentes.
 */
export const CHARACTERS: Record<
  Exclude<CharacterId, "">,
  CharacterConfig
> = {
  protagonist: {
    id: "protagonist",
    displayName: PROTAGONIST_NAME,
    side: "left",
    spriteAsset: resolveCharacterSprite("protagonist"),
    placeholderLabel: PROTAGONIST_NAME,
  },
  "grandpa-tadeu": {
    id: "grandpa-tadeu",
    displayName: "Grandpa Tadeu",
    side: "right",
    spriteAsset: resolveCharacterSprite("grandpaTadeu"),
    placeholderLabel: "Grandpa Tadeu",
  },
  eco: {
    id: "eco",
    displayName: "ECO",
    side: "right",
    spriteAsset: resolveCharacterSprite("eco"),
    placeholderLabel: "ECO",
    // Abaixa um pouco a ECO em relação à base da barra de diálogo.
    spriteBottomNudge: "2.5rem",
  },
  narrator: {
    id: "narrator",
    displayName: "Narrator",
    side: "right",
    spriteAsset: null,
    placeholderLabel: "Narrator",
  },
  eagle: {
    id: "eagle",
    displayName: "Eagle",
    side: "right",
    spriteAsset: resolveCharacterSprite("eagle"),
    placeholderLabel: "Eagle",
  },
  lrv: {
    id: "lrv",
    displayName: "LRV",
    side: "right",
    spriteAsset: resolveCharacterSprite("lrv"),
    placeholderLabel: "LRV",
  },
  spirit: {
    id: "spirit",
    displayName: "Spirit",
    side: "right",
    spriteAsset: resolveCharacterSprite("spirit"),
    placeholderLabel: "Spirit",
  },
  phoenix: {
    id: "phoenix",
    displayName: "Phoenix",
    side: "right",
    spriteAsset: resolveCharacterSprite("phoenix"),
    placeholderLabel: "Phoenix",
  },
};

export function getCharacter(id: CharacterId): CharacterConfig | null {
  if (id === "") return null;
  return CHARACTERS[id] ?? null;
}

/** Caminho do sprite para um personagem + expressão (fallback → normal / null). */
export function getCharacterSpriteSrc(
  id: CharacterId,
  expression: SpriteExpression = "normal",
): string | null {
  if (id === "") return null;
  const key = SPRITE_KEY_BY_CHARACTER[id];
  if (!key) return CHARACTERS[id]?.spriteAsset ?? null;
  return resolveCharacterSprite(key, expression);
}

/**
 * Nome a exibir no nameplate de um personagem. Para o protagonista, usa o nome
 * digitado pelo jogador (`playerName`); para os demais, o `displayName` da config.
 */
export function getSpeakerDisplayName(
  id: CharacterId,
  playerName?: string,
): string | null {
  const character = getCharacter(id);
  if (!character) return null;
  if (character.id === "protagonist") return resolveProtagonistName(playerName);
  return character.displayName;
}
