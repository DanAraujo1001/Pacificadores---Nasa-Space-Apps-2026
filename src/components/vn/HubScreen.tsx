import { useEffect } from "react";
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
import type { DestinationConfig, DestinationId, StageId } from "../../types/novel";
import { EquipmentMarker } from "./EquipmentMarker.tsx";
import { HomeButton } from "./HomeButton";
import { SceneBackground } from "./SceneBackground";

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
 * - Visão de destino: escolher Lua ou Marte.
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

  if (destination) {
    return (
      <EquipmentScene
        destination={destination}
        completedStageIds={completedStageIds}
        onSelectStage={onSelectStage}
        onBackToDestinations={onBackToDestinations}
      />
    );
  }

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0E0C0F] text-foreground">
      <div className="relative z-0 flex-1 overflow-hidden">
        <SceneBackground
          key={BACKGROUND_ASSETS.hubShip}
          src={BACKGROUND_ASSETS.hubShip}
          placeholderLabel="Hub — Ship (Moon & Mars)"
        />
      </div>

      <div className="relative z-20 flex shrink-0 flex-col items-center gap-6 bg-[#0E0C0F]/95 px-4 pb-10 pt-6 backdrop-blur-md">
        <p className="font-display text-lg font-bold uppercase tracking-wide text-primary">
          Choose a destination
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {DESTINATIONS.map((dest) => {
            const total = dest.stageIds.length;
            const done = dest.stageIds.filter((id) =>
              completedStageIds.includes(id),
            ).length;
            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  onPress={() => onSelectDestination(dest.id)}
                  className="flex h-auto min-w-[200px] cursor-pointer flex-col items-center gap-1 rounded-sm border border-primary bg-content1/60 px-8 py-5 text-primary transition-colors hover:bg-primary/15 data-[hovered=true]:bg-primary/15"
                >
                  <span className="font-display text-xl font-bold uppercase tracking-wide">
                    {dest.label}
                  </span>
                  <span className="font-mono text-xs text-primary/70">
                    {done}/{total} explored
                  </span>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
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
