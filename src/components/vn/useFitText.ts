import { useLayoutEffect, useRef, useState } from "react";
import { DIALOGUE_BOX } from "../../config/dialogueBox";

interface FitOptions {
  maxFontPx: number;
  minFontPx: number;
  stepPx: number;
  /**
   * Como medir o "caber":
   *  - "container-height": o conteúdo (sizer) deve caber na ALTURA REAL do
   *    contêiner (`containerRef.clientHeight`). Usado quando a área tem altura
   *    fixa via CSS (px/rem/vh) — mede o layout real em qualquer resolução.
   *  - "self-width": o conteúdo deve caber em 1 linha na própria largura
   *    (`sizer.scrollWidth <= sizer.clientWidth`). Usado para o nome.
   */
  mode: "container-height" | "self-width";
  /** Rótulo para o aviso de console quando não couber nem no mínimo. */
  warnLabel?: string;
}

/**
 * Calcula o MAIOR tamanho de fonte (entre `minFontPx` e `maxFontPx`, em passos
 * de `stepPx`) que faz o conteúdo caber num espaço fixo, sem crescer a caixa.
 *
 * Mede o LAYOUT REAL de um "sizer" invisível que replica o conteúdo visível
 * (mesma largura, espaçamentos e preenchimento em unidades `em`, para escalarem
 * junto com a fonte). Assim o cálculo considera quebras de linha reais, todas as
 * opções, gaps e paddings — não uma linha isolada. É feito antes de exibir
 * (`useLayoutEffect`), recalcula no resize e quando o conteúdo muda (`contentKey`).
 *
 * Se nem no mínimo couber, mantém o mínimo e registra um aviso no console.
 *
 * @param contentKey Chave que muda quando o conteúdo muda (dispara recálculo).
 * @param options    Limites de fonte, passo e modo de medição.
 */
export function useFitText<
  S extends HTMLElement = HTMLParagraphElement,
  C extends HTMLElement = HTMLDivElement,
>(contentKey: string, options: FitOptions) {
  const sizerRef = useRef<S>(null);
  const containerRef = useRef<C>(null);
  const [fontPx, setFontPx] = useState(options.maxFontPx);

  useLayoutEffect(() => {
    const sizer = sizerRef.current;
    if (!sizer) return;

    const overflows = (): boolean => {
      if (options.mode === "self-width") {
        return sizer.scrollWidth > sizer.clientWidth;
      }
      // container-height: compara a altura do conteúdo com a altura REAL
      // disponível do contêiner (resolução/CSS atuais).
      const available = containerRef.current?.clientHeight ?? 0;
      return available > 0 && sizer.scrollHeight > available;
    };

    const compute = () => {
      let size = options.maxFontPx;
      sizer.style.fontSize = `${size}px`;

      while (size > options.minFontPx && overflows()) {
        size = Math.max(options.minFontPx, size - options.stepPx);
        sizer.style.fontSize = `${size}px`;
      }

      if (size <= options.minFontPx && overflows()) {
        console.warn(
          `[DialogueBox] Conteúdo não coube no tamanho mínimo (${options.minFontPx}px)` +
            (options.warnLabel ? ` em "${options.warnLabel}"` : "") +
            `: "${contentKey}"`,
        );
      }

      setFontPx(size);
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [
    contentKey,
    options.mode,
    options.maxFontPx,
    options.minFontPx,
    options.stepPx,
    options.warnLabel,
  ]);

  return { sizerRef, containerRef, fontPx };
}

/** Auto-fit do CORPO do texto do diálogo (cabe na altura real da área). */
export function useFitDialogueText(measureText: string) {
  return useFitText<HTMLParagraphElement, HTMLDivElement>(measureText, {
    maxFontPx: DIALOGUE_BOX.FONT_MAX_PX,
    minFontPx: DIALOGUE_BOX.FONT_MIN_PX,
    stepPx: DIALOGUE_BOX.FONT_STEP_PX,
    mode: "container-height",
    warnLabel: "corpo do diálogo",
  });
}

/** Auto-fit do NOME do personagem (cabe em 1 linha na própria largura). */
export function useFitSpeakerName(name: string) {
  return useFitText<HTMLParagraphElement, HTMLDivElement>(name, {
    maxFontPx: DIALOGUE_BOX.NAME_FONT_MAX_PX,
    minFontPx: DIALOGUE_BOX.NAME_FONT_MIN_PX,
    stepPx: DIALOGUE_BOX.FONT_STEP_PX,
    mode: "self-width",
    warnLabel: "nome do personagem",
  });
}

/**
 * Auto-fit do BLOCO de escolha inteiro (fala + todas as opções, com gaps e
 * paddings), medindo contra a altura real da área de escolha. Mesmo tamanho de
 * fonte para todas as opções. `contentKey` muda ao trocar de escolha.
 */
export function useFitChoices(contentKey: string) {
  return useFitText<HTMLDivElement, HTMLDivElement>(contentKey, {
    maxFontPx: DIALOGUE_BOX.CHOICE_FONT_MAX_PX,
    minFontPx: DIALOGUE_BOX.CHOICE_FONT_MIN_PX,
    stepPx: DIALOGUE_BOX.FONT_STEP_PX,
    mode: "container-height",
    warnLabel: "opções de escolha",
  });
}
