import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  delay,
  LOADING_MIN_DURATION_MS,
  preloadAssets,
} from "../../engine/preload";
import { useGameStore } from "../../store/useGameStore";

const ICON_SIZE_PX = 80;
const FILL_CYCLE_SECONDS = 1.2;
const FILL_REPEAT_DELAY_SECONDS = 0.08;

export function StoryLoadingScreen() {
  const setScreen = useGameStore((state) => state.setScreen);
  const [iconFailed, setIconFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      await Promise.all([delay(LOADING_MIN_DURATION_MS), preloadAssets()]);
      if (!cancelled) {
        setScreen("playing");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [setScreen]);

  return (
    <section
      role="status"
      aria-busy="true"
      aria-label="Preparing story"
      className="relative min-h-screen w-full bg-background text-foreground"
    >
      <motion.p
        className="absolute inset-x-0 top-1/3 px-6 text-center font-display text-lg font-bold uppercase tracking-wide text-primary md:text-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        Preparing your story…
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
            <img
              src="/assets/icons/icon-base.svg"
              alt=""
              className="absolute inset-0 size-full object-contain"
              draggable={false}
              onError={() => setIconFailed(true)}
            />
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
              <img
                src="/assets/icons/icon-base-filled.png"
                alt=""
                className="size-full object-contain"
                draggable={false}
                onError={() => setIconFailed(true)}
              />
            </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
