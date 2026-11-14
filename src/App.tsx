import { useGameStore } from "./store/useGameStore";

const THEME_BY_WORLD = {
  moon: "space-moon",
  mars: "space-mars",
  ship: "space-default",
} as const;

export function App() {
  const currentWorld = useGameStore((state) => state.currentWorld);
  const themeClass = THEME_BY_WORLD[currentWorld];

  return (
    <main
      className={`${themeClass} min-h-screen bg-background text-foreground`}
    />
  );
}