import { Button } from "@heroui/react";

interface GameOverScreenProps {
  onRetry: () => void;
  onBackToHub: () => void;
}

/**
 * Tela de Game Over ("Try again?"), disparada quando o jogador erra uma escolha
 * de estágio. O estágio NÃO é marcado como concluído, então pode ser refeito —
 * isto não contraria a regra de "estágio concluído não reentrável", já que
 * um game over significa que o estágio não foi concluído.
 */
export function GameOverScreen({ onRetry, onBackToHub }: GameOverScreenProps) {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-background px-6 text-center text-foreground">
      <div>
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary/70">
          Signal lost
        </p>
        <h1
          className="font-display text-4xl font-bold uppercase tracking-wide text-primary"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
        >
          Event terminated
        </h1>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Button
          variant="primary"
          size="lg"
          onPress={onRetry}
          className="min-w-[220px] cursor-pointer rounded-sm border-0 bg-primary/35 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-primary data-[hovered=true]:bg-primary"
        >
          Try again?
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onPress={onBackToHub}
          className="cursor-pointer rounded-sm font-mono text-xs uppercase tracking-widest text-primary/80 hover:text-primary"
        >
          Back to the ship
        </Button>
      </div>
    </section>
  );
}
