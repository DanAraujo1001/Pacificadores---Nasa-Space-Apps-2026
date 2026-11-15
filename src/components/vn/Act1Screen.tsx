import { useCallback, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../../store/useGameStore";
import { ALL_STAGE_IDS, getEquipment } from "../../config/destinations";
import { ACT1_INTRO_SCENE } from "../../data/missions/act1Intro";
import { FINAL_ACT_SCENE } from "../../data/missions/finalAct";
import { getStageScript } from "../../data/missions";
import type { DestinationId, StageId } from "../../types/novel";
import { FinalScreen } from "./FinalScreen";
import { GameOverScreen } from "./GameOverScreen";
import { HubScreen } from "./HubScreen";
import { LinearSceneScreen } from "./PrologueScreen";
import { StageLoadingScreen } from "./StageLoadingScreen";
import { StageScreen } from "./StageScreen";

const DESTINATION_FADE_S = 0.45;

type DestinationVeil = "cover" | "reveal";

/**
 * Orquestrador do Ato 1 (renderizado na tela `playing`).
 *
 * Fluxo: intro (ECO) → seleção de destino → seleção de equipamento →
 * tela de contato → estágio → volta ao hub. Quando todos os estágios estão
 * concluídos, vai para o Final Act.
 *
 * O progresso (estágios concluídos) vive no store; estágios concluídos ficam
 * bloqueados no hub. Game over não conclui o estágio (permite tentar de novo).
 */
export function Act1Screen() {
  const hubPhase = useGameStore((state) => state.hubPhase);
  const setHubPhase = useGameStore((state) => state.setHubPhase);
  const currentStage = useGameStore((state) => state.currentStage);
  const setStage = useGameStore((state) => state.setStage);
  const setSelectedDestination = useGameStore(
    (state) => state.setSelectedDestination,
  );
  const completeStage = useGameStore((state) => state.completeStage);
  const setDialoguePhase = useGameStore((state) => state.setDialoguePhase);
  const completedStageIds = useGameStore((state) => state.completedStageIds);
  const setScreen = useGameStore((state) => state.setScreen);
  const setWorld = useGameStore((state) => state.setWorld);
  const setStagePosition = useGameStore((state) => state.setStagePosition);
  const endRun = useGameStore((state) => state.endRun);

  // Equipamento escolhido, ainda na tela de contato (não persiste).
  const [enteringStage, setEnteringStage] = useState<StageId | null>(null);

  // Game over é efêmero (não persiste): só um overlay para "tentar de novo".
  const [gameOver, setGameOver] = useState(false);
  // Chave para remontar o StageScreen e reiniciar o estágio do zero.
  const [stageRunId, setStageRunId] = useState(0);
  // Depois das falas do Final Act, mostra a tela de encerramento (não persiste).
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  // Fade até a escolha de destino (intro e volta de um estágio).
  const [destinationVeil, setDestinationVeil] = useState<DestinationVeil | null>(
    null,
  );

  const handleSelectDestination = (destination: DestinationId) => {
    setSelectedDestination(destination);
    setHubPhase("select-equipment");
  };

  const handleSelectStage = (stage: StageId) => {
    // Guarda extra: nunca entrar num estágio já concluído.
    if (completedStageIds.includes(stage) || enteringStage) return;
    setWorld(getEquipment(stage).world);
    setEnteringStage(stage);
  };

  const handleStageReady = useCallback(() => {
    const stage = enteringStage;
    if (!stage || useGameStore.getState().pendingFadeTo) return;
    // Estágio novo: começa do início (sem posição salva de outro estágio).
    setStagePosition(null);
    setStage(stage);
    setDialoguePhase("normal");
    setGameOver(false);
    setStageRunId((id) => id + 1);
    setEnteringStage(null);
    setHubPhase("stage");
  }, [
    enteringStage,
    setDialoguePhase,
    setHubPhase,
    setStage,
    setStagePosition,
  ]);

  const returnToHub = () => {
    if (destinationVeil) return;
    setDestinationVeil("cover");
  };

  const finishDestinationVeil = () => {
    if (destinationVeil === "cover") {
      setStage(null);
      setDialoguePhase("normal");
      setGameOver(false);
      setSelectedDestination(null);
      setHubPhase("select-destination");
      setDestinationVeil("reveal");
      return;
    }
    if (destinationVeil === "reveal") setDestinationVeil(null);
  };

  const handleStageClear = () => {
    setStagePosition(null);
    if (currentStage) {
      completeStage(currentStage);
      setDialoguePhase("clear"); // desbloqueia a lembrança associada
    }

    // Todos concluídos? → Final Act. Senão, volta ao hub.
    const doneAfter = currentStage
      ? [...new Set([...completedStageIds, currentStage])]
      : completedStageIds;
    const allDone = ALL_STAGE_IDS.every((id) => doneAfter.includes(id));

    if (allDone) {
      setStage(null);
      setSelectedDestination(null);
      setHubPhase("final");
    } else {
      returnToHub();
    }
  };

  const handleGameOver = () => {
    // "Tentar de novo" reinicia o estágio do começo; o save também.
    setStagePosition(null);
    setDialoguePhase("game-over");
    setGameOver(true);
  };

  // Callback estável: evita reiniciar o timer de auto-dismiss da tela final.
  const goToMenu = useCallback(() => setScreen("menu"), [setScreen]);

  const handleRetry = () => {
    setDialoguePhase("normal");
    setGameOver(false);
    setStageRunId((id) => id + 1); // remonta o estágio, reiniciando do começo
  };

  // --- Render por fase -------------------------------------------------------

  let screen: ReactNode;

  if (hubPhase === "intro") {
    screen = (
      <LinearSceneScreen
        scene={ACT1_INTRO_SCENE}
        onComplete={returnToHub}
      />
    );
  } else if (hubPhase === "final") {
    // FINAL ACT (resolução). Fluxo: falas finais → TELA FINAL de encerramento
    // ("Abandoned, Yet Never Forgotten.") → menu. Não há caminho de volta aos
    // estágios já concluídos.
    screen = showFinalScreen ? (
      <FinalScreen onContinue={goToMenu} />
    ) : (
      <LinearSceneScreen
        scene={FINAL_ACT_SCENE}
        onComplete={() => {
          // Fim do jogo: encerra o save de progresso (Memories permanecem).
          endRun();
          setShowFinalScreen(true);
        }}
      />
    );
  } else if (enteringStage) {
    const equipment = getEquipment(enteringStage);
    const script = getStageScript(enteringStage);
    screen = (
      <StageLoadingScreen
        equipmentLabel={equipment.label}
        backgroundAsset={script.backgroundAsset}
        onComplete={handleStageReady}
      />
    );
  } else if (hubPhase === "stage" && currentStage) {
    screen = gameOver ? (
      <GameOverScreen onRetry={handleRetry} onBackToHub={returnToHub} />
    ) : (
      <StageScreen
        key={`${currentStage}-${stageRunId}`}
        script={getStageScript(currentStage)}
        onClear={handleStageClear}
        onGameOver={handleGameOver}
      />
    );
  } else {
    // Hub: destino ou equipamento. A volta do planeta já tem o fade do HubScreen.
    screen = (
      <HubScreen
        equipmentView={hubPhase === "select-equipment"}
        onSelectDestination={handleSelectDestination}
        onSelectStage={handleSelectStage}
        onBackToDestinations={() => setHubPhase("select-destination")}
      />
    );
  }

  return (
    <>
      {screen}
      {destinationVeil ? (
        <motion.div
          className="pointer-events-auto fixed inset-0 z-[80] bg-[#0E0C0F]"
          initial={{ opacity: 0 }}
          animate={{ opacity: destinationVeil === "cover" ? 1 : 0 }}
          transition={{ duration: DESTINATION_FADE_S, ease: "easeInOut" }}
          onAnimationComplete={finishDestinationVeil}
          aria-hidden="true"
        />
      ) : null}
    </>
  );
}
