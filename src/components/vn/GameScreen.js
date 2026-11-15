import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../../store/useGameStore";
import { ChoiceButton } from "./ChoiceButton";
import { DialogueBox } from "./DialogueBox";
import { ThemeIcon } from "./ThemeIcon";
import { useTypewriterText } from "./useTypewriterText";
const STAGE_BG = "/assets/backgrounds/bg-example.png";
const PLAYER_SPRITE = "/assets/sprites/player/player-normal.png";
const MOCK_CHOICES = [
    {
        id: "choice-01",
        label: "Opção com hover",
        nextNodeId: "node-response-01",
    },
    {
        id: "choice-02",
        label: "Opção B",
        nextNodeId: "node-response-02",
    },
    {
        id: "choice-03",
        label: "Opção C",
        nextNodeId: "node-response-03",
    },
];
const MOCK_RESPONSES = {
    "node-response-01": {
        text: "Poeira fina, basáltica. Leituras batem com as amostras históricas — a superfície ainda guarda o que foi deixado para trás.",
    },
    "node-response-02": {
        text: "Sinal fraco, mas estável. O estágio de descida responde em eco analógico — como se ainda esperasse um uplink.",
    },
    "node-response-03": {
        text: "Sem vento. Sem atmosfera. Só o ruído térmico do meu traje e a memória de um primeiro passo.",
    },
};
const INITIAL_NODE = {
    id: "node-intro",
    speakerId: "",
    expression: "neutral",
    text: "Solo lunar sob as botas. Diante de mim, equipamentos esquecidos da NASA aguardam. Hora de explorar a superfície.",
    choices: MOCK_CHOICES,
};
export function GameScreen() {
    const setWorld = useGameStore((state) => state.setWorld);
    const playerName = useGameStore((state) => state.playerName);
    const [node, setNode] = useState(INITIAL_NODE);
    const [bgFailed, setBgFailed] = useState(false);
    const [spriteFailed, setSpriteFailed] = useState(false);
    const { visibleText, textComplete, skipToFullText } = useTypewriterText(node.text, node.id);
    useEffect(() => {
        setWorld("mars");
    }, [setWorld]);
    const hasChoices = (node.choices?.length ?? 0) > 0;
    const showChoices = hasChoices && textComplete;
    const handleChoice = (choice) => {
        const response = MOCK_RESPONSES[choice.nextNodeId];
        if (!response)
            return;
        setNode((current) => ({
            ...current,
            id: choice.nextNodeId,
            text: response.text,
            choices: MOCK_CHOICES,
        }));
    };
    return (_jsxs("section", { className: "relative flex min-h-screen w-full flex-col bg-[#0E0C0F] text-foreground", onClick: () => skipToFullText(), onKeyDown: (event) => {
            if (event.key === "Enter" || event.key === " ") {
                skipToFullText();
            }
        }, role: "presentation", children: [_jsx("div", { className: "h-16 shrink-0 bg-[#0E0C0F] md:h-20", "aria-hidden": "true" }), _jsx("div", { className: "relative z-0 h-[min(60vh,620px)] w-full shrink-0 overflow-visible", children: !bgFailed ? (_jsx("img", { src: STAGE_BG, alt: "", className: "absolute inset-0 size-full object-cover", draggable: false, onError: () => setBgFailed(true) })) : (_jsx("div", { className: "absolute inset-0 bg-[#1A161D]", "aria-hidden": "true" })) }), _jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center md:-top-20", children: spriteFailed ? (_jsx("div", { className: "-translate-x-6 flex h-[75vh] w-56 items-end justify-center md:-translate-x-10", "aria-hidden": "true", children: _jsx("div", { className: "mb-[22vh] flex h-56 w-40 items-center justify-center rounded-sm border border-primary/30 bg-content1/50", children: _jsx("span", { className: "font-display text-xs uppercase tracking-widest text-primary", children: "Vanguard" }) }) })) : (_jsx(motion.img, { src: PLAYER_SPRITE, alt: "Vanguard", className: "-translate-x-6 h-[min(88vh,820px)] w-auto max-w-none object-contain object-top md:-translate-x-10", draggable: false, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: "easeOut" }, onError: () => setSpriteFailed(true) })) }), _jsxs("div", { className: "relative z-20 -mt-[12vh] flex flex-1 flex-col items-center justify-start gap-4 bg-[#0E0C0F] px-4 pb-6 pt-5", children: [_jsx(DialogueBox, { speakerName: playerName || "Explorer", text: visibleText, showContinueHint: textComplete && !hasChoices }), _jsx(AnimatePresence, { mode: "wait", children: showChoices ? (_jsxs(motion.div, { className: "flex w-full max-w-2xl items-center justify-center gap-10 md:gap-16", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: (event) => event.stopPropagation(), children: [_jsx(ThemeIcon, { src: "/assets/icons/icon-star-1.svg", className: "h-6 w-5 shrink-0 md:h-7 md:w-6" }), _jsx("div", { className: "flex min-w-0 flex-1 flex-col gap-2", children: (node.choices ?? []).map((choice, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: {
                                            delay: index * 0.14,
                                            duration: 0.35,
                                            ease: "easeOut",
                                        }, children: _jsx(ChoiceButton, { label: choice.label, onPress: () => handleChoice(choice) }) }, choice.id))) }), _jsx(ThemeIcon, { src: "/assets/icons/icon-star-2.svg", className: "h-6 w-8 shrink-0 md:h-7 md:w-9" })] }, `choices-${node.id}`)) : null })] })] }));
}
