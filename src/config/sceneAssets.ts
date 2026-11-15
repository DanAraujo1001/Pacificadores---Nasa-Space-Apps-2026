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
  act0Attic: "/assets/backgrounds/act0-attic.png",
  /** ACT 1 — hub na nave: Lua e Marte à vista pela janela. */
  hubShip: "/assets/backgrounds/act1-hub-ship.png",
  /** Escolha de destino: cabine sem os planetas nas janelas. */
  chooseDestination: "/assets/backgrounds/choose-dstn-bg.png",
  /** Escolha de equipamento na superfície lunar. */
  chooseMoon: "/assets/backgrounds/bg-moon-choose.png",
  /** Escolha de equipamento na superfície de Marte. */
  chooseMars: "/assets/backgrounds/bg-mars-choose.png",
  /** STAGE 1 — Mar da Tranquilidade (Eagle / Apollo 11). */
  stageEagle: "/assets/backgrounds/stage-eagle-tranquility.png",
  /** STAGE 2 — planície lunar com as três buggies (LRVs). */
  stageLrv: "/assets/backgrounds/stage-lrv-plain.png",
  /** STAGE 3 — Cratera Gusev, Marte (Spirit). */
  stageSpirit: "/assets/backgrounds/stage-spirit-gusev.png",
  /** STAGE 4 — planície ártica marciana (Phoenix). */
  stagePhoenix: "/assets/backgrounds/stage-phoenix-arctic.png",
  /** FINAL ACT — Lua e Marte juntas, artefatos flutuando ao redor; depois sótão. */
  finalAct: "/assets/backgrounds/final-act-resolution.png",
  /** TELA FINAL — fundo do encerramento ("Abandoned, Yet Never Forgotten."). */
  finalScreen: "/assets/backgrounds/final-screen.png",
} as const;

/** Expressões disponíveis nos arquivos de sprite. */
export type SpriteExpression =
  | "normal"
  | "proud"
  | "sad"
  | "glitch"
  | "withoutHelmet";

type SpritePack = Partial<Record<SpriteExpression, string>> & {
  normal: string;
};

/**
 * Sprites por personagem. `normal` é obrigatório; as demais expressões caem
 * para `normal` quando o arquivo não existir no pack.
 */
export const CHARACTER_SPRITES = {
  protagonist: {
    normal: "/assets/sprites/player/player-normal.png",
    proud: "/assets/sprites/player/player-proud.png",
    sad: "/assets/sprites/player/player-sad.png",
    glitch: "/assets/sprites/player/player-glitch.png",
    withoutHelmet: "/assets/sprites/player/player-without-helmet.png",
  },
  eco: {
    normal: "/assets/sprites/eco/eco-normal.png",
  },
  grandpaTadeu: {
    normal: "/assets/sprites/grandpa-tadeu/grandpa-normal.png",
  },
  eagle: {
    normal: "/assets/sprites/eagle/eagle-normal.png",
    proud: "/assets/sprites/eagle/eagle-proud.png",
    sad: "/assets/sprites/eagle/eagle-sad.png",
  },
  lrv: {
    normal: "/assets/sprites/lrv/lrv-normal.png",
    proud: "/assets/sprites/lrv/lrv-proud.png",
    sad: "/assets/sprites/lrv/lrv-sad.png",
  },
  spirit: {
    normal: "/assets/sprites/spirit/spirit-normal.png",
    proud: "/assets/sprites/spirit/spirit-proud.png",
    sad: "/assets/sprites/spirit/spirit-sad.png",
  },
  phoenix: {
    normal: "/assets/sprites/phoenix/phoenix-normal.png",
    proud: "/assets/sprites/phoenix/phoenix-proud.png",
    sad: "/assets/sprites/phoenix/phoenix-sad.png",
  },
} as const satisfies Record<string, SpritePack>;

export type CharacterSpriteKey = keyof typeof CHARACTER_SPRITES;

/** Resolve o caminho do sprite para uma expressão (fallback → normal). */
export function resolveCharacterSprite(
  key: CharacterSpriteKey,
  expression: SpriteExpression = "normal",
): string {
  const pack = CHARACTER_SPRITES[key] as SpritePack;
  return pack[expression] ?? pack.normal;
}

/** Lista plana de todos os arquivos de sprite (preload). */
export const ALL_SPRITE_PATHS: string[] = Object.values(CHARACTER_SPRITES).flatMap(
  (pack) => Object.values(pack),
);

/** Atalhos legados: sempre a expressão `normal`. */
export const SPRITE_ASSETS = {
  protagonist: CHARACTER_SPRITES.protagonist.normal,
  eco: CHARACTER_SPRITES.eco.normal,
  grandpaTadeu: CHARACTER_SPRITES.grandpaTadeu.normal,
  eagle: CHARACTER_SPRITES.eagle.normal,
  lrv: CHARACTER_SPRITES.lrv.normal,
  spirit: CHARACTER_SPRITES.spirit.normal,
  phoenix: CHARACTER_SPRITES.phoenix.normal,
} as const;

/** Planetas clicáveis nas janelas da cabine. */
export const DESTINATION_ICON_ASSETS = {
  moon: "/assets/icons/moon-choice.svg",
  mars: "/assets/icons/mars-choice.svg",
} as const;

/** Ícones clicáveis na cena de escolha de equipamento. */
export const EQUIPMENT_ICON_ASSETS = {
  eagle: "/assets/icons/eagle-icon.svg",
  lrv: "/assets/icons/lrv-icon.svg",
  spirit: "/assets/icons/spirit-icon.svg",
  phoenix: "/assets/icons/phoenix-icon.svg",
} as const;

/** Fundos e ícones da cena de escolha (preload). */
export const CHOOSE_SCENE_ASSETS: string[] = [
  BACKGROUND_ASSETS.chooseDestination,
  BACKGROUND_ASSETS.chooseMoon,
  BACKGROUND_ASSETS.chooseMars,
  ...Object.values(DESTINATION_ICON_ASSETS),
  ...Object.values(EQUIPMENT_ICON_ASSETS),
];
