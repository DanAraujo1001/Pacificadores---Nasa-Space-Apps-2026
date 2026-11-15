import { useEffect } from "react";
import { motion } from "framer-motion";
import { FINAL_SCREEN } from "../../data/missions/finalScreen";
import { SceneBackground } from "./SceneBackground";

interface FinalScreenProps {
  /** Chamado automaticamente ao fim da exibição: volta para o menu inicial. */
  onContinue?: () => void;
}

/**
 * TELA FINAL — encerramento do jogo ("Abandoned, Yet Never Forgotten.").
 *
 * Exibida após as falas do Final Act. O texto usa a MESMA fonte do nome do jogo
 * ("Echoes of Astra" no MenuScreen): `font-display` (Space Grotesk), `font-bold`,
 * `uppercase`, `text-primary` — sem fonte nova e sem valores de texto soltos
 * (a frase vem de `src/data/missions/finalScreen.ts`).
 *
 * Comportamento: apenas mostra o texto e some sozinha (sem clique), voltando ao
 * menu inicial, onde as memories desbloqueadas aparecem atualizadas. Fundo
 * resiliente via `SceneBackground` (placeholder automático se o asset final
 * ainda não existir).
 */
export function FinalScreen({ onContinue }: FinalScreenProps) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onContinue?.();
    }, FINAL_SCREEN.holdMs);
    return () => window.clearTimeout(timer);
  }, [onContinue]);

  return (
    <section
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0E0C0F] text-foreground"
      aria-live="polite"
    >
      <SceneBackground
        src={FINAL_SCREEN.backgroundAsset}
        placeholderLabel={FINAL_SCREEN.backgroundPlaceholderLabel}
      />

      {/* Véu escuro para legibilidade do texto sobre a arte. */}
      <div
        className="absolute inset-0 bg-[#0E0C0F]/70"
        aria-hidden="true"
      />

      {/* Fade-in e fade-out automáticos (aparece, segura, some). */}
      <motion.h1
        className="pointer-events-none relative z-10 max-w-3xl select-none px-6 text-center font-display text-3xl font-bold uppercase tracking-wide text-primary md:text-5xl lg:text-6xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: [0, 1, 1, 0], y: [16, 0, 0, 0] }}
        transition={{
          duration: FINAL_SCREEN.holdMs / 1000,
          times: [0, 0.25, 0.8, 1],
          ease: "easeInOut",
        }}
      >
        {FINAL_SCREEN.title}
      </motion.h1>
    </section>
  );
}
