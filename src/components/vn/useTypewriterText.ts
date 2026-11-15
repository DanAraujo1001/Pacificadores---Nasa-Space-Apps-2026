import { useEffect, useRef, useState } from "react";

const TYPEWRITER_MS = 28;

/**
 * Efeito máquina de escrever para uma fala.
 *
 * Correção importante (falas "engolidas"): o reset do texto ao trocar de fala é
 * feito DURANTE O RENDER, com o padrão oficial do React de "ajustar estado
 * quando uma prop muda" (guardar a chave anterior em ESTADO e comparar no
 * render). Se o reset ficasse só num efeito, o primeiro frame da nova fala
 * ainda carregava o estado da fala anterior (`textComplete = true`,
 * `visibleText` = texto antigo). Um clique nessa janela era interpretado como
 * "a fala já terminou", e o `advance` pulava a fala inteira. Resetando no
 * render, a fala nova nunca aparece como concluída antes de ser digitada.
 *
 * Ref.: https://react.dev/reference/react/useState#storing-information-from-previous-renders
 */
export function useTypewriterText(fullText: string, lineKey: string | number) {
  const [visibleText, setVisibleText] = useState("");
  const [textComplete, setTextComplete] = useState(false);
  const [renderedKey, setRenderedKey] = useState<string | number>(lineKey);
  const timerRef = useRef<number | null>(null);

  // Reset SÍNCRONO ao trocar de fala (durante o render). Garante que a nova
  // fala comece vazia e "não concluída" no MESMO frame, sem janela de estado
  // obsoleto em que um clique pularia a fala. Fala vazia já entra concluída.
  if (renderedKey !== lineKey) {
    setRenderedKey(lineKey);
    setVisibleText("");
    setTextComplete(fullText.length === 0);
  }

  useEffect(() => {
    // Fala vazia: nada a digitar (já marcada concluída no render).
    if (fullText.length === 0) return;

    let index = 0;
    timerRef.current = window.setInterval(() => {
      index += 1;
      setVisibleText(fullText.slice(0, index));
      if (index >= fullText.length) {
        if (timerRef.current !== null) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setTextComplete(true);
      }
    }, TYPEWRITER_MS);

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [lineKey, fullText]);

  const skipToFullText = () => {
    if (textComplete) return false;

    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setVisibleText(fullText);
    setTextComplete(true);
    return true;
  };

  return { visibleText, textComplete, skipToFullText };
}
