import { useState } from "react";

interface SceneBackgroundProps {
  /** Caminho do asset de fundo. null força o placeholder. */
  src: string | null;
  /** Rótulo mostrado no placeholder quando o asset não existe. */
  placeholderLabel: string;
  /**
   * Largura da imagem em relação ao quadro, quando o arquivo tem margem
   * transparente e a arte precisa encostar nas laterais da tela.
   */
  bleedWidth?: string;
  /** Desloca a arte no eixo vertical. Negativo sobe. Ex.: "-6vh". */
  bleedOffsetY?: string;
}

/**
 * Fundo de cena com fallback resiliente: se o arquivo não existir (ou `src`
 * for null), mostra um placeholder sólido com o nome do asset visível, sem
 * quebrar a tela. Mesmo padrão usado em `GameScreen`, agora centralizado.
 */
export function SceneBackground({
  src,
  placeholderLabel,
  bleedWidth,
  bleedOffsetY = "0px",
}: SceneBackgroundProps) {
  // O estado de erro é resetado na troca de asset pela `key` no componente pai.
  const [failed, setFailed] = useState(false);

  const showImage = src !== null && !failed;

  if (showImage) {
    return (
      <img
        src={src}
        alt=""
        className={
          bleedWidth
            ? "absolute top-1/2 left-1/2 h-auto"
            : "absolute inset-0 size-full object-cover"
        }
        style={
          bleedWidth
            ? {
                width: bleedWidth,
                maxWidth: "none",
                height: "auto",
                transform: `translate(-50%, calc(-50% + ${bleedOffsetY}))`,
              }
            : undefined
        }
        draggable={false}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-[#1A161D]"
      aria-hidden="true"
    >
      <span className="font-mono text-xs uppercase tracking-widest text-primary/50">
        {placeholderLabel}
      </span>
    </div>
  );
}
