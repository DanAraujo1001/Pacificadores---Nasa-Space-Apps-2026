import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { useGameStore } from "../../store/useGameStore";
import {
  DESTINATIONS,
  getDestination,
  getEquipment,
} from "../../config/destinations";
import { BACKGROUND_ASSETS } from "../../config/sceneAssets";
import type { DestinationId, StageId } from "../../types/novel";
import { EquipmentButton } from "./EquipmentButton";
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
 * - Visão de equipamento: os dois equipamentos do destino escolhido.
 *
 * Estágios concluídos aparecem marcados e ficam bloqueados (ver `EquipmentButton`
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

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0E0C0F] text-foreground">
      <div className="relative z-0 flex-1 overflow-hidden">
        <SceneBackground
          key={BACKGROUND_ASSETS.hubShip}
          src={BACKGROUND_ASSETS.hubShip}
          placeholderLabel="Hub: Ship (Moon & Mars)"
        />
      </div>

      <div className="relative z-20 flex shrink-0 flex-col items-center gap-6 bg-[#0E0C0F]/95 px-4 pb-10 pt-6 backdrop-blur-md">
        {!equipmentView ? (
          <>
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
          </>
        ) : (
          <>
            <p className="font-display text-lg font-bold uppercase tracking-wide text-primary">
              {destination?.label}: select equipment
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {(destination?.stageIds ?? []).map((stageId) => {
                const equipment = getEquipment(stageId);
                return (
                  <motion.div
                    key={stageId}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <EquipmentButton
                      label={equipment.label}
                      iconSrc={equipment.iconAsset}
                      completed={completedStageIds.includes(stageId)}
                      onSelect={() => onSelectStage(stageId)}
                    />
                  </motion.div>
                );
              })}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onPress={onBackToDestinations}
              className="cursor-pointer rounded-sm font-mono text-xs uppercase tracking-widest text-primary/80 hover:text-primary"
            >
              ← Back to destinations
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
