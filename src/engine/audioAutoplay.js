import { useGameStore } from '../store/useGameStore';
import { useAudioStore } from '../store/useAudioStore';
import {} from '../types/novel.ts';
/**
 * Traduz o estado atual do jogo no evento de música correspondente,
 * seguindo a estrutura do roteiro (echoes_of_astra_game_script.md).
 *
 * É uma função pura: mesma entrada, mesma saída. Toda a decisão de "qual
 * música toca" mora aqui, então o resto do jogo só precisa atualizar o
 * `useGameStore` normalmente — a trilha acompanha sozinha.
 */
export function resolveEvent(state) {
    const { currentScreen, currentStage, dialoguePhase } = state;
    // ACT 0 — tela inicial / sótão (carregando ou menu).
    if (currentScreen !== 'playing') {
        return 'prologue';
    }
    // Durante o gameplay, sem estágio ativo:
    if (currentStage === null) {
        // FINAL ACT — resolução: o motor zera o estágio e marca 'clear'.
        if (dialoguePhase === 'clear')
            return 'final';
        // ACT 1 — Hub de seleção de missão.
        return 'hub';
    }
    // Dentro de um estágio: a fase do diálogo tem prioridade.
    if (dialoguePhase === 'game-over')
        return 'game-over';
    if (dialoguePhase === 'clear')
        return 'stage-clear';
    // Fluxo normal: trilha específica do equipamento.
    switch (currentStage) {
        case 'eagle':
            return 'stage-eagle';
        case 'lrv':
            return 'stage-lrv';
        case 'spirit':
            return 'stage-spirit';
        case 'phoenix':
            return 'stage-phoenix';
        default:
            // Estágio desconhecido: cai no hub como fallback seguro.
            return 'hub';
    }
}
let unsubscribe = null;
/**
 * Liga o autoplay da trilha sonora ao estado do jogo.
 *
 * Chame UMA vez na inicialização (feito em `main.tsx`). A partir daí, sempre
 * que o estado do jogo mudar de forma que altere o evento de música, a trilha
 * troca automaticamente. O desenvolvedor NÃO precisa chamar nada de áudio
 * durante o gameplay — basta atualizar o `useGameStore`.
 *
 * Retorna uma função para desligar (útil em testes / HMR).
 */
export function initAudioAutoplay() {
    // Evita assinaturas duplicadas (ex.: Hot Module Replacement no dev).
    if (unsubscribe)
        return unsubscribe;
    const applyForState = (state) => {
        const event = resolveEvent(state);
        // playEventMusic já ignora quando o evento não mudou (não reinicia a faixa).
        useAudioStore.getState().playEventMusic(event);
    };
    // Aplica o estado inicial imediatamente.
    applyForState(useGameStore.getState());
    // E reage a cada mudança futura do estado do jogo.
    unsubscribe = useGameStore.subscribe(applyForState);
    return () => {
        unsubscribe?.();
        unsubscribe = null;
    };
}
