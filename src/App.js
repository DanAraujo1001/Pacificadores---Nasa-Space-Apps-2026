import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Act1Screen } from "./components/vn/Act1Screen";
import { GameDialogueScreen } from "./components/vn/GameDialogueScreen";
import { HomeButton } from "./components/vn/HomeButton";
import { HomeTransitionVeil } from "./components/vn/HomeTransitionVeil";
import { LoadingScreen } from "./components/vn/LoadingScreen";
import { MenuScreen } from "./components/vn/MenuScreen";
import { NameEntryScreen } from "./components/vn/NameEntryScreen";
import { PrologueScreen } from "./components/vn/PrologueScreen";
import { StoryLoadingScreen } from "./components/vn/StoryLoadingScreen";
import { useGameStore } from "./store/useGameStore";
const THEME_BY_WORLD = {
    moon: "space-moon",
    mars: "space-mars",
    ship: "space-default",
};
export function App() {
    const currentWorld = useGameStore((state) => state.currentWorld);
    const currentScreen = useGameStore((state) => state.currentScreen);
    const themeClass = THEME_BY_WORLD[currentWorld];
    const showHome = currentScreen !== "menu";
    return (_jsxs("main", { className: `${themeClass} relative min-h-screen bg-background text-foreground`, children: [currentScreen === "loading" ? _jsx(LoadingScreen, {}) : null, currentScreen === "menu" ? _jsx(MenuScreen, {}) : null, currentScreen === "name-entry" ? _jsx(NameEntryScreen, {}) : null, currentScreen === "story-loading" ? _jsx(StoryLoadingScreen, {}) : null, currentScreen === "prologue" ? _jsx(PrologueScreen, {}) : null, currentScreen === "playing" ? _jsx(Act1Screen, {}) : null, currentScreen === "dialogue" ? _jsx(GameDialogueScreen, {}) : null, showHome ? _jsx(HomeButton, {}) : null, _jsx(HomeTransitionVeil, {})] }));
}
