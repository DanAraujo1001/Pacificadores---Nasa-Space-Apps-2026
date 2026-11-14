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
    <div className="flex w-full max-w-2xl flex-col items-center gap-3 px-4 text-center">
      <p
        className="font-display text-lg font-bold tracking-wide text-primary md:text-xl"
        style={{ fontFamily: '"Space Grotesk", sans-serif' }}
      >
        {speakerName}
      </p>
      <p className="min-h-[3.5rem] max-w-xl text-base leading-snug text-foreground md:text-lg">
        {text}
      </p>
      {showContinueHint ? (
        <div className="mt-2 flex items-end gap-1" aria-hidden="true">
          <ThemeIcon
            src="/assets/icons/icon-star-1.svg"
            className="h-4 w-3.5"
          />
          <ThemeIcon src="/assets/icons/icon-star-2.svg" className="h-5 w-6" />
        </div>
      ) : null}
    </div>
  );
}
