import { GameDialogueScreen } from "./components/vn/GameDialogueScreen";
import { GameScreen } from "./components/vn/GameScreen";
import { HomeButton } from "./components/vn/HomeButton";
import { HomeTransitionVeil } from "./components/vn/HomeTransitionVeil";
import { LoadingScreen } from "./components/vn/LoadingScreen";
import { MenuScreen } from "./components/vn/MenuScreen";
import { NameEntryScreen } from "./components/vn/NameEntryScreen";
import { StoryLoadingScreen } from "./components/vn/StoryLoadingScreen";
import { useGameStore } from "./store/useGameStore";

const THEME_BY_WORLD = {
  moon: "space-moon",
  mars: "space-mars",
  ship: "space-default",
} as const;

const SHARED_HOME_SCREENS = new Set(["name-entry", "story-loading"]);

export function App() {
  const currentWorld = useGameStore((state) => state.currentWorld);
  const currentScreen = useGameStore((state) => state.currentScreen);
  const themeClass = THEME_BY_WORLD[currentWorld];
  const showSharedHome = SHARED_HOME_SCREENS.has(currentScreen);

  return (
    <main className={`${themeClass} min-h-screen bg-background text-foreground`}>
      {currentScreen === "loading" ? <LoadingScreen /> : null}
      {currentScreen === "menu" ? <MenuScreen /> : null}
      {currentScreen === "name-entry" ? <NameEntryScreen /> : null}
      {currentScreen === "story-loading" ? <StoryLoadingScreen /> : null}
      {currentScreen === "playing" ? <GameScreen /> : null}
      {currentScreen === "dialogue" ? <GameDialogueScreen /> : null}
      {showSharedHome ? <HomeButton /> : null}
      <HomeTransitionVeil />
    </main>
  );
}
