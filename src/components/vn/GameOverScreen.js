import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@heroui/react";
/**
 * Tela de Game Over ("Try again?"), disparada quando o jogador erra uma escolha
 * de estágio. O estágio NÃO é marcado como concluído, então pode ser refeito —
 * isto não contraria a regra de "estágio concluído não reentrável", já que
 * um game over significa que o estágio não foi concluído.
 */
export function GameOverScreen({ onRetry, onBackToHub }) {
    return (_jsxs("section", { className: "flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-background px-6 text-center text-foreground", children: [_jsxs("div", { children: [_jsx("p", { className: "mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary/70", children: "Signal lost" }), _jsx("h1", { className: "font-display text-4xl font-bold uppercase tracking-wide text-primary", style: { fontFamily: '"Space Grotesk", sans-serif' }, children: "Event terminated" })] }), _jsxs("div", { className: "flex flex-col items-center gap-3", children: [_jsx(Button, { variant: "primary", size: "lg", onPress: onRetry, className: "min-w-[220px] cursor-pointer rounded-sm border-0 bg-primary/35 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-primary data-[hovered=true]:bg-primary", children: "Try again?" }), _jsx(Button, { variant: "ghost", size: "sm", onPress: onBackToHub, className: "cursor-pointer rounded-sm font-mono text-xs uppercase tracking-widest text-primary/80 hover:text-primary", children: "Back to the ship" })] })] }));
}
