import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input } from "@heroui/react";
import { useGameStore } from "../../store/useGameStore";

const MIN_LEN = 2;
const MAX_LEN = 16;
const CONTENT_FADE_S = 0.22;

function isValidName(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length >= MIN_LEN && trimmed.length <= MAX_LEN;
}

const enterContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const enterItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: CONTENT_FADE_S, ease: "easeIn" as const },
  },
};

export function NameEntryScreen() {
  const savedName = useGameStore((state) => state.playerName);
  const setPlayerName = useGameStore((state) => state.setPlayerName);
  const setScreen = useGameStore((state) => state.setScreen);
  const [name, setName] = useState(savedName);
  const [exiting, setExiting] = useState(false);
  const valid = isValidName(name);

  const handleContinue = () => {
    if (!valid || exiting) return;
    setPlayerName(name);
    setExiting(true);
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background px-6 text-foreground">
      <motion.div
        className="flex w-full max-w-md flex-col items-center gap-6 text-center"
        variants={enterContainer}
        initial="hidden"
        animate={exiting ? "exit" : "show"}
        onAnimationComplete={(definition) => {
          if (definition === "exit") {
            setScreen("story-loading");
          }
        }}
      >
        <motion.div variants={enterItem}>
          <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-primary md:text-3xl">
            Callsign
          </h1>
          <p className="mt-2 text-sm text-foreground/70">
            Enter the name of your explorer. This will appear in the story.
          </p>
        </motion.div>

        <motion.div
          variants={enterItem}
          className="flex w-full flex-col items-center gap-1.5"
        >
          <Input
            value={name}
            onChange={(event) => setName(event.target.value.slice(0, MAX_LEN))}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleContinue();
            }}
            placeholder="Your name"
            maxLength={MAX_LEN}
            aria-label="Player name"
            disabled={exiting}
            className="w-full rounded-sm border border-primary bg-content1/80 px-3 py-2 text-center text-foreground outline-none focus:border-primary"
          />

          <p className="font-mono text-sm text-foreground/50">
            {MIN_LEN}–{MAX_LEN} characters
          </p>
        </motion.div>

        <motion.div
          variants={enterItem}
          className={`play-shine-border text-primary ${valid ? "" : "opacity-40"}`}
        >
          <Button
            variant="primary"
            size="lg"
            isDisabled={!valid || exiting}
            onPress={handleContinue}
            className="min-h-11 min-w-[200px] cursor-pointer rounded-sm border-0 bg-[#0E0C0F] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-primary/90 data-[hovered=true]:bg-primary/90 disabled:cursor-not-allowed"
          >
            Continue
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
