import { useState } from "react";
import { motion } from "framer-motion";
import type { CharacterSide } from "../../types/novel";

interface CharacterSpriteProps {
  /** Caminho do sprite. null força o placeholder (silhueta). */
  src: string | null;
  /** Nome exibido no placeholder e no alt. */
  name: string;
  side: CharacterSide;
  /** Destaca o personagem que está falando (os demais ficam esmaecidos). */
  active?: boolean;
}

/**
 * Sprite de personagem com posicionamento consistente e fallback resiliente.
 *
 * Alinhamento garantido para todas as cenas:
 *  - mesma linha de base (base do sprite ancorada embaixo via `items-end`);
 *  - mesma escala proporcional (altura fixa relativa à viewport);
 *  - mesma margem lateral (classes por `side`).
 *
 * O `side` vem da configuração central de personagens (`src/config/characters.ts`),
 * nunca de valores soltos nos componentes.
 */
const SIDE_CLASSES: Record<CharacterSide, string> = {
  left: "left-0 justify-start pl-[4vw] md:pl-[6vw]",
  right: "right-0 justify-end pr-[4vw] md:pr-[6vw]",
};

export function CharacterSprite({
  src,
  name,
  side,
  active = true,
}: CharacterSpriteProps) {
  // O estado de erro é resetado na troca de sprite pela `key` no componente pai.
  const [failed, setFailed] = useState(false);

  const showImage = src !== null && !failed;

  return (
    <motion.div
      className={`pointer-events-none absolute bottom-0 top-0 z-10 flex items-end ${SIDE_CLASSES[side]}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: active ? 1 : 0.45, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          className="h-[min(78vh,760px)] w-auto max-w-none object-contain object-bottom"
          draggable={false}
          onError={() => setFailed(true)}
        />
      ) : (
        // Placeholder: silhueta com o nome do asset visível.
        <div
          className="flex h-[min(78vh,760px)] w-40 items-end justify-center md:w-56"
          aria-hidden="true"
        >
          <div className="flex h-[55vh] w-full items-center justify-center rounded-sm border border-primary/30 bg-content1/50">
            <span className="px-2 text-center font-display text-xs uppercase tracking-widest text-primary">
              {name}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
