import { create } from "zustand";
import { loadMemories, saveMemories } from "../engine/saveSystem";

interface MemoriesState {
  /** Itens já obtidos em qualquer partida (ids do catálogo `src/data/items.ts`). */
  obtainedItemIds: string[];
  /** Registra um item nos Memories. Idempotente: nunca duplica. */
  addItem: (itemId: string) => void;
}

/**
 * Memories — itens obtidos, guardados SEPARADOS do save de progresso (chave
 * própria no `saveSystem`). Continuam disponíveis depois do fim do jogo e em
 * novos saves. Nenhuma ação de progresso (novo jogo, fim de jogo) mexe aqui.
 */
export const useMemoriesStore = create<MemoriesState>()((set, get) => ({
  obtainedItemIds: loadMemories(),
  addItem: (itemId) => {
    const { obtainedItemIds } = get();
    if (obtainedItemIds.includes(itemId)) return;
    const next = [...obtainedItemIds, itemId];
    set({ obtainedItemIds: next });
    saveMemories(next);
  },
}));
