import { useLayoutEffect, useRef, useState } from "react";
import { DIALOGUE_BOX } from "../../config/dialogueBox";
import { withProtagonistName } from "../../config/characters";
import type { ScriptLine } from "../../types/novel";

interface SplitResult {
  lines: ScriptLine[];
  midSentenceSplitIds: string[];
}

/**
 * Divide falas marcadas como DESCRIÇÃO DE ITEM (`isItemDescription`) em várias
 * falas consecutivas, por MEDIÇÃO REAL do layout, para que cada parte caiba na
 * área de texto da barra NA FONTE PADRÃO (`FONT_MAX_PX`) — sem reduzir a fonte,
 * sem rolagem e sem cortar.
 *
 * Regras:
 *  - Divide apenas em FIM DE FRASE (`.`, `?`, `!`).
 *  - Só divide no MEIO de uma frase se uma única frase, sozinha, não couber;
 *    nesse caso quebra no ponto mais natural (após vírgula/`;`) e sinaliza em
 *    `midSentenceSplitIds`.
 *  - Não altera o texto (palavras, ordem e pontuação): só decide onde separar.
 *  - Determinístico (mesma descrição → mesma divisão), calculado antes de exibir
 *    (`useLayoutEffect`), e recalculado no resize da janela.
 *  - Partes herdam falante/cenário; `entersCharacterId` fica só na 1ª parte e
 *    `exitsCharacterId` só na última (sem quebra de continuidade).
 *
 * A medição usa um elemento invisível com o MESMO estilo do texto da fala
 * (largura, fonte, entrelinha), comparando `scrollHeight` com a altura fixa.
 */
export function useSplitItemLines(
  lines: ScriptLine[],
  playerName: string,
): SplitResult {
  const measurerRef = useRef<HTMLParagraphElement | null>(null);
  // Começa com as falas originais; o split real é aplicado após medir no layout.
  const [result, setResult] = useState<SplitResult>({
    lines,
    midSentenceSplitIds: [],
  });

  useLayoutEffect(() => {
    if (typeof document === "undefined") return;
    if (!lines.some((l) => l.isItemDescription)) {
      // Sincroniza o resultado medido com o estado (medição real exige setState
      // no efeito de layout; mesmo padrão de `useTypewriterText`).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResult({ lines, midSentenceSplitIds: [] });
      return;
    }

    if (!measurerRef.current) {
      const el = document.createElement("p");
      el.setAttribute("aria-hidden", "true");
      el.style.position = "fixed";
      el.style.left = "-99999px";
      el.style.top = "0";
      el.style.visibility = "hidden";
      el.style.whiteSpace = "normal";
      el.style.fontFamily = '"Inter", sans-serif';
      el.style.fontSize = `${DIALOGUE_BOX.FONT_MAX_PX}px`;
      el.style.lineHeight = `${DIALOGUE_BOX.LINE_HEIGHT}`;
      // Largura real da área de texto: largura da barra menos o preenchimento
      // horizontal da caixa (px-4 = 2rem total).
      el.style.width = `calc(min(${DIALOGUE_BOX.WIDTH}, 100vw) - 2rem)`;
      el.style.maxWidth = DIALOGUE_BOX.WIDTH;
      document.body.appendChild(el);
      measurerRef.current = el;
    }
    const measurer = measurerRef.current;

    const maxHeight = DIALOGUE_BOX.TEXT_HEIGHT_PX;
    const fits = (text: string): boolean => {
      measurer.textContent = text;
      return measurer.scrollHeight <= maxHeight;
    };

    const compute = () => {
      const midSentenceSplitIds: string[] = [];
      const out: ScriptLine[] = [];

      for (const line of lines) {
        if (!line.isItemDescription) {
          out.push(line);
          continue;
        }
        const fullText = withProtagonistName(line.text, playerName);
        if (fits(fullText)) {
          out.push(line);
          continue;
        }
        const parts = splitToFit(fullText, fits, line.id, midSentenceSplitIds);
        parts.forEach((partText, index) => {
          out.push({
            id: `${line.id}-part-${index + 1}`,
            speakerId: line.speakerId,
            text: partText,
            entersCharacterId:
              index === 0 ? line.entersCharacterId : undefined,
            exitsCharacterId:
              index === parts.length - 1 ? line.exitsCharacterId : undefined,
            isItemDescription: true,
          });
        });
      }
      setResult({ lines: out, midSentenceSplitIds });
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [lines, playerName]);

  useLayoutEffect(() => {
    return () => {
      measurerRef.current?.remove();
      measurerRef.current = null;
    };
  }, []);

  return result;
}

/** Separa o texto em frases, preservando a pontuação final de cada uma. */
function toSentences(text: string): string[] {
  const matches = text.match(/[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$/g);
  return (matches ?? [text]).map((s) => s.trim()).filter(Boolean);
}

/**
 * Divide um texto em partes que cabem (via `fits`), preferindo fronteiras de
 * frase. Se uma frase isolada não couber, quebra-a em vírgula/`;` (ponto mais
 * natural) e registra o id em `midSentenceSplitIds`. Greedy e determinístico.
 */
function splitToFit(
  text: string,
  fits: (t: string) => boolean,
  lineId: string,
  midSentenceSplitIds: string[],
): string[] {
  const sentences = toSentences(text);
  const parts: string[] = [];
  let current = "";

  const flush = () => {
    if (current.trim()) parts.push(current.trim());
    current = "";
  };

  for (const sentence of sentences) {
    const candidate = current ? `${current} ${sentence}` : sentence;
    if (fits(candidate)) {
      current = candidate;
      continue;
    }
    flush();

    if (fits(sentence)) {
      current = sentence;
      continue;
    }

    // A frase sozinha não cabe: quebra no meio (vírgula/`;`) e sinaliza.
    if (!midSentenceSplitIds.includes(lineId)) midSentenceSplitIds.push(lineId);
    for (const chunk of splitSentence(sentence, fits)) {
      parts.push(chunk);
    }
  }
  flush();

  return parts.length ? parts : [text];
}

/**
 * Quebra uma frase que não cabe em pedaços, preferindo vírgula/`;` e, em último
 * caso, espaço. Mantém TODAS as palavras e pontuação, só insere a separação.
 */
function splitSentence(
  sentence: string,
  fits: (t: string) => boolean,
): string[] {
  const clauses = sentence
    .split(/(?<=[,;])\s+/)
    .map((c) => c.trim())
    .filter(Boolean);

  const pieces: string[] = [];
  let current = "";
  for (const clause of clauses) {
    const candidate = current ? `${current} ${clause}` : clause;
    if (fits(candidate)) {
      current = candidate;
    } else {
      if (current) pieces.push(current);
      if (!fits(clause)) {
        pieces.push(...splitByWords(clause, fits));
        current = "";
      } else {
        current = clause;
      }
    }
  }
  if (current) pieces.push(current);
  return pieces;
}

/** Último recurso: quebra por palavras mantendo o texto intacto. */
function splitByWords(text: string, fits: (t: string) => boolean): string[] {
  const words = text.split(/\s+/);
  const pieces: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (fits(candidate)) {
      current = candidate;
    } else {
      if (current) pieces.push(current);
      current = word;
    }
  }
  if (current) pieces.push(current);
  return pieces;
}
