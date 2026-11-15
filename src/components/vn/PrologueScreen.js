import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { getCharacter, getCharacterSpriteSrc, getSpeakerDisplayName, resolveProtagonistName, withProtagonistName, } from "../../config/characters";
import { PROLOGUE_SCENE } from "../../data/missions/prologue";
import { useGameStore } from "../../store/useGameStore";
import { CharacterSprite } from "./CharacterSprite";
import { DialogueBox } from "./DialogueBox";
import { DialoguePanel } from "./DialoguePanel";
import { SceneBackground } from "./SceneBackground";
import { useTypewriterText } from "./useTypewriterText";
/**
 * Tela genérica de cena linear (sem escolhas), configurável pela prop `scene`.
 * O Ato 0 é só um consumidor desta base; os próximos atos lineares podem
 * reutilizá-la passando outro `LinearScene`.
 */
export function LinearSceneScreen({ scene, onComplete, }) {
    const setWorld = useGameStore((state) => state.setWorld);
    const playerName = useGameStore((state) => state.playerName);
    const [lineIndex, setLineIndex] = useState(0);
    const line = scene.lines[lineIndex] ?? scene.lines[0];
    const displayName = resolveProtagonistName(playerName);
    // Quem já entrou em cena e ainda não saiu, até a fala atual (inclusive).
    // Deriva de `entersCharacterId` / `exitsCharacterId`, garantindo continuidade.
    const onStage = useMemo(() => {
        const present = new Set();
        for (let i = 0; i <= lineIndex && i < scene.lines.length; i += 1) {
            const current = scene.lines[i];
            if (current.entersCharacterId)
                present.add(current.entersCharacterId);
            if (current.exitsCharacterId)
                present.delete(current.exitsCharacterId);
        }
        return [...present];
    }, [scene.lines, lineIndex]);
    const fullText = withProtagonistName(line.text, playerName);
    const { visibleText, textComplete, skipToFullText } = useTypewriterText(fullText, line.id);
    useEffect(() => {
        setWorld(scene.world);
    }, [setWorld, scene.world]);
    const speakerName = line.speakerId
        ? (getSpeakerDisplayName(line.speakerId, playerName) ??
            scene.backgroundPlaceholderLabel)
        : scene.backgroundPlaceholderLabel;
    const isLastLine = lineIndex >= scene.lines.length - 1;
    const handleAdvance = () => {
        const didSkip = skipToFullText();
        if (didSkip)
            return;
        if (!isLastLine) {
            setLineIndex((current) => current + 1);
            return;
        }
        onComplete?.();
    };
    return (_jsxs("section", { className: "relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0E0C0F] text-foreground", onClick: handleAdvance, onKeyDown: (event) => {
            if (event.key === "Enter" || event.key === " ") {
                handleAdvance();
            }
        }, role: "presentation", children: [_jsxs("div", { className: "absolute inset-0 z-0 overflow-hidden", children: [_jsx(SceneBackground, { src: scene.backgroundAsset, placeholderLabel: scene.backgroundPlaceholderLabel }, scene.backgroundAsset ?? "bg-placeholder"), onStage.map((characterId) => {
                        const character = getCharacter(characterId);
                        if (!character)
                            return null;
                        const spriteSrc = getCharacterSpriteSrc(character.id);
                        const label = character.id === "protagonist"
                            ? displayName
                            : character.placeholderLabel;
                        return (_jsx(CharacterSprite, { src: spriteSrc, name: label, side: character.side, active: line.speakerId === character.id }, `${character.id}:${spriteSrc ?? "placeholder"}`));
                    })] }), _jsx(DialoguePanel, { children: _jsx(DialogueBox, { speakerName: speakerName, text: visibleText, measureText: fullText, showContinueHint: textComplete }) })] }));
}
/**
 * ACT 0 — Prólogo. Fino wrapper sobre `LinearSceneScreen` com os dados do Ato 0.
 * Ao concluir, encaminha para o hub de seleção de missão (ACT 1).
 */
export function PrologueScreen() {
    const setScreen = useGameStore((state) => state.setScreen);
    return (_jsx(LinearSceneScreen, { scene: PROLOGUE_SCENE, onComplete: () => setScreen("playing") }));
}
