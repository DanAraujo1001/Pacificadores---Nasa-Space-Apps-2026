import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DialogueChoice, DialogueNode } from "../../types/novel";
import { useGameStore } from "../../store/useGameStore";
import { ChoiceButton } from "./ChoiceButton";
import { DialogueBox } from "./DialogueBox";
import { HomeButton } from "./HomeButton";
import { ThemeIcon } from "./ThemeIcon";
import { useTypewriterText } from "./useTypewriterText";

const STAGE_BG = "/assets/backgrounds/bg-example.png";
const PLAYER_SPRITE = "/assets/sprites/player/player-normal.png";

const MOCK_CHOICES: DialogueChoice[] = [
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

const MOCK_RESPONSES: Record<string, { text: string }> = {
  "node-response-01": {
    text: "Poeira fina, basáltica. Leituras batem com as amostras históricas. A superfície ainda guarda o que foi deixado para trás.",
  },
  "node-response-02": {
    text: "Sinal fraco, mas estável. O estágio de descida responde em eco analógico, como se ainda esperasse um uplink.",
  },
  "node-response-03": {
    text: "Sem vento. Sem atmosfera. Só o ruído térmico do meu traje e a memória de um primeiro passo.",
  },
};

const INITIAL_NODE: DialogueNode = {
  id: "node-intro",
  speakerId: "",
  expression: "neutral",
  text: "Solo lunar sob as botas. Diante de mim, equipamentos esquecidos da NASA aguardam. Hora de explorar a superfície.",
  choices: MOCK_CHOICES,
};

export function GameScreen() {
  const setWorld = useGameStore((state) => state.setWorld);
  const playerName = useGameStore((state) => state.playerName);
  const [node, setNode] = useState<DialogueNode>(INITIAL_NODE);
  const [bgFailed, setBgFailed] = useState(false);
  const [spriteFailed, setSpriteFailed] = useState(false);

  const { visibleText, textComplete, skipToFullText } = useTypewriterText(
    node.text,
    node.id,
  );

  useEffect(() => {
    setWorld("mars");
  }, [setWorld]);

  const hasChoices = (node.choices?.length ?? 0) > 0;
  const showChoices = hasChoices && textComplete;

  const handleChoice = (choice: DialogueChoice) => {
    const response = MOCK_RESPONSES[choice.nextNodeId];
    if (!response) return;

    setNode((current) => ({
      ...current,
      id: choice.nextNodeId,
      text: response.text,
      choices: MOCK_CHOICES,
    }));
  };

  return (
    <section
      className="relative flex min-h-screen w-full flex-col bg-[#0E0C0F] text-foreground"
      onClick={() => skipToFullText()}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          skipToFullText();
        }
      }}
      role="presentation"
    >
      <HomeButton />

      {/* Letterbox superior — desce o bloco de imagem */}
      <div className="h-16 shrink-0 bg-[#0E0C0F] md:h-20" aria-hidden="true" />

      {/* Faixa de background — personagem sobressai no topo e desce por trás do painel */}
      <div className="relative z-0 h-[min(60vh,620px)] w-full shrink-0 overflow-visible">
        {!bgFailed ? (
          <img
            src={STAGE_BG}
            alt=""
            className="absolute inset-0 size-full object-cover"
            draggable={false}
            onError={() => setBgFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-[#1A161D]" aria-hidden="true" />
        )}
      </div>

      {/* Sprite alinhado ao stage (mais baixo na página) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center md:-top-20">
        {spriteFailed ? (
          <div
            className="-translate-x-6 flex h-[75vh] w-56 items-end justify-center md:-translate-x-10"
            aria-hidden="true"
          >
            <div className="mb-[22vh] flex h-56 w-40 items-center justify-center rounded-sm border border-primary/30 bg-content1/50">
              <span className="font-display text-xs uppercase tracking-widest text-primary">
                Vanguard
              </span>
            </div>
          </div>
        ) : (
          <motion.img
            src={PLAYER_SPRITE}
            alt="Vanguard"
            className="-translate-x-6 h-[min(88vh,820px)] w-auto max-w-none object-contain object-top md:-translate-x-10"
            draggable={false}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onError={() => setSpriteFailed(true)}
          />
        )}
      </div>

      {/* Painel de diálogo compacto — cobre só a base do personagem */}
      <div
        className="relative z-20 -mt-[12vh] flex flex-1 flex-col items-center justify-start gap-4 bg-[#0E0C0F] px-4 pb-6 pt-5"
      >
        <DialogueBox
          speakerName={playerName || "Explorer"}
          text={visibleText}
          showContinueHint={textComplete && !hasChoices}
        />

        <AnimatePresence mode="wait">
          {showChoices ? (
            <motion.div
              key={`choices-${node.id}`}
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
                {(node.choices ?? []).map((choice, index) => (
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
                      label={choice.label}
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
