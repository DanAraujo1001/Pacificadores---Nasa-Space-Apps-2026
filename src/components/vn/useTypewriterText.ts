import { useEffect, useRef, useState } from "react";

const TYPEWRITER_MS = 28;

export function useTypewriterText(fullText: string, lineKey: string | number) {
  const [visibleText, setVisibleText] = useState("");
  const [textComplete, setTextComplete] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setVisibleText("");
    setTextComplete(false);

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