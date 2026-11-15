import { useEffect, useMemo, useState } from "react";
import { useGameStore } from "../../store/useGameStore";
import { getCharacter, PROTAGONIST_NAME } from "../../config/characters";
import {
  PROLOGUE_SCENE,
  PROTAGONIST_NAME_TOKEN,
} from "../../data/missions/prologue";
import type { CharacterId, LinearScene } from "../../types/novel";
import { CharacterSprite } from "./CharacterSprite";
import { DialogueBox } from "./DialogueBox";
import { SceneBackground } from "./SceneBackground";
import { useTypewriterText } from "./useTypewriterText";

interface LinearSceneScreenProps {
  scene: LinearScene;
  /** Chamado ao avançar além da última fala da cena. */
  onComplete?: () => void;
}

/** Substitui o token de nome do protagonista pelo nome configurado. */
function withName(text: string): string {
  return text.split(PROTAGONIST_NAME_TOKEN).join(PROTAGONIST_NAME);
}

/**
 * Tela genérica de cena linear (sem escolhas), configurável pela prop `scene`.
 * O Ato 0 é só um consumidor desta base; os próximos atos lineares podem
 * reutilizá-la passando outro `LinearScene`.
 */
export function LinearSceneScreen({
  scene,
  onComplete,
}: LinearSceneScreenProps) {
  const setWorld = useGameStore((state) => state.setWorld);
  const [lineIndex, setLineIndex] = useState(0);

  const line = scene.lines[lineIndex] ?? scene.lines[0];

  // Quem já entrou em cena e ainda não saiu, até a fala atual (inclusive).
  // Deriva de `entersCharacterId` / `exitsCharacterId`, garantindo continuidade.
  const onStage = useMemo<CharacterId[]>(() => {
    const present = new Set<CharacterId>();
    for (let i = 0; i <= lineIndex && i < scene.lines.length; i += 1) {
      const current = scene.lines[i];
      if (current.entersCharacterId) present.add(current.entersCharacterId);
      if (current.exitsCharacterId) present.delete(current.exitsCharacterId);
    }
    return [...present];
  }, [scene.lines, lineIndex]);

  const fullText = withName(line.text);
  const { visibleText, textComplete, skipToFullText } = useTypewriterText(
    fullText,
    line.id,
  );

  useEffect(() => {
    setWorld(scene.world);
  }, [setWorld, scene.world]);

  const speaker = line.speakerId ? getCharacter(line.speakerId) : null;
  const speakerName = speaker?.displayName ?? scene.backgroundPlaceholderLabel;

  const isLastLine = lineIndex >= scene.lines.length - 1;

  const handleAdvance = () => {
    const didSkip = skipToFullText();
    if (didSkip) return;

    if (!isLastLine) {
      setLineIndex((current) => current + 1);
      return;
    }

    onComplete?.();
  };

  return (
    <section
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0E0C0F] text-foreground"
      onClick={handleAdvance}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          handleAdvance();
        }
      }}
      role="presentation"
    >
      {/* Faixa de cena: fundo + sprites posicionados por lado (config central). */}
      <div className="relative z-0 flex-1 overflow-hidden">
        <SceneBackground
          key={scene.backgroundAsset ?? "bg-placeholder"}
          src={scene.backgroundAsset}
          placeholderLabel={scene.backgroundPlaceholderLabel}
        />

        {onStage.map((characterId) => {
          const character = getCharacter(characterId);
          if (!character) return null;
          return (
            <CharacterSprite
              key={`${character.id}:${character.spriteAsset ?? "placeholder"}`}
              src={character.spriteAsset}
              name={character.placeholderLabel}
              side={character.side}
              active={line.speakerId === character.id}
            />
          );
        })}
      </div>

      {/* Painel de diálogo — mesmo visual do resto do jogo. */}
      <div className="relative z-20 flex shrink-0 flex-col items-center justify-start gap-4 bg-[#0E0C0F] px-4 pb-6 pt-5">
        <DialogueBox
          speakerName={speakerName}
          text={visibleText}
          showContinueHint={textComplete}
        />
      </div>
    </section>
  );
}

/**
 * ACT 0 — Prólogo. Fino wrapper sobre `LinearSceneScreen` com os dados do Ato 0.
 * Ao concluir, encaminha para o hub de seleção de missão (ACT 1).
 */
export function PrologueScreen() {
  const setScreen = useGameStore((state) => state.setScreen);

  return (
    <LinearSceneScreen
      scene={PROLOGUE_SCENE}
      onComplete={() => setScreen("playing")}
    />
  );
}
