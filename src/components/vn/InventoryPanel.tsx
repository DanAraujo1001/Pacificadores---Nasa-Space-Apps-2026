import { ITEMS } from "../../data/items";
import { useMemoriesStore } from "../../store/useMemoriesStore";
import { MemorySlot } from "./MemorySlot";

/**
 * Painel Memories: um espaço por item do catálogo (`src/data/items.ts`). Os
 * itens obtidos vêm do store de Memories, guardado separado do save de
 * progresso, então continuam aqui depois do fim do jogo e em novos saves.
 */
export function InventoryPanel() {
  const obtainedItemIds = useMemoriesStore((state) => state.obtainedItemIds);

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
        {ITEMS.map((item) => (
          <MemorySlot
            key={item.id}
            item={item}
            unlocked={obtainedItemIds.includes(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
