import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getCharacter, withProtagonistName } from "../../config/characters";
import type {
  CharacterId,
  ScriptLine,
  StageChoice,
  StageScript,
  StageStep,
} from "../../types/novel";
import { ChoiceButton } from "./ChoiceButton";
import { CharacterSprite } from "./CharacterSprite";
import { DialogueBox } from "./DialogueBox";
import { SceneBackground } from "./SceneBackground";
import { ThemeIcon } from "./ThemeIcon";
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

/** Retorna as falas ativas para a posição atual. */
function linesFor(script: StageScript, pos: StagePosition): ScriptLine[] {
  if (pos.phase === "clear") return script.clearLines;

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
  const [pos, setPos] = useState<StagePosition>(INITIAL_POSITION);

  const lines = linesFor(script, pos);
  const line = lines[pos.lineIndex] ?? lines[0];
  const step: StageStep | undefined = script.steps[pos.stepIndex];

  const fullText = withProtagonistName(line?.text ?? "");
  const { visibleText, textComplete, skipToFullText } = useTypewriterText(
    fullText,
    line?.id ?? "empty",
  );

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

  const speaker = line?.speakerId ? getCharacter(line.speakerId) : null;
  const speakerName =
    speaker?.displayName ?? script.backgroundPlaceholderLabel;

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
      <div className="relative z-0 flex-1 overflow-hidden">
        <SceneBackground
          key={script.backgroundAsset ?? "bg-placeholder"}
          src={script.backgroundAsset}
          placeholderLabel={script.backgroundPlaceholderLabel}
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
              active={line?.speakerId === character.id}
            />
          );
        })}
      </div>

      <div className="relative z-20 flex shrink-0 flex-col items-center justify-start gap-4 bg-[#0E0C0F] px-4 pb-6 pt-5">
        <DialogueBox
          speakerName={speakerName}
          text={visibleText}
          showContinueHint={textComplete && !showChoices}
        />

        <AnimatePresence mode="wait">
          {showChoices && step?.kind === "choice" ? (
            <motion.div
              key={`choices-${step.id}`}
              className="flex w-full max-w-2xl items-center justify-center gap-10 md:gap-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <ThemeIcon
                src="/assets/icons/icon-star-1.svg"
                className="h-6 w-5 shrink-0 md:h-7 md:w-6"
              />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                {step.choices.map((choice, index) => (
                  <motion.div
                    key={choice.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.14,
                      duration: 0.35,
                      ease: "easeOut",
                    }}
                  >
                    <ChoiceButton
                      label={withProtagonistName(choice.label)}
                      onPress={() => handleChoice(choice)}
                    />
                  </motion.div>
                ))}
              </div>
              <ThemeIcon
                src="/assets/icons/icon-star-2.svg"
                className="h-6 w-8 shrink-0 md:h-7 md:w-9"
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
