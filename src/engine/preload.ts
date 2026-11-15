import { ALL_SPRITE_PATHS, CHOOSE_SCENE_ASSETS } from "../config/sceneAssets";

const LOADING_ICONS = [
  "/assets/icons/icon-base.svg",
  "/assets/icons/icon-base-filled.png",
] as const;

function loadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });
}

async function waitForFonts(): Promise<void> {
  if (typeof document !== "undefined" && document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // Fonts are non-blocking for navigation.
    }
  }
}

/** Preloads critical assets for the next screen (menu / VN). */
export async function preloadAssets(): Promise<void> {
  await Promise.all([
    ...LOADING_ICONS.map(loadImage),
    ...ALL_SPRITE_PATHS.map(loadImage),
    ...CHOOSE_SCENE_ASSETS.map(loadImage),
    waitForFonts(),
  ]);
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export const LOADING_MIN_DURATION_MS = 2500;

/** Pausa mínima ao entrar num equipamento, para a cena não abrir de uma vez. */
export const STAGE_LOADING_MIN_MS = 1800;

/** Fundo do estágio e sprites, para o diálogo abrir com a arte já em cache. */
export async function preloadStageAssets(
  backgroundAsset: string | null,
): Promise<void> {
  const sources = [
    ...ALL_SPRITE_PATHS,
    ...(backgroundAsset ? [backgroundAsset] : []),
  ];
  await Promise.all(sources.map(loadImage));
}
