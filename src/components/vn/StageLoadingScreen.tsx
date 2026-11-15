import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  delay,
  preloadStageAssets,
  STAGE_LOADING_MIN_MS,
} from "../../engine/preload";
import { HomeButton } from "./HomeButton";

const ICON_SIZE_PX = 80;
const FILL_CYCLE_SECONDS = 1.2;
const FILL_REPEAT_DELAY_SECONDS = 0.08;
const LOADING_ICON_SOURCES = [
  "/assets/icons/icon-base.svg",
  "/assets/icons/icon-base-filled.png",
] as const;

interface StageLoadingScreenProps {
  /** Nome do equipamento, vindo da config (Eagle, LRV, Spirit, Phoenix). */
  equipmentLabel: string;
  /** Fundo do estágio, pré-carregado durante a espera. */
  backgroundAsset: string | null;
  onComplete: () => void;
}

/**
 * Intervalo entre a escolha do equipamento e o diálogo.
 * Reaproveita o ícone de preenchimento das outras telas de carga.
 */
export function StageLoadingScreen({
  equipmentLabel,
  backgroundAsset,
  onComplete,
}: StageLoadingScreenProps) {
  const [iconFailed, setIconFailed] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    let cancelled = false;
    for (const src of LOADING_ICON_SOURCES) {
      const image = new Image();
      image.onerror = () => {
        if (!cancelled) setIconFailed(true);
      };
      image.src = src;
    }
    return () => {
      cancelled = true;
    };
  }, []);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      await Promise.all([
        delay(STAGE_LOADING_MIN_MS),
        preloadStageAssets(backgroundAsset),
      ]);
      if (!cancelled) {
        onCompleteRef.current();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [backgroundAsset]);

  return (
    <section
      role="status"
      aria-busy="true"
      aria-label={`Contacting ${equipmentLabel}`}
      className="relative min-h-screen w-full bg-background text-foreground"
    >
      <HomeButton />
      <motion.p
        className="absolute inset-x-0 top-1/3 px-6 text-center font-display text-lg font-bold uppercase tracking-wide text-primary md:text-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        Contacting {equipmentLabel}…
      </motion.p>

      <motion.div
        className="absolute bottom-6 right-6"
        style={{ width: ICON_SIZE_PX, height: ICON_SIZE_PX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.22, delay: 0.05 }}
      >
        {iconFailed ? (
          <div className="size-full rounded-sm bg-primary" aria-hidden="true" />
        ) : (
          <div className="relative size-full" aria-hidden="true">
            <div className="loading-mark loading-mark-outline absolute inset-0 bg-primary" />
            <motion.div
              className="absolute inset-0"
              animate={{
                clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
              }}
              transition={{
                duration: FILL_CYCLE_SECONDS,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: FILL_REPEAT_DELAY_SECONDS,
              }}
            >
              <div className="loading-mark loading-mark-fill absolute inset-0 bg-foreground" />
              <div className="loading-mark loading-mark-outline absolute inset-0 bg-primary" />
            </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
