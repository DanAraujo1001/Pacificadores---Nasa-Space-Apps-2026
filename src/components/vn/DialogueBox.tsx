import { AnimatePresence, motion } from "framer-motion";
import { DIALOGUE_BOX } from "../../config/dialogueBox";
import { ChoiceButton } from "./ChoiceButton";
import { ThemeIcon } from "./ThemeIcon";
import {
  useFitChoices,
  useFitDialogueText,
  useFitSpeakerName,
} from "./useFitText";

/** Uma opção de escolha exibida dentro da barra. */
export interface DialogueChoiceItem {
  id: string;
  label: string;
  onSelect: () => void;
}

interface DialogueBoxProps {
  speakerName: string;
  /** Texto exibido (pode ser parcial, durante o efeito typewriter). */
  text: string;
  /**
   * Texto COMPLETO da fala, usado só para calcular o tamanho de fonte que faz
   * tudo caber na caixa estática. Evita a fonte "pular" durante o typewriter.
   * Se omitido, usa `text`.
   */
  measureText?: string;
  showContinueHint?: boolean;
  /**
   * Opções de escolha. Quando presentes, a barra entra em MODO ESCOLHA: nome,
   * fala e todas as opções ficam visíveis ao mesmo tempo, dentro da barra de
   * tamanho fixo. O auto-fit mede o bloco inteiro (fala + opções).
   */
  choices?: DialogueChoiceItem[];
  /** Id estável da escolha atual (dispara o recálculo de fonte ao trocar). */
  choicesKey?: string;
}

const NAME_FONT_FAMILY = '"Space Grotesk", sans-serif';

/** Classes visuais compartilhadas entre a opção real e o sizer de medição. */
const OPTION_CLASS =
  "w-full min-w-[200px] rounded-sm border border-primary/40 bg-primary/35 px-5 text-center font-medium text-white";

/** Estilo (em `em`) do preenchimento vertical da opção — escala com a fonte. */
const optionPadStyle = {
  paddingTop: `${DIALOGUE_BOX.CHOICE_PADDING_Y_EM}em`,
  paddingBottom: `${DIALOGUE_BOX.CHOICE_PADDING_Y_EM}em`,
  lineHeight: 1.2,
};

export function DialogueBox({
  speakerName,
  text,
  measureText,
  showContinueHint = false,
  choices,
  choicesKey = "",
}: DialogueBoxProps) {
  const hasChoices = !!choices && choices.length > 0;

  const { sizerRef, containerRef, fontPx } = useFitDialogueText(
    measureText ?? text,
  );
  const { sizerRef: nameSizerRef, fontPx: nameFontPx } =
    useFitSpeakerName(speakerName);
  const {
    sizerRef: choicesSizerRef,
    containerRef: choicesContainerRef,
    fontPx: choiceFontPx,
  } = useFitChoices(choicesKey);

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

  return (
    // Caixa inteira não-interativa por padrão: o mouse "passa" para a tela
    // (clique = avançar). As opções reativam `pointer-events` só nelas.
    // O `select-none` global do #root já cobre a seleção de texto.
    <div className="pointer-events-none flex w-full flex-col items-center gap-1.5 px-4 text-center">
      {/* Nameplate: espaço fixo em 1 linha; a fonte reduz se o nome for longo. */}
      <div className="relative w-full">
        <p
          ref={nameSizerRef}
          aria-hidden="true"
          className="invisible absolute inset-x-0 top-0 mx-auto w-full max-w-xs truncate whitespace-nowrap font-bold tracking-wide"
          style={nameStyle}
        >
          {speakerName}
        </p>
        <p
          className="truncate font-display font-bold tracking-wide text-primary"
          style={nameStyle}
        >
          {speakerName}
        </p>
      </div>

      {hasChoices ? (
        /* -------------------------------------------------------------------
           MODO ESCOLHA: nome (acima) + fala + todas as opções, TODOS visíveis.
           A área usa a altura real disponível do painel (`CHOICE_AREA_HEIGHT`);
           o auto-fit mede o bloco inteiro (fala + opções + gaps + paddings) e
           reduz a fonte até caber, sem corte, sem rolagem e sem crescer a barra.
        -------------------------------------------------------------------- */
        <div
          ref={choicesContainerRef}
          className="relative flex w-full items-center justify-center"
          style={{ height: DIALOGUE_BOX.CHOICE_AREA_HEIGHT }}
        >
          {/* Sizer invisível: replica fala + opções (estrelas + coluna) para medir
              o bloco real e achar a fonte que cabe na altura disponível. */}
          <div
            aria-hidden="true"
            className="invisible absolute inset-0 mx-auto flex w-full max-w-2xl items-center justify-center gap-6 md:gap-10"
            style={choiceFontStyle}
          >
            <span className="h-6 w-5 shrink-0 md:h-7 md:w-6" />
            <div
              ref={choicesSizerRef}
              className="flex min-w-0 flex-1 flex-col items-center"
              style={choiceGapStyle}
            >
              <p className="w-full" style={{ lineHeight: DIALOGUE_BOX.LINE_HEIGHT }}>
                {displayText}
              </p>
              {choices!.map((choice) => (
                <div
                  key={`sizer-${choice.id}`}
                  className={OPTION_CLASS}
                  style={optionPadStyle}
                >
                  {choice.label}
                </div>
              ))}
            </div>
            <span className="h-6 w-8 shrink-0 md:h-7 md:w-9" />
          </div>

          {/* Visível: estrela + (fala + opções) + estrela. */}
          <motion.div
            key={`choices-${choicesKey}`}
            className="pointer-events-auto mx-auto flex w-full max-w-2xl items-center justify-center gap-6 md:gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <ThemeIcon
              src="/assets/icons/icon-star-1.svg"
              className="h-6 w-5 shrink-0 md:h-7 md:w-6"
            />

            <div
              className="flex min-w-0 flex-1 flex-col items-center"
              style={choiceGapStyle}
            >
              {/* Fala visível acima das opções (não-interativa). */}
              <p
                className="pointer-events-none w-full text-foreground"
                style={choiceTextStyle}
              >
                {displayText}
              </p>

              {choices!.map((choice, index) => (
                <motion.div
                  key={choice.id}
                  className="w-full"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                >
                  <ChoiceButton
                    label={choice.label}
                    onPress={choice.onSelect}
                    fontPx={choiceFontPx}
                  />
                </motion.div>
              ))}
            </div>

            <ThemeIcon
              src="/assets/icons/icon-star-2.svg"
              className="h-6 w-8 shrink-0 md:h-7 md:w-9"
            />
          </motion.div>
        </div>
      ) : (
        /* -------------------------------------------------------------------
           MODO FALA: área de altura fixa, texto centralizado (auto-fit). Igual
           ao comportamento anterior. Abaixo, a dica de avanço em slot fixo.
        -------------------------------------------------------------------- */
        <>
          <div
            ref={containerRef}
            className="relative flex w-full items-center justify-center overflow-hidden"
            style={{ height: `${DIALOGUE_BOX.TEXT_HEIGHT_PX}px` }}
          >
            <p
              ref={sizerRef}
              aria-hidden="true"
              className="invisible absolute inset-x-0 top-0 w-full"
              style={bodyStyle}
            >
              {displayText}
            </p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key="dialogue-text"
                className="text-foreground"
                style={bodyStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {text}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Dica de avanço: slot de altura FIXA (só muda opacidade). */}
          <div
            className="flex h-6 items-end justify-center gap-1"
            aria-hidden="true"
          >
            <motion.div
              className="flex items-end gap-1"
              animate={{ opacity: showContinueHint ? 1 : 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <ThemeIcon
                src="/assets/icons/icon-star-1.svg"
                className="h-4 w-3.5"
              />
              <ThemeIcon
                src="/assets/icons/icon-star-2.svg"
                className="h-5 w-6"
              />
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}
