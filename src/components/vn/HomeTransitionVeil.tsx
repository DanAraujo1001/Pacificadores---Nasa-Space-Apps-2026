import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "../../store/useGameStore";

type VeilPhase = "cover" | "reveal";

const FADE_DURATION_S = 0.45;

/**
 * Escurece a tela, troca o screen no preto total e revela a próxima
 * tela enquanto o véu some (Home, Name Entry, etc.).
 */
export function HomeTransitionVeil() {
  const pendingFadeTo = useGameStore((state) => state.pendingFadeTo);
  const commitFade = useGameStore((state) => state.commitFade);
  const [phase, setPhase] = useState<VeilPhase | null>(null);

  useEffect(() => {
    if (pendingFadeTo && phase === null) {
      setPhase("cover");
    }
  }, [pendingFadeTo, phase]);

  const visible = phase !== null;
  const targetOpacity = phase === "cover" ? 1 : 0;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="screen-fade-veil"
          className="pointer-events-auto fixed inset-0 z-[100] bg-[#0E0C0F]"
          initial={{ opacity: 0 }}
          animate={{ opacity: targetOpacity }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION_S, ease: "easeInOut" }}
          onAnimationComplete={() => {
            if (phase === "cover") {
              commitFade();
              setPhase("reveal");
              return;
            }
            if (phase === "reveal") {
              setPhase(null);
            }
          }}
          aria-hidden="true"
        />
      ) : null}
    </AnimatePresence>
  );
}
