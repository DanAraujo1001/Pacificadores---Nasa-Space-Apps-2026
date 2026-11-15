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
  /** ACT 1 — hub na nave: Lua e Marte à vista pela janela. */
  hubShip: '/assets/backgrounds/act1-hub-ship.png',
  /** STAGE 1 — Mar da Tranquilidade (Eagle / Apollo 11). */
  stageEagle: '/assets/backgrounds/stage-eagle-tranquility.png',
  /** STAGE 2 — planície lunar com as três buggies (LRVs). */
  stageLrv: '/assets/backgrounds/stage-lrv-plain.png',
  /** STAGE 3 — Cratera Gusev, Marte (Spirit). */
  stageSpirit: '/assets/backgrounds/stage-spirit-gusev.png',
  /** STAGE 4 — planície ártica marciana (Phoenix). */
  stagePhoenix: '/assets/backgrounds/stage-phoenix-arctic.png',
  /** FINAL ACT — Lua e Marte juntas, artefatos flutuando ao redor; depois sótão. */
  finalAct: '/assets/backgrounds/final-act-resolution.png',
  /** TELA FINAL — fundo do encerramento ("Abandoned, Yet Never Forgotten."). */
  finalScreen: '/assets/backgrounds/final-screen.png',
} as const;

export const SPRITE_ASSETS = {
  /** Sprite do protagonista (reutiliza o player existente). */
  protagonist: '/assets/sprites/player/player-normal.png',
  /** Sprite da Eco (assistente do capacete). */
  eco: '/assets/sprites/eco/eco-normal.png',
  /** Sprite do Avô Tadeu (mentor do prólogo/epílogo). */
  grandpaTadeu: '/assets/sprites/grandpa-tadeu/grandpa-normal.png',
  /** Sprite do Eagle (módulo lunar Apollo 11). */
  eagle: '/assets/sprites/eagle/eagle-normal.png',
  /** Sprite das LRVs (buggies lunares). */
  lrv: '/assets/sprites/lrv/lrv-normal.png',
  /** Sprite do Spirit (rover marciano). */
  spirit: '/assets/sprites/spirit/spirit-normal.png',
  /** Sprite do Phoenix (lander ártico marciano). */
  phoenix: '/assets/sprites/phoenix/phoenix-normal.png',
} as const;

/** Ícones clicáveis dos equipamentos no hub (ACT 1). */
export const EQUIPMENT_ICON_ASSETS = {
  eagle: '/assets/icons/equipment/eagle.svg',
  lrv: '/assets/icons/equipment/lrv.svg',
  spirit: '/assets/icons/equipment/spirit.svg',
  phoenix: '/assets/icons/equipment/phoenix.svg',
} as const;
