import type { LinearScene } from '../../types/novel';
import { BACKGROUND_ASSETS } from '../../config/sceneAssets';

/**
 * FINAL ACT: Resolution.
 *
 * Falas VERBATIM do roteiro-fonte (echoes_of_astra_game_script.md).
 * `{PROTAGONIST_NAME}` substitui `(Protagonist's Name)` em tempo de render.
 *
 * Setting: The Moon and Mars appear together; depois o protagonista tira o
 * capacete e volta ao sótão, com o Avô Tadeu ao lado.
 */
export const FINAL_ACT_SCENE: LinearScene = {
  id: 'final-act',
  world: 'ship',
  backgroundAsset: BACKGROUND_ASSETS.finalAct,
  backgroundPlaceholderLabel: 'Final Act: Resolution',
  // O protagonista (Vanguard) está em cena do início ao fim do Final Act
  // (usa o capacete, conversa com a Eco e depois com o Avô). Sempre à esquerda.
  protagonistAlwaysOnStage: true,
  lines: [
    {
      id: 'final-eco-1',
      speakerId: 'eco',
      entersCharacterId: 'eco',
      text: 'Mission complete. Every piece of hardware has been awakened in your memory.',
    },
    {
      id: 'final-protagonist-1',
      speakerId: 'protagonist',
      text: 'I get it now... each one of them has a personality, a voice. They aren\'t scrap metal.',
    },
    {
      id: 'final-eco-2',
      speakerId: 'eco',
      text: 'No. Each one is a story waiting for someone to tell it.',
    },
    {
      id: 'final-voices-note',
      speakerId: 'narrator',
      text: '(The voices of Eagle, LRV, Spirit, and Phoenix echo together, gentle and warm.)',
    },
    {
      id: 'final-eagle',
      speakerId: 'eagle',
      text: 'We traveled far, yet we only stay alive because you remembered.',
    },
    {
      id: 'final-lrv',
      speakerId: 'lrv',
      text: 'And if you tell our story, everyone else will remember too!',
    },
    {
      id: 'final-spirit',
      speakerId: 'spirit',
      text: 'Every person who listens becomes a new road for us to travel.',
    },
    {
      id: 'final-phoenix',
      speakerId: 'phoenix',
      text: 'And every story told is a spark that never goes out!',
    },
    {
      id: 'final-return-note',
      speakerId: 'narrator',
      exitsCharacterId: 'eco',
      // A partir daqui ele tira o capacete → sprite sem capacete.
      protagonistHelmet: 'off',
      // Volta ao sótão: o mesmo fundo do prólogo, até o fim do ato.
      backgroundAsset: BACKGROUND_ASSETS.act0Attic,
      text: '({PROTAGONIST_NAME} takes off the helmet, returning to the attic. Grandpa Tadeu stands beside them, smiling.)',
    },
    {
      id: 'final-grandpa-1',
      speakerId: 'grandpa-tadeu',
      entersCharacterId: 'grandpa-tadeu',
      text: 'Well? How was the trip?',
    },
    {
      id: 'final-protagonist-2',
      speakerId: 'protagonist',
      text: 'Grandpa... I met all of them. Eagle is serious and proud. The LRVs are total goofballs. Spirit is calm and poetic. And Phoenix is the biggest nerd I’ve ever met!',
    },
    {
      id: 'final-grandpa-2',
      speakerId: 'grandpa-tadeu',
      text: '(laughing, visibly moved) Then you understood. Each one has its own way, and by respecting that, you finally heard them.',
    },
    {
      id: 'final-protagonist-3',
      speakerId: 'protagonist',
      text: 'I want to tell everyone about this. At school, online, everywhere.',
    },
    {
      id: 'final-grandpa-3',
      speakerId: 'grandpa-tadeu',
      text: 'That is the best way to care for the past, {PROTAGONIST_NAME}. Whenever someone tells a story, it gets a second life.',
    },
    {
      id: 'final-window-note',
      speakerId: 'narrator',
      text: '({PROTAGONIST_NAME} looks out the window. The rain has stopped. A single star shines in the clearing sky.)',
    },
    {
      id: 'final-narrator',
      speakerId: 'narrator',
      text: 'Somewhere out there, in the dust of the Moon and the red sands of Mars, the machines rest in silence. But now, that silence has someone listening.',
    },
  ],
};
