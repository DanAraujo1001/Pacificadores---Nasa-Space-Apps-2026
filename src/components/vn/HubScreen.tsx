import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
// Extensão explícita: os `.js` emitidos ao lado do fonte faziam o Vite
// carregar outra store, e a cena de equipamento não abria.
import { useGameStore } from "../../store/useGameStore.ts";
import {
  DESTINATIONS,
  getDestination,
  getEquipment,
} from "../../config/destinations.ts";
import { BACKGROUND_ASSETS } from "../../config/sceneAssets.ts";
import type {
  DestinationConfig,
  DestinationId,
  EquipmentHotspot,
  StageId,
} from "../../types/novel";
import { EquipmentMarker } from "./EquipmentMarker.tsx";
import { HomeButton } from "./HomeButton";
import { SceneBackground } from "./SceneBackground";

const HUB_FADE_S = 0.45;

/** Acentos de Lua e Marte (os mesmos do tema de cada mundo). */
const PLANET_ACCENT: Record<DestinationId, string> = {
  moon: "#6FCEC6",
  mars: "#CD4116",
};

type HubVeilPhase = "cover" | "reveal";

type HubTransition = { type: "to"; id: DestinationId } | { type: "back" };

interface HubScreenProps {
  /** true quando a sub-fase é a seleção de equipamento do destino escolhido. */
  equipmentView: boolean;
  onSelectDestination: (destination: DestinationId) => void;
  onSelectStage: (stage: StageId) => void;
  onBackToDestinations: () => void;
}

/**
 * Área de seleção na nave (hub do Ato 1). Tela de retorno após cada estágio.
 *
 * - Visão de destino: cabine com Lua e Marte nas janelas.
 * - Visão de equipamento: cena do planeta com os ícones no solo.
 *
 * Estágios concluídos aparecem marcados e ficam bloqueados (ver `EquipmentMarker`
 * + `completedStageIds` no store). A lista de destinos/equipamentos vem da
 * config central (`src/config/destinations.ts`), sem nada hardcoded aqui.
 */
export function HubScreen({
  equipmentView,
  onSelectDestination,
  onSelectStage,
  onBackToDestinations,
}: HubScreenProps) {
  const setWorld = useGameStore((state) => state.setWorld);
  const selectedDestination = useGameStore(
    (state) => state.selectedDestination,
  );
  const completedStageIds = useGameStore((state) => state.completedStageIds);
  const [veil, setVeil] = useState<HubVeilPhase | null>(null);
  const pendingTransition = useRef<HubTransition | null>(null);

  const beginTransition = (transition: HubTransition) => {
    if (veil) return;
    pendingTransition.current = transition;
    setVeil("cover");
  };

  const finishVeilStep = () => {
    if (veil === "cover") {
      const pending = pendingTransition.current;
      if (!pending) return;
      pendingTransition.current = null;
      if (pending.type === "to") onSelectDestination(pending.id);
      else onBackToDestinations();
      setVeil("reveal");
      return;
    }
    if (veil === "reveal") setVeil(null);
  };

  // O tema reage ao destino escolhido (Lua/Marte); na visão de destino, nave.
  useEffect(() => {
    if (equipmentView && selectedDestination) {
      setWorld(selectedDestination);
    } else {
      setWorld("ship");
    }
  }, [equipmentView, selectedDestination, setWorld]);

  const destination =
    equipmentView && selectedDestination
      ? getDestination(selectedDestination)
      : undefined;

  return (
    <>
      {destination ? (
        <EquipmentScene
          destination={destination}
          completedStageIds={completedStageIds}
          onSelectStage={onSelectStage}
          onBackToDestinations={() => beginTransition({ type: "back" })}
        />
      ) : (
        <DestinationChoice
          completedStageIds={completedStageIds}
          onSelect={(id) => beginTransition({ type: "to", id })}
        />
      )}
      {veil ? (
        <motion.div
          className="pointer-events-auto fixed inset-0 z-[80] bg-[#0E0C0F]"
          initial={{ opacity: 0 }}
          animate={{ opacity: veil === "cover" ? 1 : 0 }}
          transition={{ duration: HUB_FADE_S, ease: "easeInOut" }}
          onAnimationComplete={finishVeilStep}
          aria-hidden="true"
        />
      ) : null}
    </>
  );
}

interface DestinationChoiceProps {
  completedStageIds: StageId[];
  onSelect: (id: DestinationId) => void;
}

function DestinationChoice({
  completedStageIds,
  onSelect,
}: DestinationChoiceProps) {
  const [backgroundFailed, setBackgroundFailed] = useState(false);
  const [hoveredId, setHoveredId] = useState<DestinationId | null>(null);
  const hovered = DESTINATIONS.find((dest) => dest.id === hoveredId);
  const caption = hovered ? hovered.label : "Select a planet";
  const captionColor = hovered ? PLANET_ACCENT[hovered.id] : undefined;

  return (
    <section className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-[#0E0C0F] text-foreground">
      <h1 className="sr-only">Choose a destination</h1>
      <div className="flex w-full translate-y-6 flex-col items-center gap-3">
        <div className="relative aspect-[1519/569] w-full">
          {backgroundFailed ? (
            <div
              className="absolute inset-0 flex items-center justify-center bg-[#1A161D]"
              aria-hidden="true"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-primary/50">
                Choose a destination
              </span>
            </div>
          ) : (
            <img
              src={BACKGROUND_ASSETS.chooseDestination}
              alt=""
              className="absolute inset-0 size-full object-fill"
              draggable={false}
              onError={() => setBackgroundFailed(true)}
            />
          )}
          {DESTINATIONS.map((dest) => {
            const total = dest.stageIds.length;
            const done = dest.stageIds.filter((id) =>
              completedStageIds.includes(id),
            ).length;
            return (
              <PlanetMarker
                key={dest.id}
                destinationId={dest.id}
                label={dest.label}
                exploredLabel={`${done}/${total} explored`}
                iconSrc={dest.iconAsset}
                hotspot={dest.hotspot}
                iconWidth={dest.iconWidth}
                iconHeight={dest.iconHeight}
                onSelect={() => onSelect(dest.id)}
                onHoverChange={(active) =>
                  setHoveredId((current) =>
                    active ? dest.id : current === dest.id ? null : current,
                  )
                }
              />
            );
          })}
        </div>
        <p
          className="font-mono text-base uppercase tracking-widest text-primary"
          style={captionColor ? { color: captionColor } : undefined}
          aria-live="polite"
        >
          {caption}
        </p>
      </div>
    </section>
  );
}

interface PlanetMarkerProps {
  destinationId: DestinationId;
  label: string;
  exploredLabel: string;
  iconSrc: string;
  hotspot: {
    desktop: EquipmentHotspot;
    narrow: EquipmentHotspot;
  };
  iconWidth: {
    desktop: string;
    narrow: string;
  };
  iconHeight: {
    desktop: string;
    narrow: string;
  };
  onSelect: () => void;
  onHoverChange: (active: boolean) => void;
}

function PlanetMarker({
  destinationId,
  label,
  exploredLabel,
  iconSrc,
  hotspot,
  iconWidth,
  iconHeight,
  onSelect,
  onHoverChange,
}: PlanetMarkerProps) {
  const [iconFailed, setIconFailed] = useState(false);
  const position = {
    "--hotspot-x": hotspot.narrow.left,
    "--hotspot-y": hotspot.narrow.top,
    "--hotspot-x-md": hotspot.desktop.left,
    "--hotspot-y-md": hotspot.desktop.top,
    "--planet-w": iconWidth.narrow,
    "--planet-w-md": iconWidth.desktop,
    "--planet-h": iconHeight.narrow,
    "--planet-h-md": iconHeight.desktop,
  } as CSSProperties;

  return (
    <button
      type="button"
      onClick={onSelect}
      onPointerEnter={() => onHoverChange(true)}
      onPointerLeave={() => onHoverChange(false)}
      onFocus={() => onHoverChange(true)}
      onBlur={() => onHoverChange(false)}
      aria-label={`${label}, ${exploredLabel}`}
      style={position}
      className="group absolute left-[var(--hotspot-x)] top-[var(--hotspot-y)] z-20 h-[var(--planet-h)] w-[var(--planet-w)] cursor-pointer border-0 bg-transparent p-0 md:left-[var(--hotspot-x-md)] md:top-[var(--hotspot-y-md)] md:h-[var(--planet-h-md)] md:w-[var(--planet-w-md)]"
    >
      {iconFailed ? (
        <span className="flex min-h-16 items-center justify-center rounded-sm border border-primary/40 bg-background/70 px-2 py-3 text-center font-mono text-[10px] uppercase tracking-widest text-primary">
          {label}
        </span>
      ) : (
        <span className="relative block size-full origin-center transition-transform duration-200 group-hover:scale-105 group-focus-visible:scale-105">
          <PlanetGlow destinationId={destinationId} iconSrc={iconSrc} />
          <img
            src={iconSrc}
            alt=""
            className="relative size-full object-contain"
            draggable={false}
            onError={() => setIconFailed(true)}
          />
        </span>
      )}
    </button>
  );
}

function PlanetGlow({
  destinationId,
  iconSrc,
}: {
  destinationId: DestinationId;
  iconSrc: string;
}) {
  const accent = PLANET_ACCENT[destinationId];
  // Lua fica um pouco mais contida; Marte usa o mesmo halo, em volta do disco todo.
  const spread =
    destinationId === "moon" ? "-inset-[10%] blur-md" : "-inset-[14%] blur-lg";

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 ${spread}`}
    >
      <span
        className="block size-full"
        style={{
          background: accent,
          WebkitMaskImage: `url("${iconSrc}")`,
          maskImage: `url("${iconSrc}")`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    </span>
  );
}

interface EquipmentSceneProps {
  destination: DestinationConfig;
  completedStageIds: StageId[];
  onSelectStage: (stage: StageId) => void;
  onBackToDestinations: () => void;
}

function EquipmentScene({
  destination,
  completedStageIds,
  onSelectStage,
  onBackToDestinations,
}: EquipmentSceneProps) {
  const total = destination.stageIds.length;
  const done = destination.stageIds.filter((id) =>
    completedStageIds.includes(id),
  ).length;

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0E0C0F] text-foreground">
      <div className="flex shrink-0 items-center gap-4 px-6 pb-4 pt-6 md:gap-5 md:px-8">
        <HomeButton inline />
        <div className="flex flex-col">
          <p className="font-display text-xl font-bold uppercase tracking-wide text-primary">
            {destination.label}
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-primary/80">
            {done}/{total} explored
          </p>
        </div>
      </div>

      <div className="relative z-0 h-[min(70vh,780px)] w-full shrink-0 overflow-hidden">
        <SceneBackground
          key={destination.backgroundAsset}
          src={destination.backgroundAsset}
          placeholderLabel={destination.backgroundPlaceholderLabel}
        />

        {destination.stageIds.map((stageId) => {
          const equipment = getEquipment(stageId);
          return (
            <EquipmentMarker
              key={stageId}
              label={equipment.label}
              iconSrc={equipment.iconAsset}
              hotspot={equipment.hotspot}
              completed={completedStageIds.includes(stageId)}
              onSelect={() => onSelectStage(stageId)}
            />
          );
        })}
      </div>

      <div className="relative z-20 flex flex-1 items-center justify-center bg-[#0E0C0F] px-4">
        <Button
          variant="ghost"
          size="lg"
          onPress={onBackToDestinations}
          className="scene-link cursor-pointer rounded-sm border-0 bg-transparent px-6 py-2 font-mono text-base uppercase tracking-widest text-primary shadow-none hover:bg-transparent data-[hovered=true]:bg-transparent"
        >
          ← Destinations
        </Button>
      </div>
    </section>
  );
}
