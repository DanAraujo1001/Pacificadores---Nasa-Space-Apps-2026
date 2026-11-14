import { useGameStore } from "./store/useGameStore";

export function App() {
  const currentWorld = useGameStore((state) => state.currentWorld) || "ship";

  // Mapeia o mundo atual para a classe de tema correspondente
  const themeClass =
    currentWorld === "moon"
      ? "space-moon"
      : currentWorld === "mars"
      ? "space-mars"
      : "space-default";

  return (
    <main className={`${themeClass} min-h-screen bg-background text-foreground flex items-center justify-center`}>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">NASA Visual Novel</h1>
        <p className="text-sm font-mono text-slate-400">Ambiente configurado com sucesso.</p>
      </div>
    </main>
  );
}

export default App;