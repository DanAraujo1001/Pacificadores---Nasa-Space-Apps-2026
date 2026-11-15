import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../../store/useGameStore";
import { DialogueBox } from "./DialogueBox";
import { DialoguePanel } from "./DialoguePanel";
import { useTypewriterText } from "./useTypewriterText";
const STAGE_BG = "/assets/backgrounds/bg-example.png";
const PLAYER_SPRITE = "/assets/sprites/player/player-normal.png";
const MOCK_LINES = [
    "Solo lunar sob as botas. Diante de mim, equipamentos esquecidos da NASA aguardam. Hora de explorar a superfície.",
    "Poeira fina, basáltica. Leituras batem com as amostras históricas — a superfície ainda guarda o que foi deixado para trás.",
    "Sem vento. Sem atmosfera. Só o ruído térmico do meu traje e a memória de um primeiro passo.",
];
export function GameDialogueScreen() {
    const setWorld = useGameStore((state) => state.setWorld);
    const playerName = useGameStore((state) => state.playerName);
    const [lineIndex, setLineIndex] = useState(0);
    const [bgFailed, setBgFailed] = useState(false);
    const [spriteFailed, setSpriteFailed] = useState(false);
    const fullText = MOCK_LINES[lineIndex] ?? MOCK_LINES[0];
    const { visibleText, textComplete, skipToFullText } = useTypewriterText(fullText, lineIndex);
    useEffect(() => {
        setWorld("mars");
    }, [setWorld]);
    const handleScreenClick = () => {
        const didSkip = skipToFullText();
        if (didSkip)
            return;
        if (lineIndex < MOCK_LINES.length - 1) {
            setLineIndex((current) => current + 1);
        }
    };
    return (_jsxs("section", { className: "relative flex min-h-screen w-full flex-col bg-[#0E0C0F] text-foreground", onClick: handleScreenClick, onKeyDown: (event) => {
            if (event.key === "Enter" || event.key === " ") {
                handleScreenClick();
            }
        }, role: "presentation", children: [_jsx("div", { className: "h-16 shrink-0 bg-[#0E0C0F] md:h-20", "aria-hidden": "true" }), _jsx("div", { className: "relative z-0 h-[min(60vh,620px)] w-full shrink-0 overflow-visible", children: !bgFailed ? (_jsx("img", { src: STAGE_BG, alt: "", className: "absolute inset-0 size-full object-cover", draggable: false, onError: () => setBgFailed(true) })) : (_jsx("div", { className: "absolute inset-0 bg-[#1A161D]", "aria-hidden": "true" })) }), _jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center md:-top-20", children: spriteFailed ? (_jsx("div", { className: "-translate-x-6 flex h-[75vh] w-56 items-end justify-center md:-translate-x-10", "aria-hidden": "true", children: _jsx("div", { className: "mb-[22vh] flex h-56 w-40 items-center justify-center rounded-sm border border-primary/30 bg-content1/50", children: _jsx("span", { className: "font-display text-xs uppercase tracking-widest text-primary", children: "Vanguard" }) }) })) : (_jsx(motion.img, { src: PLAYER_SPRITE, alt: "Vanguard", className: "-translate-x-6 h-[min(88vh,820px)] w-auto max-w-none object-contain object-top md:-translate-x-10", draggable: false, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: "easeOut" }, onError: () => setSpriteFailed(true) })) }), _jsx(DialoguePanel, { children: _jsx(DialogueBox, { speakerName: playerName || "Explorer", text: visibleText, measureText: fullText, showContinueHint: textComplete }) })] }));
}
