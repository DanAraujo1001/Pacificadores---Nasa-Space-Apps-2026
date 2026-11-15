import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AnimatePresence, motion } from "framer-motion";
import { DIALOGUE_BOX } from "../../config/dialogueBox";
import { ChoiceButton } from "./ChoiceButton";
import { ThemeIcon } from "./ThemeIcon";
import { useFitChoices, useFitDialogueText, useFitSpeakerName, } from "./useFitText";
const NAME_FONT_FAMILY = '"Space Grotesk", sans-serif';
/** Classes visuais compartilhadas entre a opção real e o sizer de medição. */
const OPTION_CLASS = "w-full min-w-[200px] rounded-sm border border-primary/40 bg-primary/35 px-5 text-center font-medium text-white";
/** Estilo (em `em`) do preenchimento vertical da opção — escala com a fonte. */
const optionPadStyle = {
    paddingTop: `${DIALOGUE_BOX.CHOICE_PADDING_Y_EM}em`,
    paddingBottom: `${DIALOGUE_BOX.CHOICE_PADDING_Y_EM}em`,
    lineHeight: 1.2,
};
export function DialogueBox({ speakerName, text, measureText, showContinueHint = false, choices, choicesKey = "", }) {
    const hasChoices = !!choices && choices.length > 0;
    const { sizerRef, containerRef, fontPx } = useFitDialogueText(measureText ?? text);
    const { sizerRef: nameSizerRef, fontPx: nameFontPx } = useFitSpeakerName(speakerName);
    const { sizerRef: choicesSizerRef, containerRef: choicesContainerRef, fontPx: choiceFontPx, } = useFitChoices(choicesKey);
    const bodyStyle = {
        fontSize: `${fontPx}px`,
        lineHeight: DIALOGUE_BOX.LINE_HEIGHT,
    };
    const nameStyle = {
        fontSize: `${nameFontPx}px`,
        fontFamily: NAME_FONT_FAMILY,
    };
    const choiceFontStyle = { fontSize: `${choiceFontPx}px` };
    const choiceGapStyle = { gap: `${DIALOGUE_BOX.CHOICE_GAP_EM}em` };
    // A fala, dentro do modo escolha, usa a mesma fonte das opções (reduzida
    // proporcionalmente junto com elas), como pede o roteiro da tarefa.
    const choiceTextStyle = {
        fontSize: `${choiceFontPx}px`,
        lineHeight: DIALOGUE_BOX.LINE_HEIGHT,
    };
    const displayText = measureText ?? text;
    return (_jsxs("div", { className: "pointer-events-none flex w-full flex-col items-center gap-1.5 px-4 text-center", children: [_jsxs("div", { className: "relative w-full", children: [_jsx("p", { ref: nameSizerRef, "aria-hidden": "true", className: "invisible absolute inset-x-0 top-0 mx-auto w-full max-w-xs truncate whitespace-nowrap font-bold tracking-wide", style: nameStyle, children: speakerName }), _jsx("p", { className: "truncate font-display font-bold tracking-wide text-primary", style: nameStyle, children: speakerName })] }), hasChoices ? (_jsxs("div", { ref: choicesContainerRef, className: "relative flex w-full items-center justify-center", style: { height: DIALOGUE_BOX.CHOICE_AREA_HEIGHT }, children: [_jsxs("div", { "aria-hidden": "true", className: "invisible absolute inset-0 mx-auto flex w-full max-w-2xl items-center justify-center gap-6 md:gap-10", style: choiceFontStyle, children: [_jsx("span", { className: "h-6 w-5 shrink-0 md:h-7 md:w-6" }), _jsxs("div", { ref: choicesSizerRef, className: "flex min-w-0 flex-1 flex-col items-center", style: choiceGapStyle, children: [_jsx("p", { className: "w-full", style: { lineHeight: DIALOGUE_BOX.LINE_HEIGHT }, children: displayText }), choices.map((choice) => (_jsx("div", { className: OPTION_CLASS, style: optionPadStyle, children: choice.label }, `sizer-${choice.id}`)))] }), _jsx("span", { className: "h-6 w-8 shrink-0 md:h-7 md:w-9" })] }), _jsxs(motion.div, { className: "pointer-events-auto mx-auto flex w-full max-w-2xl items-center justify-center gap-6 md:gap-10", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.25, ease: "easeOut" }, onClick: (event) => event.stopPropagation(), children: [_jsx(ThemeIcon, { src: "/assets/icons/icon-star-1.svg", className: "h-6 w-5 shrink-0 md:h-7 md:w-6" }), _jsxs("div", { className: "flex min-w-0 flex-1 flex-col items-center", style: choiceGapStyle, children: [_jsx("p", { className: "pointer-events-none w-full text-foreground", style: choiceTextStyle, children: displayText }), choices.map((choice, index) => (_jsx(motion.div, { className: "w-full", initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: {
                                            delay: index * 0.08,
                                            duration: 0.25,
                                            ease: "easeOut",
                                        }, children: _jsx(ChoiceButton, { label: choice.label, onPress: choice.onSelect, fontPx: choiceFontPx }) }, choice.id)))] }), _jsx(ThemeIcon, { src: "/assets/icons/icon-star-2.svg", className: "h-6 w-8 shrink-0 md:h-7 md:w-9" })] }, `choices-${choicesKey}`)] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { ref: containerRef, className: "relative flex w-full items-center justify-center overflow-hidden", style: { height: `${DIALOGUE_BOX.TEXT_HEIGHT_PX}px` }, children: [_jsx("p", { ref: sizerRef, "aria-hidden": "true", className: "invisible absolute inset-x-0 top-0 w-full", style: bodyStyle, children: displayText }), _jsx(AnimatePresence, { mode: "wait", initial: false, children: _jsx(motion.p, { className: "text-foreground", style: bodyStyle, initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 }, children: text }, "dialogue-text") })] }), _jsx("div", { className: "flex h-6 items-end justify-center gap-1", "aria-hidden": "true", children: _jsxs(motion.div, { className: "flex items-end gap-1", animate: { opacity: showContinueHint ? 1 : 0 }, transition: { duration: 0.35, ease: "easeOut" }, children: [_jsx(ThemeIcon, { src: "/assets/icons/icon-star-1.svg", className: "h-4 w-3.5" }), _jsx(ThemeIcon, { src: "/assets/icons/icon-star-2.svg", className: "h-5 w-6" })] }) })] }))] }));
}
