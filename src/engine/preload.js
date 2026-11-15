import { ALL_SPRITE_PATHS, CHOOSE_SCENE_ASSETS } from "../config/sceneAssets";
const LOADING_ICONS = [
    "/assets/icons/icon-base.svg",
    "/assets/icons/icon-base-filled.png",
];
function loadImage(src) {
    return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => resolve();
        image.onerror = () => resolve();
        image.src = src;
    });
}
async function waitForFonts() {
    if (typeof document !== "undefined" && document.fonts?.ready) {
        try {
            await document.fonts.ready;
        }
        catch {
            // Fonts are non-blocking for navigation.
        }
    }
}
/** Preloads critical assets for the next screen (menu / VN). */
export async function preloadAssets() {
    await Promise.all([
        ...LOADING_ICONS.map(loadImage),
        ...ALL_SPRITE_PATHS.map(loadImage),
        ...CHOOSE_SCENE_ASSETS.map(loadImage),
        waitForFonts(),
    ]);
}
export function delay(ms) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, ms);
    });
}
export const LOADING_MIN_DURATION_MS = 2500;
