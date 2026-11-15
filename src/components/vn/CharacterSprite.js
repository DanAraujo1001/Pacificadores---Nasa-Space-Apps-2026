import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { SPRITE } from "../../config/dialogueBox";
/**
 * Sprite de personagem com posicionamento consistente e fallback resiliente.
 *
 * Alinhamento garantido para todas as cenas:
 *  - mesma linha de base (base do sprite ancorada embaixo via `items-end`);
 *  - mesma escala proporcional (altura fixa relativa à viewport);
 *  - mesma margem lateral (classes por `side`).
 *
 * O `side` vem da configuração central de personagens (`src/config/characters.ts`),
 * nunca de valores soltos nos componentes.
 */
const SIDE_CLASSES = {
    left: "left-0 justify-start pl-[4vw] md:pl-[6vw]",
    right: "right-0 justify-end pr-[4vw] md:pr-[6vw]",
};
export function CharacterSprite({ src, name, side, active = true, }) {
    // O estado de erro é resetado na troca de sprite pela `key` no componente pai.
    const [failed, setFailed] = useState(false);
    const showImage = src !== null && !failed;
    return (_jsx(motion.div, { className: `pointer-events-none absolute z-10 flex items-end ${SIDE_CLASSES[side]}`, style: { bottom: SPRITE.BOTTOM_OFFSET }, initial: { opacity: 0, y: 20 }, animate: { opacity: active ? 1 : 0.45, y: 0 }, transition: { duration: 0.6, ease: "easeOut" }, children: showImage ? (_jsx("img", { src: src, alt: name, className: "w-auto max-w-none object-contain object-bottom", style: { height: SPRITE.HEIGHT }, draggable: false, onError: () => setFailed(true) })) : (_jsx("div", { className: "flex w-40 items-end justify-center md:w-56", style: { height: SPRITE.HEIGHT }, "aria-hidden": "true", children: _jsx("div", { className: "flex h-[70%] w-full items-center justify-center rounded-sm border border-primary/30 bg-content1/50", children: _jsx("span", { className: "px-2 text-center font-display text-xs uppercase tracking-widest text-primary", children: name }) }) })) }));
}
