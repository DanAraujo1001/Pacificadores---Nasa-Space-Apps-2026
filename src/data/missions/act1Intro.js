import { BACKGROUND_ASSETS } from '../../config/sceneAssets';
/**
 * ACT 1: Hub (Mission Select) — fala de abertura da ECO antes da seleção.
 *
 * Falas VERBATIM do roteiro-fonte (echoes_of_astra_game_script.md). Após estas
 * falas, o jogador entra na área de seleção de destino/equipamento.
 */
export const ACT1_INTRO_SCENE = {
    id: 'act1-intro',
    world: 'ship',
    backgroundAsset: BACKGROUND_ASSETS.hubShip,
    backgroundPlaceholderLabel: 'Act 1 — Hub (ship: Moon & Mars)',
    lines: [
        {
            id: 'act1-intro-eco',
            speakerId: 'eco',
            entersCharacterId: 'eco',
            text: 'I’ve detected four faint signals from historic hardware: Eagle, the Lunar Roving Vehicles, Spirit, and Phoenix. Which one do you want to meet? Fair warning: each one expects to be treated differently.',
        },
        {
            id: 'act1-intro-protagonist',
            speakerId: 'protagonist',
            text: 'Got it. Let’s do this.',
        },
    ],
};
