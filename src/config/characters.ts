import type { CharacterConfig, CharacterId } from '../types/novel';
import { SPRITE_ASSETS } from './sceneAssets';

/**
 * Nome do protagonista. O roteiro usa o placeholder `(Protagonist's Name)`;
 * centralizamos aqui para não repetir texto em vários lugares. Troque num
 * único ponto para renomear em todo o jogo.
 */
export const PROTAGONIST_NAME = 'Vanguard';

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
};

export function getCharacter(id: CharacterId): CharacterConfig | null {
  if (id === '') return null;
  return CHARACTERS[id] ?? null;
}
