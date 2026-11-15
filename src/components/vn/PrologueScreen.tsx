import { useEffect, useMemo, useState } from "react";
import {
  getCharacter,
  getCharacterSpriteSrc,
  getSpeakerDisplayName,
  resolveProtagonistName,
  withProtagonistName,
} from "../../config/characters";
import { SCENE } from "../../config/dialogueBox";
import { BACKGROUND_ASSETS } from "../../config/sceneAssets";
import { PROLOGUE_SCENE } from "../../data/missions/prologue";
import { useGameStore } from "../../store/useGameStore";
import type { SpriteExpression } from "../../config/sceneAssets";
import type { CharacterId, LinearScene } from "../../types/novel";
import { CharacterSprite } from "./CharacterSprite";
import { DialogueBox } from "./DialogueBox";
import { DialoguePanel } from "./DialoguePanel";
import { SceneBackground } from "./SceneBackground";
import { useTypewriterText } from "./useTypewriterText";

interface LinearSceneScreenProps {
  scene: LinearScene;
  /** Chamado ao avançar além da última fala da cena. */
  onComplete?: () => void;
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
  const playerName = useGameStore((state) => state.playerName);
  const setScenePosition = useGameStore((state) => state.setScenePosition);
  // Retomada do save: começa na fala salva se for esta mesma cena.
  const [lineIndex, setLineIndex] = useState(() => {
    const saved = useGameStore.getState().scenePosition;
    if (saved?.sceneId !== scene.id) return 0;
    return Math.min(saved.lineIndex, scene.lines.length - 1);
  });

  // Save automático: registra a fala atual a cada avanço.
  useEffect(() => {
    setScenePosition({ sceneId: scene.id, lineIndex });
  }, [setScenePosition, scene.id, lineIndex]);

  const line = scene.lines[lineIndex] ?? scene.lines[0];
  const displayName = resolveProtagonistName(playerName);

  // Quem já entrou em cena e ainda não saiu, até a fala atual (inclusive).
  // Deriva de `entersCharacterId` / `exitsCharacterId`, garantindo continuidade.
  // Quando a cena marca `protagonistAlwaysOnStage`, o protagonista está presente
  // do início ao fim (ex.: Final Act), sem precisar de `entersCharacterId`.
  const onStage = useMemo<CharacterId[]>(() => {
    const present = new Set<CharacterId>();
    if (scene.protagonistAlwaysOnStage) present.add("protagonist");
    for (let i = 0; i <= lineIndex && i < scene.lines.length; i += 1) {
      const current = scene.lines[i];
      if (current.entersCharacterId) present.add(current.entersCharacterId);
      if (current.exitsCharacterId) present.delete(current.exitsCharacterId);
    }
    return [...present];
  }, [scene.lines, lineIndex, scene.protagonistAlwaysOnStage]);

  // Estado do capacete do protagonista na fala atual. Deriva da última marca
  // `protagonistHelmet` até aqui (inclusive). Default: `'on'` (de capacete),
  // pois nas cenas de missão ele já está equipado; o Ato 0 marca `'off'` já na
  // primeira fala dele. `'off'` usa o sprite sem capacete.
  const protagonistExpression = useMemo<SpriteExpression>(() => {
    let helmet: "on" | "off" = "on";
    for (let i = 0; i <= lineIndex && i < scene.lines.length; i += 1) {
      const marker = scene.lines[i].protagonistHelmet;
      if (marker) helmet = marker;
    }
    return helmet === "off" ? "withoutHelmet" : "normal";
  }, [scene.lines, lineIndex]);

  // Fundo da fala atual. A cena começa em `backgroundAsset`; uma fala pode
  // trocar o fundo dali em diante (ex.: Final Act volta ao sótão).
  const backgroundAsset = useMemo(() => {
    let asset = scene.backgroundAsset;
    for (let i = 0; i <= lineIndex && i < scene.lines.length; i += 1) {
      const marker = scene.lines[i].backgroundAsset;
      if (marker !== undefined) asset = marker;
    }
    return asset;
  }, [scene.backgroundAsset, scene.lines, lineIndex]);

  const rocketBleed = backgroundAsset === BACKGROUND_ASSETS.hubShip;

  const fullText = withProtagonistName(line.text, playerName);
  const { visibleText, textComplete, skipToFullText } = useTypewriterText(
    fullText,
    line.id,
  );

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
      {/* Faixa de cena: ocupa a tela toda; sprites por lado (config central).
          O painel de diálogo é fixo e fica POR CIMA, sem empurrar nada. */}
      <div className="absolute inset-0 z-0 w-screen overflow-hidden">
        <SceneBackground
          key={backgroundAsset ?? "bg-placeholder"}
          src={backgroundAsset}
          placeholderLabel={scene.backgroundPlaceholderLabel}
          // A arte opaca do foguete é 1234/1871 da largura do arquivo.
          // vw + maxWidth none: a margem transparente não pode limitar a página.
          bleedWidth={rocketBleed ? "158vw" : undefined}
          bleedOffsetY={rocketBleed ? "-6vh" : undefined}
        />

        {/* Painel preto superior (letterbox), igual ao topo do hub do Ato 1.
            Fica por cima do fundo, abaixo dos sprites/HUD. */}
        <div
          className="absolute inset-x-0 top-0 z-10 bg-[#0E0C0F]"
          style={{ height: SCENE.TOP_BAR_HEIGHT }}
          aria-hidden="true"
        />

        {onStage.map((characterId) => {
          const character = getCharacter(characterId);
          if (!character) return null;
          const spriteSrc =
            character.id === "protagonist"
              ? getCharacterSpriteSrc(character.id, protagonistExpression)
              : getCharacterSpriteSrc(character.id);
          const label =
            character.id === "protagonist"
              ? displayName
              : character.placeholderLabel;
          return (
            <CharacterSprite
              key={`${character.id}:${spriteSrc ?? "placeholder"}`}
              src={spriteSrc}
              name={label}
              side={character.side}
              active={line.speakerId === character.id}
              bottomNudge={character.spriteBottomNudge}
            />
          );
        })}
      </div>

      {/* Painel de diálogo — posição FIXA, fora do fluxo (não causa reflow). */}
      <DialoguePanel>
        <DialogueBox
          speakerName={speakerName}
          text={visibleText}
          measureText={fullText}
          showContinueHint={textComplete}
        />
      </DialoguePanel>
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
