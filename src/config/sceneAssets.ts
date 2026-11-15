/**
 * Fonte única dos caminhos de assets das cenas.
 *
 * Todos os caminhos são servidos a partir da raiz de `public/`
 * (ex.: `public/assets/backgrounds/act0-attic.png` → `/assets/backgrounds/act0-attic.png`).
 *
 * Para trocar um asset, basta colocar o arquivo final na pasta indicada com o
 * nome esperado abaixo — nenhum código precisa mudar. Enquanto o arquivo não
 * existir, a cena usa um placeholder visual automaticamente (ver
 * `SceneBackground` / `CharacterSprite`), sem quebrar nada.
 *
 * Veja `public/assets/README-ASSETS.md` para a lista completa de pendências.
 */

export const BACKGROUND_ASSETS = {
  /** ACT 0 — sótão com fotos antigas, maquetes e um capacete; chove lá fora. */
  act0Attic: '/assets/backgrounds/act0-attic.png',
} as const;

export const SPRITE_ASSETS = {
  /** Sprite do protagonista (reutiliza o player existente). */
  protagonist: '/assets/sprites/player/player-normal.png',
  /** Sprite da Eco (assistente do capacete). */
  eco: '/assets/sprites/eco/eco-normal.png',
  /** Sprite do Avô Tadeu (mentor do prólogo/epílogo). */
  grandpaTadeu: '/assets/sprites/grandpa-tadeu/grandpa-normal.png',
} as const;
