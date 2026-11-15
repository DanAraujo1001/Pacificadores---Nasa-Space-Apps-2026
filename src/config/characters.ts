import type { CharacterConfig, CharacterId } from '../types/novel';
import { SPRITE_ASSETS } from './sceneAssets';

/**
 * Nome do protagonista. O roteiro usa o placeholder `(Protagonist's Name)`;
 * centralizamos aqui para não repetir texto em vários lugares. Troque num
 * único ponto para renomear em todo o jogo.
 */
export const PROTAGONIST_NAME = 'Vanguard';

/**
 * Token usado nos dados de roteiro no lugar de `(Protagonist's Name)`.
 * Substituído por `PROTAGONIST_NAME` em tempo de render.
 */
export const PROTAGONIST_NAME_TOKEN = '{PROTAGONIST_NAME}';

/** Substitui o token de nome do protagonista pelo nome configurado. */
export function withProtagonistName(text: string): string {
  return text.split(PROTAGONIST_NAME_TOKEN).join(PROTAGONIST_NAME);
}

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
  Exclude<CharacterId, ''>,
  CharacterConfig
> = {
  protagonist: {
    id: 'protagonist',
    displayName: PROTAGONIST_NAME,
    side: 'left',
    spriteAsset: SPRITE_ASSETS.protagonist,
    placeholderLabel: PROTAGONIST_NAME,
  },
  'grandpa-tadeu': {
    id: 'grandpa-tadeu',
    displayName: 'Grandpa Tadeu',
    side: 'right',
    spriteAsset: SPRITE_ASSETS.grandpaTadeu,
    placeholderLabel: 'Grandpa Tadeu',
  },
  eco: {
    id: 'eco',
    displayName: 'ECO',
    side: 'right',
    // A Eco é a IA do capacete: sem corpo em cena no prólogo, mas mantemos
    // config consistente (lado direito) caso receba sprite depois.
    spriteAsset: SPRITE_ASSETS.eco,
    placeholderLabel: 'ECO',
  },
  narrator: {
    id: 'narrator',
    displayName: 'Narrator',
    side: 'right',
    spriteAsset: null,
    placeholderLabel: 'Narrator',
  },
  // Equipamentos (ACT 1): todos entram em cena à direita, como personagens novos.
  eagle: {
    id: 'eagle',
    displayName: 'Eagle',
    side: 'right',
    spriteAsset: SPRITE_ASSETS.eagle,
    placeholderLabel: 'Eagle',
  },
  lrv: {
    id: 'lrv',
    displayName: 'LRV',
    side: 'right',
    spriteAsset: SPRITE_ASSETS.lrv,
    placeholderLabel: 'LRV',
  },
  spirit: {
    id: 'spirit',
    displayName: 'Spirit',
    side: 'right',
    spriteAsset: SPRITE_ASSETS.spirit,
    placeholderLabel: 'Spirit',
  },
  phoenix: {
    id: 'phoenix',
    displayName: 'Phoenix',
    side: 'right',
    spriteAsset: SPRITE_ASSETS.phoenix,
    placeholderLabel: 'Phoenix',
  },
};

export function getCharacter(id: CharacterId): CharacterConfig | null {
  if (id === '') return null;
  return CHARACTERS[id] ?? null;
}
