import { GameDialogueScreen } from "./components/vn/GameDialogueScreen";
import { GameScreen } from "./components/vn/GameScreen";
import { LoadingScreen } from "./components/vn/LoadingScreen";
import { MenuScreen } from "./components/vn/MenuScreen";
import { useGameStore } from "./store/useGameStore";

const THEME_BY_WORLD = {
  moon: "space-moon",
  mars: "space-mars",
  ship: "space-default",
} as const;

export function App() {
  const currentWorld = useGameStore((state) => state.currentWorld);
  const currentScreen = useGameStore((state) => state.currentScreen);
  const themeClass = THEME_BY_WORLD[currentWorld];

  return (
    <main className={`${themeClass} min-h-screen bg-background text-foreground`}>
      {currentScreen === "loading" ? <LoadingScreen /> : null}
      {currentScreen === "menu" ? <MenuScreen /> : null}
      {currentScreen === "playing" ? <GameScreen /> : null}
      {currentScreen === "dialogue" ? <GameDialogueScreen /> : null}
    </main>
  );
}
