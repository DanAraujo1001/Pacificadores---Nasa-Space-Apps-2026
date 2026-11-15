import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { getCharacter, getCharacterSpriteSrc, getSpeakerDisplayName, resolveProtagonistName, withProtagonistName, } from "../../config/characters";
import { useGameStore } from "../../store/useGameStore";
import { CharacterSprite } from "./CharacterSprite";
import { DialogueBox } from "./DialogueBox";
import { DialoguePanel } from "./DialoguePanel";
import { SceneBackground } from "./SceneBackground";
import { useTypewriterText } from "./useTypewriterText";
const INITIAL_POSITION = {
    stepIndex: 0,
    lineIndex: 0,
    phase: "step",
    chosen: null,
};
/** Retorna as falas ativas para a posição atual. */
function linesFor(script, pos) {
    if (pos.phase === "clear")
        return script.clearLines;
    const step = script.steps[pos.stepIndex];
    if (pos.phase === "outcome")
        return pos.chosen?.outcomeLines ?? [];
    return step.lines;
}
/**
 * Motor de estágio reutilizável, dirigido inteiramente por dados (`StageScript`).
 * Um único componente serve aos quatro equipamentos — nada é duplicado por
 * estágio. Reaproveita `DialogueBox`, `CharacterSprite`, `SceneBackground`,
 * `ChoiceButton` e `useTypewriterText`, mantendo o mesmo visual do jogo.
 */
export function StageScreen({ script, onClear, onGameOver }) {
    const playerName = useGameStore((state) => state.playerName);
    const [pos, setPos] = useState(INITIAL_POSITION);
    const lines = linesFor(script, pos);
    const line = lines[pos.lineIndex] ?? lines[0];
    const step = script.steps[pos.stepIndex];
    const displayName = resolveProtagonistName(playerName);
    const fullText = withProtagonistName(line?.text ?? "", playerName);
    const { visibleText, textComplete, skipToFullText } = useTypewriterText(fullText, line?.id ?? "empty");
    const outcomeExpression = pos.phase === "outcome" && pos.chosen
        ? pos.chosen.correct
            ? "proud"
            : "sad"
        : "normal";
    // Continuidade: quem está em cena até a fala atual. O protagonista está
    // sempre presente (lado esquerdo); os equipamentos entram via `entersCharacterId`.
    const onStage = useMemo(() => {
        const present = new Set(["protagonist"]);
        // Varre todas as falas de step já percorridas para acumular entradas/saídas.
        for (let s = 0; s <= pos.stepIndex && s < script.steps.length; s += 1) {
            const current = script.steps[s];
            const upto = s < pos.stepIndex
                ? current.lines.length - 1
                : pos.phase === "step"
                    ? pos.lineIndex
                    : current.lines.length - 1;
            for (let i = 0; i <= upto && i < current.lines.length; i += 1) {
                const ln = current.lines[i];
                if (ln.entersCharacterId)
                    present.add(ln.entersCharacterId);
                if (ln.exitsCharacterId)
                    present.delete(ln.exitsCharacterId);
            }
        }
        return [...present];
    }, [script.steps, pos.stepIndex, pos.lineIndex, pos.phase]);
    const isChoiceStep = step?.kind === "choice";
    const atLastLineOfBlock = pos.lineIndex >= lines.length - 1;
    // Mostra as opções quando terminou as falas introdutórias de um passo de escolha.
    const showChoices = pos.phase === "step" &&
        isChoiceStep &&
        atLastLineOfBlock &&
        textComplete;
    const speakerName = line?.speakerId
        ? (getSpeakerDisplayName(line.speakerId, playerName) ??
            script.backgroundPlaceholderLabel)
        : script.backgroundPlaceholderLabel;
    const handleChoice = (choice) => {
        setPos((current) => ({
            ...current,
            phase: "outcome",
            chosen: choice,
            lineIndex: 0,
        }));
    };
    const advance = () => {
        const didSkip = skipToFullText();
        if (didSkip)
            return;
        // Ainda há falas no bloco atual.
        if (!atLastLineOfBlock) {
            setPos((current) => ({ ...current, lineIndex: current.lineIndex + 1 }));
            return;
        }
        // Fim do bloco atual: decide a transição conforme a fase.
        if (pos.phase === "clear") {
            onClear();
            return;
        }
        if (pos.phase === "outcome") {
            // Errou → game over.
            if (pos.chosen && !pos.chosen.correct) {
                onGameOver();
                return;
            }
            // Acertou → próximo passo, ou falas de sucesso se era o último.
            const nextStep = pos.stepIndex + 1;
            if (nextStep < script.steps.length) {
                setPos({
                    stepIndex: nextStep,
                    lineIndex: 0,
                    phase: "step",
                    chosen: null,
                });
            }
            else {
                setPos((current) => ({
                    ...current,
                    phase: "clear",
                    lineIndex: 0,
                    chosen: null,
                }));
            }
            return;
        }
        // phase === 'step': se é passo de escolha, as opções aparecem (não avança
        // por clique). Caso seja um passo 'talk', avança para o próximo passo.
        if (isChoiceStep)
            return;
        const nextStep = pos.stepIndex + 1;
        if (nextStep < script.steps.length) {
            setPos({ stepIndex: nextStep, lineIndex: 0, phase: "step", chosen: null });
        }
        else {
            setPos((current) => ({ ...current, phase: "clear", lineIndex: 0 }));
        }
    };
    return (_jsxs("section", { className: "relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0E0C0F] text-foreground", onClick: advance, onKeyDown: (event) => {
            if (event.key === "Enter" || event.key === " ") {
                advance();
            }
        }, role: "presentation", children: [_jsxs("div", { className: "absolute inset-0 z-0 overflow-hidden", children: [_jsx(SceneBackground, { src: script.backgroundAsset, placeholderLabel: script.backgroundPlaceholderLabel }, script.backgroundAsset ?? "bg-placeholder"), onStage.map((characterId) => {
                        const character = getCharacter(characterId);
                        if (!character)
                            return null;
                        const expression = character.id === line?.speakerId ? outcomeExpression : "normal";
                        const spriteSrc = getCharacterSpriteSrc(character.id, expression);
                        const label = character.id === "protagonist"
                            ? displayName
                            : character.placeholderLabel;
                        return (_jsx(CharacterSprite, { src: spriteSrc, name: label, side: character.side, active: line?.speakerId === character.id }, `${character.id}:${spriteSrc ?? "placeholder"}`));
                    })] }), _jsx(DialoguePanel, { children: _jsx(DialogueBox, { speakerName: speakerName, text: visibleText, measureText: fullText, showContinueHint: textComplete && !showChoices, choices: showChoices && step?.kind === "choice"
                        ? step.choices.map((choice) => ({
                            id: choice.id,
                            label: withProtagonistName(choice.label, playerName),
                            onSelect: () => handleChoice(choice),
                        }))
                        : undefined, choicesKey: showChoices && step?.kind === "choice" ? step.id : "" }) })] }));
}
