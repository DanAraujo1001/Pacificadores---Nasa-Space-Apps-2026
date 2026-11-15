import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@heroui/react";
import { hasProgress } from "../../engine/saveSystem";
import { useGameStore } from "../../store/useGameStore";
import { HomeLinksPanel } from "./HomeLinksPanel";
import { InventoryPanel } from "./InventoryPanel";
import { ThemeIcon } from "./ThemeIcon";

const HOME_IMAGE = "/assets/images/image-home-teste.png";

/** Botão secundário da Home: mesmo estilo do botão "Menu" (contorno primário). */
const SECONDARY_BUTTON_CLASS =
  "h-12 min-w-[160px] cursor-pointer rounded-sm border border-primary bg-transparent px-6 text-primary transition-colors hover:bg-primary hover:text-primary-foreground data-[hovered=true]:bg-primary data-[hovered=true]:text-primary-foreground";

const enterContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const enterItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function MenuScreen() {
  const fadeToScreen = useGameStore((state) => state.fadeToScreen);
  const setWorld = useGameStore((state) => state.setWorld);
  const startNewGame = useGameStore((state) => state.startNewGame);
  const continueGame = useGameStore((state) => state.continueGame);
  // Há partida salva para retomar? (save inválido já é descartado pelo módulo.)
  const [hasSave, setHasSave] = useState(() => hasProgress());
  const [confirmingNewGame, setConfirmingNewGame] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const beginNewGame = () => {
    setConfirmingNewGame(false);
    startNewGame();
    fadeToScreen("name-entry");
  };

  const handleContinue = () => {
    if (!continueGame()) setHasSave(false);
  };
  const [imageFailed, setImageFailed] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWorld("ship");
  }, [setWorld]);

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [menuOpen]);

  return (
    <section className="relative flex h-screen w-full flex-col items-start justify-center overflow-hidden bg-background px-6 py-16 text-foreground md:px-10 lg:px-16">
      <motion.div
        ref={headerRef}
        className="absolute right-4 top-4 z-30 md:right-6 md:top-6"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative">
          <Button
            variant="outline"
            size="lg"
            onPress={() => setMenuOpen((open) => !open)}
            className="group h-12 cursor-pointer rounded-sm border border-primary bg-transparent px-5 text-primary transition-colors hover:bg-primary hover:text-primary-foreground data-[hovered=true]:bg-primary data-[hovered=true]:text-primary-foreground"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
          >
            <span className="inline-flex items-center justify-center gap-4">
              <span className="text-sm font-medium">Menu</span>
              <ThemeIcon
                src="/assets/icons/icon-bag.svg"
                className="h-8 w-8 transition-colors group-hover:bg-primary-foreground group-data-[hovered=true]:bg-primary-foreground"
              />
            </span>
          </Button>

          <AnimatePresence>
            {menuOpen ? (
              <motion.div
                key="home-menu-dropdown"
                className="absolute right-0 top-full z-40 mt-2 flex w-[min(92vw,22rem)] origin-top-right flex-col gap-2"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <HomeLinksPanel
                  onNavigate={(screen) => {
                    setMenuOpen(false);
                    fadeToScreen(screen);
                  }}
                />
                <InventoryPanel />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        className="relative z-20 flex w-full max-w-md flex-col items-center gap-8 text-center md:ml-16 lg:ml-24 xl:ml-32"
        variants={enterContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={enterItem}>
          <p className="mb-2 font-mono text-sm uppercase tracking-[0.2em] text-primary/70 md:text-base">
            NASA Space Apps 2026
          </p>
          <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-primary md:text-5xl lg:text-6xl">
            Echoes of Astra
          </h1>
          <p className="mt-3 max-w-md text-sm text-foreground/70 md:text-base">
            Forgotten hardware. Stories that still echo.
          </p>
        </motion.div>

        <motion.div variants={enterItem} className="flex flex-col items-center gap-4">
          <AnimatePresence mode="wait" initial={false}>
            {confirmingNewGame ? (
              <motion.div
                key="confirm-new-game"
                className="flex w-[min(92vw,22rem)] flex-col items-center gap-4 rounded-sm border border-primary bg-content1/95 p-5 text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                role="alertdialog"
                aria-label="Start a new game?"
              >
                <p className="text-sm text-foreground/80">
                  Start a new game? Your saved progress will be overwritten.
                  Your Memories are kept.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    onPress={() => setConfirmingNewGame(false)}
                    className={SECONDARY_BUTTON_CLASS}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    onPress={beginNewGame}
                    className="h-12 cursor-pointer rounded-sm border-0 bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 data-[hovered=true]:bg-primary/90"
                  >
                    New Game
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="home-actions"
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="play-shine-border text-primary">
                  <Button
                    variant="primary"
                    size="lg"
                    onPress={hasSave ? handleContinue : beginNewGame}
                    className="min-h-14 min-w-[260px] cursor-pointer rounded-sm border-0 bg-[#0E0C0F] px-12 py-5 text-lg font-semibold text-white transition-colors hover:bg-primary/90 data-[hovered=true]:bg-primary/90"
                  >
                    {hasSave ? "Continue" : "Play"}
                  </Button>
                </div>
                {hasSave ? (
                  <Button
                    variant="outline"
                    size="lg"
                    onPress={() => setConfirmingNewGame(true)}
                    className={SECONDARY_BUTTON_CLASS}
                  >
                    New Game
                  </Button>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Arte fixa no bottom, lado direito */}
      <motion.div
        className="pointer-events-none absolute bottom-0 right-[-2%] z-10 flex w-[min(96vw,56rem)] items-end justify-end md:right-[2%] md:w-[min(62vw,60rem)] lg:right-[4%] lg:w-[min(58vw,66rem)]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative flex w-full items-end justify-center">
          <div
            className="pointer-events-none absolute bottom-[8%] left-1/2 h-[55%] w-[70%] -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-[12%] left-1/2 h-[45%] w-[60%] -translate-x-1/2 rounded-full bg-yellow-300/8 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-[18%] left-1/2 h-[35%] w-[50%] -translate-x-1/2 rounded-full bg-yellow-200/5 blur-2xl"
            aria-hidden="true"
          />

          {imageFailed ? (
            <div
              className="relative z-10 mb-0 flex aspect-square w-full max-w-[42rem] items-center justify-center rounded-sm border border-primary/30 bg-content1/40 backdrop-blur-md md:max-w-[52rem]"
              aria-hidden="true"
            >
              <span className="font-display text-xs uppercase tracking-widest text-primary">
                Astra
              </span>
            </div>
          ) : (
            <>
              <img
                src={HOME_IMAGE}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 z-0 w-full object-contain object-bottom opacity-10 blur-2xl brightness-125 sepia-[0.35] saturate-150 hue-rotate-[-10deg]"
                draggable={false}
              />
              <motion.img
                src={HOME_IMAGE}
                alt="Echoes of Astra"
                className="relative z-10 w-full origin-bottom object-contain object-bottom drop-shadow-[0_0_28px_rgba(255,255,255,0.08)]"
                draggable={false}
                animate={{ scale: [1, 1.045, 1] }}
                transition={{
                  duration: 4.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                onError={() => setImageFailed(true)}
              />
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
