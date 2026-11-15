import { motion, useReducedMotion } from "framer-motion";
import { ITEM_REWARD } from "../../config/dialogueBox";
import type { GameItem } from "../../data/items";
import { ItemIcon } from "./ItemIcon";

interface ItemRewardProps {
  item: GameItem;
}

/** Raios alternando longos e curtos, num viewBox de -100 a 100. */
const RAYS = Array.from({ length: ITEM_REWARD.RAY_COUNT }, (_, index) => {
  const angle = (index / ITEM_REWARD.RAY_COUNT) * Math.PI * 2;
  const long = index % 2 === 0;
  const inner = 58;
  const outer = long ? 96 : 80;
  return {
    x1: Math.cos(angle) * inner,
    y1: Math.sin(angle) * inner,
    x2: Math.cos(angle) * outer,
    y2: Math.sin(angle) * outer,
    long,
  };
});

/**
 * Destaque do ITEM OBTIDO: ícone do item no centro do painel superior, entre o
 * protagonista (esquerda) e o equipamento (direita), com raios de brilho que
 * pulsam e giram devagar. Reutilizável para todos os itens: só recebe o item do
 * catálogo (`src/data/items.ts`). Posição e tamanhos vêm de `ITEM_REWARD`.
 *
 * Fica numa faixa entre a faixa preta superior e o topo da barra de diálogo,
 * então nunca cobre a barra. Fica À FRENTE dos sprites (abaixo da barra): no
 * estágio do LRV o sprite das três buggies ocupa o centro da cena, e atrás dele
 * o item ficaria escondido. Com "reduzir movimento" ativo, os raios ficam parados.
 */
export function ItemReward({ item }: ItemRewardProps) {
  const reduceMotion = useReducedMotion();
  const raysSize = `calc(${ITEM_REWARD.ICON_SIZE} * ${ITEM_REWARD.RAYS_SCALE})`;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-[15] flex items-center justify-center"
      style={{ top: ITEM_REWARD.TOP, bottom: ITEM_REWARD.BOTTOM }}
      aria-live="polite"
    >
      <motion.div
        key={item.id}
        className="relative flex items-center justify-center"
        style={{ width: raysSize, height: raysSize }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Brilho suave atrás do item. */}
        <div
          className="absolute inset-[22%] rounded-full bg-primary/25 blur-2xl"
          aria-hidden="true"
        />

        {/* Raios: pulsam (opacidade/escala) e giram devagar. */}
        <motion.svg
          viewBox="-100 -100 200 200"
          className="absolute inset-0 size-full text-primary"
          aria-hidden="true"
          animate={
            reduceMotion
              ? { opacity: 0.7 }
              : { opacity: [0.35, 0.85, 0.35], scale: [0.96, 1.04, 0.96] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: ITEM_REWARD.PULSE_S,
                  ease: "easeInOut",
                  repeat: Infinity,
                }
          }
        >
          <motion.g
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: ITEM_REWARD.ROTATE_S,
                    ease: "linear",
                    repeat: Infinity,
                  }
            }
          >
            {RAYS.map((ray, index) => (
              <line
                key={index}
                x1={ray.x1}
                y1={ray.y1}
                x2={ray.x2}
                y2={ray.y2}
                stroke="currentColor"
                strokeWidth={ray.long ? 4 : 3}
                strokeLinecap="round"
              />
            ))}
          </motion.g>
        </motion.svg>

        <ItemIcon
          src={item.iconAsset}
          name={item.name}
          className="relative"
          style={{ width: ITEM_REWARD.ICON_SIZE, height: ITEM_REWARD.ICON_SIZE }}
        />
      </motion.div>
    </div>
  );
}
