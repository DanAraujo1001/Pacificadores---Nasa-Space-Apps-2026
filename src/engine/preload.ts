const PLAYER_SPRITES = [
  "/assets/sprites/player/player-normal.png",
  "/assets/sprites/player/player-proud.png",
  "/assets/sprites/player/player-sad.png",
  "/assets/sprites/player/player-glitch.png",
] as const;

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
    ...PLAYER_SPRITES.map(loadImage),
    waitForFonts(),
  ]);
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export const LOADING_MIN_DURATION_MS = 2500;
