import type { ReactNode } from "react";
import { DIALOGUE_BOX } from "../../config/dialogueBox";

interface DialoguePanelProps {
  children: ReactNode;
}

/**
 * Painel do diálogo — posição FIXA e fora do fluxo (ancorado na base da tela),
 * com altura FIXA (config central). Por ser `position: fixed`, nunca empurra nem
 * causa reflow no background, sprites, ícones ou botões da cena, em nenhuma fala
 * nem durante a digitação.
 *
 * Mantém o visual atual (faixa escura na base, centralizada). Dimensões e
 * posicionamento vêm de `src/config/dialogueBox.ts` — sem valores soltos aqui.
 */
export function DialoguePanel({ children }: DialoguePanelProps) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex items-start justify-center bg-[#0E0C0F] pt-5"
      style={{ height: DIALOGUE_BOX.PANEL_HEIGHT }}
    >
      <div
        className="flex w-full flex-col items-center"
        style={{ maxWidth: DIALOGUE_BOX.WIDTH }}
      >
        {children}
      </div>
    </div>
  );
}
