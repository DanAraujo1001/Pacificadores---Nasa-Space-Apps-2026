import { useMemo, useState } from "react";
import {
  getCharacter,
  getCharacterSpriteSrc,
  getSpeakerDisplayName,
  resolveProtagonistName,
  withProtagonistName,
} from "../../config/characters";
import type { SpriteExpression } from "../../config/sceneAssets";
import { useGameStore } from "../../store/useGameStore";
import type {
  CharacterId,
  ScriptLine,
  StageChoice,
  StageScript,
  StageStep,
} from "../../types/novel";
import { CharacterSprite } from "./CharacterSprite";
import { DialogueBox } from "./DialogueBox";
import { DialoguePanel } from "./DialoguePanel";
import { SceneBackground } from "./SceneBackground";
import { useSplitItemLines } from "./useSplitItemLines";
import { useTypewriterText } from "./useTypewriterText";

interface StageScreenProps {
  script: StageScript;
  /** Chamado quando o jogador conclui o estágio com sucesso (Stage Clear). */
  onClear: () => void;
  /** Chamado quando o jogador erra uma escolha (game-over → tentar de novo). */
  onGameOver: () => void;
}

/**
 * Posição dentro do estágio. `phase` diz qual lista de falas está ativa:
 *  - `step`: falas introdutórias do passo atual (antes das opções);
 *  - `outcome`: reação após a escolha (certa ou errada);
 *  - `clear`: falas finais de sucesso.
 */
interface StagePosition {
  stepIndex: number;
  lineIndex: number;
  phase: "step" | "outcome" | "clear";
  /** Opção escolhida (quando `phase === 'outcome'`). */
  chosen: StageChoice | null;
}

const INITIAL_POSITION: StagePosition = {
  stepIndex: 0,
  lineIndex: 0,
  phase: "step",
  chosen: null,
};

/**
 * Retorna as falas ativas para a posição atual. Na fase `clear`, usa as falas
 * já EXPANDIDAS (descrições de item divididas em partes), passadas por `clearLines`.
 */
function linesFor(
  script: StageScript,
  pos: StagePosition,
  clearLines: ScriptLine[],
): ScriptLine[] {
  if (pos.phase === "clear") return clearLines;

  const step = script.steps[pos.stepIndex];
  if (pos.phase === "outcome") return pos.chosen?.outcomeLines ?? [];
  return step.lines;
}

/**
 * Motor de estágio reutilizável, dirigido inteiramente por dados (`StageScript`).
 * Um único componente serve aos quatro equipamentos — nada é duplicado por
 * estágio. Reaproveita `DialogueBox`, `CharacterSprite`, `SceneBackground`,
 * `ChoiceButton` e `useTypewriterText`, mantendo o mesmo visual do jogo.
 */
export function StageScreen({ script, onClear, onGameOver }: StageScreenProps) {
  const playerName = useGameStore((state) => state.playerName);
  const [pos, setPos] = useState<StagePosition>(INITIAL_POSITION);

  // Descrições de item (Stage Clear) são divididas em várias falas por medição
  // real, para caberem na fonte padrão sem reduzir nem cortar.
  const { lines: splitClearLines } = useSplitItemLines(
    script.clearLines,
    playerName,
  );

  const lines = linesFor(script, pos, splitClearLines);
  const line = lines[pos.lineIndex] ?? lines[0];
  const step: StageStep | undefined = script.steps[pos.stepIndex];

  const displayName = resolveProtagonistName(playerName);
  const fullText = withProtagonistName(line?.text ?? "", playerName);
  const { visibleText, textComplete, skipToFullText } = useTypewriterText(
    fullText,
    line?.id ?? "empty",
  );

  const outcomeExpression: SpriteExpression =
    pos.phase === "outcome" && pos.chosen
      ? pos.chosen.correct
        ? "proud"
        : "sad"
      : "normal";

  // Continuidade: quem está em cena até a fala atual. O protagonista está
  // sempre presente (lado esquerdo); os equipamentos entram via `entersCharacterId`.
  const onStage = useMemo<CharacterId[]>(() => {
    const present = new Set<CharacterId>(["protagonist"]);
    // Varre todas as falas de step já percorridas para acumular entradas/saídas.
    for (let s = 0; s <= pos.stepIndex && s < script.steps.length; s += 1) {
      const current = script.steps[s];
      const upto =
        s < pos.stepIndex
          ? current.lines.length - 1
          : pos.phase === "step"
            ? pos.lineIndex
            : current.lines.length - 1;
      for (let i = 0; i <= upto && i < current.lines.length; i += 1) {
        const ln = current.lines[i];
        if (ln.entersCharacterId) present.add(ln.entersCharacterId);
        if (ln.exitsCharacterId) present.delete(ln.exitsCharacterId);
      }
    }
    return [...present];
  }, [script.steps, pos.stepIndex, pos.lineIndex, pos.phase]);

  const isChoiceStep = step?.kind === "choice";
  const atLastLineOfBlock = pos.lineIndex >= lines.length - 1;
  // Mostra as opções quando terminou as falas introdutórias de um passo de escolha.
  const showChoices =
    pos.phase === "step" &&
    isChoiceStep &&
    atLastLineOfBlock &&
    textComplete;

  const speakerName = line?.speakerId
    ? (getSpeakerDisplayName(line.speakerId, playerName) ??
      script.backgroundPlaceholderLabel)
    : script.backgroundPlaceholderLabel;

  const handleChoice = (choice: StageChoice) => {
    setPos((current) => ({
      ...current,
      phase: "outcome",
      chosen: choice,
      lineIndex: 0,
    }));
  };

  const advance = () => {
    const didSkip = skipToFullText();
    if (didSkip) return;

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
      } else {
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
    if (isChoiceStep) return;
    const nextStep = pos.stepIndex + 1;
    if (nextStep < script.steps.length) {
      setPos({ stepIndex: nextStep, lineIndex: 0, phase: "step", chosen: null });
    } else {
      setPos((current) => ({ ...current, phase: "clear", lineIndex: 0 }));
    }
  };

  return (
    <section
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0E0C0F] text-foreground"
      onClick={advance}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          advance();
        }
      }}
      role="presentation"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <SceneBackground
          key={script.backgroundAsset ?? "bg-placeholder"}
          src={script.backgroundAsset}
          placeholderLabel={script.backgroundPlaceholderLabel}
        />

        {onStage.map((characterId) => {
          const character = getCharacter(characterId);
          if (!character) return null;
          const expression =
            character.id === line?.speakerId ? outcomeExpression : "normal";
          const spriteSrc = getCharacterSpriteSrc(character.id, expression);
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
              active={line?.speakerId === character.id}
              bottomNudge={character.spriteBottomNudge}
            />
          );
        })}
      </div>

      {/* Diálogo: painel FIXO (fora do fluxo). As escolhas aparecem DENTRO da
          barra, no lugar da fala, sem mudar o tamanho da barra. */}
      <DialoguePanel>
        <DialogueBox
          speakerName={speakerName}
          text={visibleText}
          measureText={fullText}
          isItemDescription={line?.isItemDescription}
          showContinueHint={textComplete && !showChoices}
          choices={
            showChoices && step?.kind === "choice"
              ? step.choices.map((choice) => ({
                  id: choice.id,
                  label: withProtagonistName(choice.label, playerName),
                  onSelect: () => handleChoice(choice),
                }))
              : undefined
          }
          choicesKey={showChoices && step?.kind === "choice" ? step.id : ""}
        />
      </DialoguePanel>
    </section>
  );
}
