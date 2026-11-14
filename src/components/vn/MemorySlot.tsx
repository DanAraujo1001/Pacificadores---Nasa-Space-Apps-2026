import type { MemoryItem } from "../../types/memory";
import { ThemeIcon } from "./ThemeIcon";

interface MemorySlotProps {
  memory: MemoryItem;
  unlocked: boolean;
}

export function MemorySlot({ memory, unlocked }: MemorySlotProps) {
  return (
    <article
      className={`flex flex-col gap-2 rounded-sm border p-3 ${
        unlocked
          ? "border-primary/60 bg-content1/80"
          : "border-primary/20 bg-content1/40 opacity-70"
      }`}
    >
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-sm bg-[#0E0C0F]/60">
        {unlocked && memory.thumbnail ? (
          <img
            src={memory.thumbnail}
            alt={memory.title}
            className="size-full object-cover"
            draggable={false}
          />
        ) : unlocked ? (
          <ThemeIcon
            src="/assets/icons/icon-star-1.svg"
            className="h-10 w-8"
            label={memory.title}
          />
        ) : (
          <ThemeIcon
            src="/assets/icons/icon-bag.svg"
            className="h-10 w-10 opacity-40"
          />
        )}
      </div>
      {unlocked ? (
        <div className="text-left">
          <h3
            className="font-display text-xs font-bold uppercase tracking-wide text-primary"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            {memory.title}
          </h3>
          <p className="mt-1 text-[11px] leading-snug text-foreground/80">
            {memory.description}
          </p>
        </div>
      ) : (
        <p className="font-mono text-center text-xs text-primary/50">???</p>
      )}
    </article>
  );
}
