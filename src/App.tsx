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
} as const;

export function App() {
  const currentWorld = useGameStore((state) => state.currentWorld);
  const currentScreen = useGameStore((state) => state.currentScreen);
  const hubPhase = useGameStore((state) => state.hubPhase);
  const themeClass = THEME_BY_WORLD[currentWorld];
  const homeInScene =
    currentScreen === "playing" && hubPhase === "select-equipment";
  const showHome =
    currentScreen !== "menu" &&
    currentScreen !== "loading" &&
    !homeInScene;

  return (
    <main className={`${themeClass} relative min-h-screen bg-background text-foreground`}>
      {currentScreen === "loading" ? <LoadingScreen /> : null}
      {currentScreen === "menu" ? <MenuScreen /> : null}
      {currentScreen === "name-entry" ? <NameEntryScreen /> : null}
      {currentScreen === "story-loading" ? <StoryLoadingScreen /> : null}
      {currentScreen === "prologue" ? <PrologueScreen /> : null}
      {currentScreen === "playing" ? <Act1Screen /> : null}
      {currentScreen === "dialogue" ? <GameDialogueScreen /> : null}
      {showHome ? <HomeButton /> : null}
      <HomeTransitionVeil />
    </main>
  );
}
