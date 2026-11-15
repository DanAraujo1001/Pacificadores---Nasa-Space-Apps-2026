import type { StageScript } from '../../types/novel';
import { BACKGROUND_ASSETS } from '../../config/sceneAssets';

/**
 * STAGE 3: MARS — SPIRIT.
 *
 * Falas VERBATIM do roteiro-fonte (echoes_of_astra_game_script.md).
 * `{PROTAGONIST_NAME}` substitui `(Protagonist's Name)` em tempo de render.
 *
 * Setting: Gusev Crater, Mars. A six-wheeled rover with dusty solar panels
 * sits stuck in soft sand. A faint hum fills the air.
 */
export const SPIRIT_STAGE: StageScript = {
  stageId: 'spirit',
  world: 'mars',
  characterId: 'spirit',
  backgroundAsset: BACKGROUND_ASSETS.stageSpirit,
  backgroundPlaceholderLabel: 'Stage — Spirit (Gusev Crater)',
  steps: [
    {
      kind: 'choice',
      id: 'spirit-choice-1',
      lines: [
        {
          id: 'spirit-intro-1',
          speakerId: 'spirit',
          entersCharacterId: 'spirit',
          text: '(soft, drowsy voice) ...{PROTAGONIST_NAME}... you came all this way, out into the red sand...',
        },
        {
          id: 'spirit-intro-2',
          speakerId: 'protagonist',
          text: 'Spirit! I came to listen to you.',
        },
        {
          id: 'spirit-intro-3',
          speakerId: 'spirit',
          text: 'Few ever do. Tell me... how do you see me, sitting stranded here?',
        },
      ],
      choices: [
        {
          id: 'spirit-c1-a',
          label: '“As a rover that broke down and failed.”',
          correct: false,
          outcomeLines: [
            {
              id: 'spirit-c1-a-1',
              speakerId: 'spirit',
              text: 'Failed... (hum fades away)',
            },
            {
              id: 'spirit-c1-a-2',
              speakerId: 'eco',
              text: 'Signal lost. Event terminated.',
            },
          ],
        },
        {
          id: 'spirit-c1-b',
          label:
            '“As an explorer that went farther than anyone ever dreamed.”',
          correct: true,
          outcomeLines: [
            {
              id: 'spirit-c1-b-1',
              speakerId: 'spirit',
              text: '(a smile in his voice) How kind of you. I only did what I knew how to do: keep moving forward.',
            },
          ],
        },
        {
          id: 'spirit-c1-c',
          label: '“As an offline machine, and nothing more.”',
          correct: false,
          outcomeLines: [
            {
              id: 'spirit-c1-c-1',
              speakerId: 'spirit',
              text: 'Nothing more... (sensors power down)',
            },
            { id: 'spirit-c1-c-2', speakerId: 'eco', text: 'Event failed.' },
          ],
        },
      ],
    },
    {
      kind: 'choice',
      id: 'spirit-choice-2',
      lines: [
        {
          id: 'spirit-q2',
          speakerId: 'spirit',
          text: 'You know, sometimes I gaze out at the Martian horizon and wonder... what would you say to someone who is trapped, unable to move?',
        },
      ],
      choices: [
        {
          id: 'spirit-c2-a',
          label:
            '“Don’t give up, because even the end of a journey can hold beauty.”',
          correct: true,
          outcomeLines: [
            {
              id: 'spirit-c2-a-1',
              speakerId: 'spirit',
              text: 'Yes... I would have liked to hear that. Though I suppose I already knew.',
            },
          ],
        },
        {
          id: 'spirit-c2-b',
          label: '“Hang in there, someone will come rescue you soon.”',
          correct: false,
          outcomeLines: [
            {
              id: 'spirit-c2-b-1',
              speakerId: 'spirit',
              text: 'Nobody is coming... but thank you for trying. (voice falters)',
            },
            { id: 'spirit-c2-b-2', speakerId: 'eco', text: 'Event failed.' },
          ],
        },
        {
          id: 'spirit-c2-c',
          label:
            '“It’s your own fault for not watching where you were going.”',
          correct: false,
          outcomeLines: [
            {
              id: 'spirit-c2-c-1',
              speakerId: 'spirit',
              text: 'My fault... (dead silence)',
            },
            { id: 'spirit-c2-c-2', speakerId: 'eco', text: 'Event failed.' },
          ],
        },
      ],
    },
    {
      kind: 'choice',
      id: 'spirit-choice-3',
      lines: [
        {
          id: 'spirit-q3',
          speakerId: 'spirit',
          text: 'One last thing. When I finally drift off to sleep for good, what will you carry with you from me?',
        },
      ],
      choices: [
        {
          id: 'spirit-c3-a',
          label: '“The sadness of losing you.”',
          correct: false,
          outcomeLines: [
            {
              id: 'spirit-c3-a-1',
              speakerId: 'spirit',
              text: 'Sadness... that was never what I wanted to leave behind. (hum fades)',
            },
            { id: 'spirit-c3-a-2', speakerId: 'eco', text: 'Event failed.' },
          ],
        },
        {
          id: 'spirit-c3-b',
          label:
            '“The reminder that we can go the distance, even when everyone doubts us.”',
          correct: true,
          outcomeLines: [
            {
              id: 'spirit-c3-b-1',
              speakerId: 'spirit',
              text: '(warmth in his voice) Yes. That is it exactly.',
            },
          ],
        },
        {
          id: 'spirit-c3-c',
          label: '“The data you collected, nothing else.”',
          correct: false,
          outcomeLines: [
            {
              id: 'spirit-c3-c-1',
              speakerId: 'spirit',
              text: 'Just data... (sensor shuts off)',
            },
            { id: 'spirit-c3-c-2', speakerId: 'eco', text: 'Event failed.' },
          ],
        },
      ],
    },
  ],
  clearLines: [
    {
      id: 'spirit-clear-1',
      speakerId: 'spirit',
      text: 'I landed in January 2004, right here in Gusev Crater. I was built to last about 90 days. I kept going for over six years, searching for signs that Mars once held water. And I found rocks and soil shaped by it.',
    },
    {
      id: 'spirit-clear-2',
      speakerId: 'spirit',
      text: 'In 2009, my wheels got trapped in soft sand. I tried to pull myself free, but the Martian winter rolled in and my solar panels couldn\'t catch enough sunlight. I fell asleep. And I never woke up.',
    },
    {
      id: 'spirit-clear-3',
      speakerId: 'spirit',
      text: 'Don’t be sad. I gave it everything I had, and that was enough. Take this, so my journey can live on.',
    },
    {
      id: 'spirit-clear-item',
      speakerId: 'eco',
      text: 'Item Obtained: Spirit\'s Solar Panel. Mars Exploration Rover “Spirit” (MER-A). Landed in Gusev Crater on January 4, 2004. Engineered for a ~90-sol (Martian-day) prime mission, it operated for over six years, uncovering evidence of ancient wet environments on Mars. In 2009, it became embedded in soft soil. Last communication was received on March 22, 2010 (Sol 2210), and NASA declared the mission complete on May 25, 2011.',
    },
    {
      id: 'spirit-clear-farewell',
      speakerId: 'spirit',
      text: 'If you ever look up at a starry night, remember: a little robot dreamed up there for you.',
    },
  ],
};
