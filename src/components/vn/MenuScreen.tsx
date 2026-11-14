import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@heroui/react";
import { useGameStore } from "../../store/useGameStore";
import { HomeLinksPanel } from "./HomeLinksPanel";
import { InventoryPanel } from "./InventoryPanel";
import { ThemeIcon } from "./ThemeIcon";

export function MenuScreen() {
  const setScreen = useGameStore((state) => state.setScreen);
  const setWorld = useGameStore((state) => state.setWorld);
  const unlockedMemoryIds = useGameStore((state) => state.unlockedMemoryIds);
  const [menuOpen, setMenuOpen] = useState(false);
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
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background px-6 text-foreground">
      <div
        ref={headerRef}
        className="absolute right-4 top-4 z-30 md:right-6 md:top-6"
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
                <HomeLinksPanel />
                <InventoryPanel unlockedMemoryIds={unlockedMemoryIds} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex w-full max-w-md flex-col items-center gap-8 text-center">
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
            NASA Space Apps 2026
          </p>
          <h1
            className="font-display text-4xl font-bold uppercase tracking-wide text-primary md:text-5xl"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Echoes of Astra
          </h1>
          <p className="mt-3 text-sm text-foreground/70">
            Forgotten hardware. Stories that still echo.
          </p>
        </div>

        <div className="play-shine-border text-primary">
          <Button
            variant="primary"
            size="lg"
            onPress={() => setScreen("playing")}
            className="min-h-14 min-w-[260px] cursor-pointer rounded-sm border-0 bg-[#0E0C0F] px-12 py-5 text-lg font-semibold text-white transition-colors hover:bg-primary/90 data-[hovered=true]:bg-primary/90"
          >
            Play
          </Button>
        </div>
      </div>
    </section>
  );
}
