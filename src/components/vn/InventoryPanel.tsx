import { MEMORIES } from "../../data/memories";
import { MemorySlot } from "./MemorySlot";

interface InventoryPanelProps {
  unlockedMemoryIds: string[];
}

export function InventoryPanel({ unlockedMemoryIds }: InventoryPanelProps) {
  return (
    <div
      className="w-full rounded-sm border border-primary bg-content1/95 p-3 shadow-lg backdrop-blur-md"
      role="dialog"
      aria-label="Memories"
    >
      <h2
        className="mb-1 font-display text-sm font-bold uppercase tracking-wide text-primary"
        style={{ fontFamily: '"Space Grotesk", sans-serif' }}
      >
        Memories
      </h2>
      <p className="mb-3 font-mono text-xs text-foreground/60">
        Collected when missions are cleared successfully.
      </p>
      <div className="grid max-h-[50vh] grid-cols-2 gap-2 overflow-y-auto">
        {MEMORIES.map((memory) => (
          <MemorySlot
            key={memory.id}
            memory={memory}
            unlocked={unlockedMemoryIds.includes(memory.id)}
          />
        ))}
      </div>
    </div>
  );
}
