import type { CharacterConfig, CharacterId } from "../types/novel";
import {
  type CharacterSpriteKey,
  type SpriteExpression,
  resolveCharacterSprite,
} from "./sceneAssets";

/**
 * Nome do protagonista. O roteiro usa o placeholder `(Protagonist's Name)`;
 * centralizamos aqui para não repetir texto em vários lugares. Troque num
 * único ponto para renomear em todo o jogo.
 *
 * Em runtime, `withProtagonistName` / telas podem preferir `playerName` do store.
 */
export const PROTAGONIST_NAME = "Vanguard";

/**
 * Token usado nos dados de roteiro no lugar de `(Protagonist's Name)`.
 * Substituído por `PROTAGONIST_NAME` em tempo de render.
 */
export const PROTAGONIST_NAME_TOKEN = "{PROTAGONIST_NAME}";

/** Substitui o token de nome do protagonista pelo nome configurado (ou override). */
export function withProtagonistName(
  text: string,
  displayName: string = PROTAGONIST_NAME,
): string {
  return text.split(PROTAGONIST_NAME_TOKEN).join(displayName);
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
