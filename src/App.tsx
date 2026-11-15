import { Act1Screen } from "./components/vn/Act1Screen";
import { LoadingScreen } from "./components/vn/LoadingScreen";
import { MenuScreen } from "./components/vn/MenuScreen";
import { PrologueScreen } from "./components/vn/PrologueScreen";
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
      {currentScreen === "prologue" ? <PrologueScreen /> : null}
      {currentScreen === "playing" ? <Act1Screen /> : null}
    </main>
  );
}
