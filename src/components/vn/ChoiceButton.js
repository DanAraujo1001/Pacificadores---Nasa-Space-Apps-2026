import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "@heroui/react";
import { DIALOGUE_BOX } from "../../config/dialogueBox";
/**
 * Botão de uma opção de escolha. Reaproveita o visual do jogo (HeroUI, cor
 * primária, `rounded-sm`) e os estados de hover/foco/clique do Design System.
 * Renderizado DENTRO da barra de diálogo.
 *
 * Fonte e preenchimento vertical vêm da config central e escalam juntos no
 * auto-fit (padding em `em`), para o bloco inteiro caber na área fixa. O mesmo
 * tamanho vale para todas as opções da escolha. Ver `src/config/dialogueBox.ts`.
 */
export function ChoiceButton({ label, onPress, fontPx }) {
    return (_jsx(Button, { variant: "primary", size: "sm", onPress: onPress, style: fontPx
            ? {
                fontSize: `${fontPx}px`,
                lineHeight: 1.2,
                paddingTop: `${DIALOGUE_BOX.CHOICE_PADDING_Y_EM}em`,
                paddingBottom: `${DIALOGUE_BOX.CHOICE_PADDING_Y_EM}em`,
            }
            : undefined, className: "h-auto min-h-0 w-full min-w-[200px] cursor-pointer whitespace-normal rounded-sm border border-primary/40 bg-primary/35 px-5 text-center font-medium text-white shadow-none outline-none transition-colors hover:bg-primary focus-visible:ring-2 focus-visible:ring-primary data-[focus-visible=true]:ring-2 data-[focus-visible=true]:ring-primary data-[hovered=true]:bg-primary data-[pressed=true]:bg-primary/80", children: label }));
}
