import { useState } from "react";
import { useGameStore } from "../../store/useGameStore";
import { ALL_STAGE_IDS } from "../../config/destinations";
import { ACT1_INTRO_SCENE } from "../../data/missions/act1Intro";
import { FINAL_ACT_SCENE } from "../../data/missions/finalAct";
import { getStageScript } from "../../data/missions";
import type { DestinationId, StageId } from "../../types/novel";
import { GameOverScreen } from "./GameOverScreen";
import { HubScreen } from "./HubScreen";
import { LinearSceneScreen } from "./PrologueScreen";
import { StageScreen } from "./StageScreen";

/**
 * Orquestrador do Ato 1 (renderizado na tela `playing`).
 *
 * Fluxo: intro (ECO) → seleção de destino → seleção de equipamento → estágio →
 * volta ao hub. Quando todos os estágios estão concluídos, vai para o Final Act.
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

  // Game over é efêmero (não persiste): só um overlay para "tentar de novo".
  const [gameOver, setGameOver] = useState(false);
  // Chave para remontar o StageScreen e reiniciar o estágio do zero.
  const [stageRunId, setStageRunId] = useState(0);

  const handleSelectDestination = (destination: DestinationId) => {
    setSelectedDestination(destination);
    setHubPhase("select-equipment");
  };

  const handleSelectStage = (stage: StageId) => {
    // Guarda extra: nunca entrar num estágio já concluído.
    if (completedStageIds.includes(stage)) return;
    setStage(stage);
    setDialoguePhase("normal");
    setGameOver(false);
    setStageRunId((id) => id + 1);
    setHubPhase("stage");
  };

  const returnToHub = () => {
    setStage(null);
    setDialoguePhase("normal");
    setGameOver(false);
    setSelectedDestination(null);
    setHubPhase("select-destination");
  };

  const handleStageClear = () => {
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
    setDialoguePhase("game-over");
    setGameOver(true);
  };

  const handleRetry = () => {
    setDialoguePhase("normal");
    setGameOver(false);
    setStageRunId((id) => id + 1); // remonta o estágio, reiniciando do começo
  };

  // --- Render por fase -------------------------------------------------------

  if (hubPhase === "intro") {
    return (
      <LinearSceneScreen
        scene={ACT1_INTRO_SCENE}
        onComplete={() => setHubPhase("select-destination")}
      />
    );
  }

  if (hubPhase === "final") {
    // FINAL ACT (resolução). Ponto de saída do fluxo jogável: ao terminar as
    // falas finais, volta ao menu. (Troque `setScreen('menu')` pela próxima
    // tela quando o roteiro definir — ex.: tela de créditos.)
    return (
      <LinearSceneScreen
        scene={FINAL_ACT_SCENE}
        onComplete={() => setScreen("menu")}
      />
    );
  }

  if (hubPhase === "stage" && currentStage) {
    if (gameOver) {
      return (
        <GameOverScreen onRetry={handleRetry} onBackToHub={returnToHub} />
      );
    }
    return (
      <StageScreen
        key={`${currentStage}-${stageRunId}`}
        script={getStageScript(currentStage)}
        onClear={handleStageClear}
        onGameOver={handleGameOver}
      />
    );
  }

  // Hub: destino ou equipamento.
  return (
    <HubScreen
      equipmentView={hubPhase === "select-equipment"}
      onSelectDestination={handleSelectDestination}
      onSelectStage={handleSelectStage}
      onBackToDestinations={() => setHubPhase("select-destination")}
    />
  );
}
