import type { GameItem } from "../../data/items";
import { ItemIcon } from "./ItemIcon";
import { ThemeIcon } from "./ThemeIcon";

interface MemorySlotProps {
  item: GameItem;
  unlocked: boolean;
}

/**
 * Moldura de um item no Memories. Obtido: ícone do item (ou placeholder com o
 * nome), nome e descrição. Ainda não obtido: espaço bloqueado ("???"), como já
 * era o padrão do Memories.
 */
export function MemorySlot({ item, unlocked }: MemorySlotProps) {
  return (
    <article
      className={`flex flex-col gap-2 rounded-sm border p-3 ${
        unlocked
          ? "border-primary/60 bg-content1/80"
          : "border-primary/20 bg-content1/40 opacity-70"
      }`}
    >
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-sm bg-[#0E0C0F]/60">
        {unlocked ? (
          <ItemIcon src={item.iconAsset} name={item.name} className="size-full" />
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
            {item.name}
          </h3>
          <p className="mt-1 text-[11px] leading-snug text-foreground/80">
            {item.description}
          </p>
        </div>
      ) : (
        <p className="font-mono text-center text-xs text-primary/50">???</p>
      )}
    </article>
  );
}
