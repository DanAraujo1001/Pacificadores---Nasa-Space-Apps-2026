import { useState, type CSSProperties } from "react";

interface ItemIconProps {
  /** Caminho do ícone (config central `ITEM_ICON_ASSETS`). */
  src: string;
  /** Nome do item: alt da imagem e texto do placeholder. */
  name: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Ícone de item com fallback resiliente. Enquanto o arquivo do ícone não
 * existir em `public/assets/items/`, mostra um placeholder neutro com o nome do
 * item; quando o arquivo for adicionado, a imagem aparece sozinha. Usado pela
 * tela de item obtido e pelo Memories.
 */
export function ItemIcon({ src, name, className = "", style }: ItemIconProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = failedSrc === src;

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center rounded-sm border border-primary/60 bg-[#0E0C0F]/85 p-2 ${className}`}
        style={style}
        aria-label={name}
        role="img"
      >
        <span className="text-center font-display text-xs font-bold uppercase leading-tight tracking-wide text-primary">
          {name}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className={`object-contain ${className}`}
      style={style}
      draggable={false}
      onError={() => setFailedSrc(src)}
    />
  );
}
