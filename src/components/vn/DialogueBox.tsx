import { AnimatePresence, motion } from "framer-motion";
import { ThemeIcon } from "./ThemeIcon";

interface DialogueBoxProps {
  speakerName: string;
  text: string;
  showContinueHint?: boolean;
}

export function DialogueBox({
  speakerName,
  text,
  showContinueHint = false,
}: DialogueBoxProps) {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-1.5 px-4 text-center">
      <p
        className="font-display text-lg font-bold tracking-wide text-primary md:text-xl"
        style={{ fontFamily: '"Space Grotesk", sans-serif' }}
      >
        {speakerName}
      </p>
      <p className="min-h-[3.5rem] max-w-xl text-base leading-snug text-foreground md:text-lg">
        {text}
      </p>
      <AnimatePresence>
        {showContinueHint ? (
          <motion.div
            key="continue-hint"
            className="mt-6 flex items-end justify-center gap-1 md:mt-8"
            aria-hidden="true"
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <ThemeIcon
              src="/assets/icons/icon-star-1.svg"
              className="h-4 w-3.5"
            />
            <ThemeIcon src="/assets/icons/icon-star-2.svg" className="h-5 w-6" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}