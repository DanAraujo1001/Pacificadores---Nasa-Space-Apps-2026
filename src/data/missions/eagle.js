import { BACKGROUND_ASSETS } from '../../config/sceneAssets';
/**
 * STAGE 1: THE MOON — EAGLE (Apollo 11 Lunar Module).
 *
 * Falas transcritas VERBATIM do roteiro-fonte (echoes_of_astra_game_script.md):
 * texto, ordem, pontuação e falante. Rubricas entre parênteses do roteiro são
 * mantidas junto da fala. Marcadores de markdown (`*...*`, ✔/✘) não são texto
 * falado e, portanto, não entram nas falas.
 *
 * Setting: Sea of Tranquility. A gold-and-silver structure, half-covered in
 * dust, gleams under the faint Earthlight. Dead silence.
 */
export const EAGLE_STAGE = {
    stageId: 'eagle',
    world: 'moon',
    characterId: 'eagle',
    backgroundAsset: BACKGROUND_ASSETS.stageEagle,
    backgroundPlaceholderLabel: 'Stage — Eagle (Sea of Tranquility)',
    steps: [
        {
            kind: 'choice',
            id: 'eagle-choice-1',
            lines: [
                {
                    id: 'eagle-intro-1',
                    speakerId: 'eagle',
                    entersCharacterId: 'eagle',
                    text: '(deep, measured voice) ...It has been a very long time since my last visitor. A very long time indeed.',
                },
                {
                    id: 'eagle-intro-2',
                    speakerId: 'protagonist',
                    text: 'Hello, Eagle.',
                },
                {
                    id: 'eagle-intro-3',
                    speakerId: 'eagle',
                    text: 'You arrived without making a sound. That already says something about you. Why are you here?',
                },
            ],
            choices: [
                {
                    id: 'eagle-c1-a',
                    label: '“I came to take a selfie with you. You’re super famous!”',
                    correct: false,
                    outcomeLines: [
                        {
                            id: 'eagle-c1-a-1',
                            speakerId: 'eagle',
                            text: '(dryly) Fame... is that all that is left of me? (lights go out)',
                        },
                        {
                            id: 'eagle-c1-a-2',
                            speakerId: 'eco',
                            text: 'Signal lost. Event terminated.',
                        },
                    ],
                },
                {
                    id: 'eagle-c1-b',
                    label: '“I came to listen. From what I’ve been taught, you deserve to be heard in silence.”',
                    correct: true,
                    outcomeLines: [
                        {
                            id: 'eagle-c1-b-1',
                            speakerId: 'eagle',
                            text: '(voice softening) Few understand that silence speaks too. Make yourself at home.',
                        },
                    ],
                },
                {
                    id: 'eagle-c1-c',
                    label: '“I came to see if you still work.”',
                    correct: false,
                    outcomeLines: [
                        {
                            id: 'eagle-c1-c-1',
                            speakerId: 'eagle',
                            text: 'Work... I am not a toy. (systems shut down)',
                        },
                        {
                            id: 'eagle-c1-c-2',
                            speakerId: 'eco',
                            text: 'Event failed.',
                        },
                    ],
                },
            ],
        },
        {
            kind: 'choice',
            id: 'eagle-choice-2',
            lines: [
                {
                    id: 'eagle-q2',
                    speakerId: 'eagle',
                    text: 'When I think back on what happened here, many say it was the triumph of two men. What do you think?',
                },
            ],
            choices: [
                {
                    id: 'eagle-c2-a',
                    label: '“It was just the two astronauts—the heroes of the mission.”',
                    correct: false,
                    outcomeLines: [
                        {
                            id: 'eagle-c2-a-1',
                            speakerId: 'eagle',
                            text: 'There is no such thing as a solo hero... (static)',
                        },
                        {
                            id: 'eagle-c2-a-2',
                            speakerId: 'eco',
                            text: 'Event failed.',
                        },
                    ],
                },
                {
                    id: 'eagle-c2-b',
                    label: '“It was thousands of people: engineers, technicians, Collins up in orbit... all working together.”',
                    correct: true,
                    outcomeLines: [
                        {
                            id: 'eagle-c2-b-1',
                            speakerId: 'eagle',
                            text: 'Yes. Nobody gets far on their own. Not even me.',
                        },
                    ],
                },
                {
                    id: 'eagle-c2-c',
                    label: '“Honestly, it was mostly dumb luck.”',
                    correct: false,
                    outcomeLines: [
                        {
                            id: 'eagle-c2-c-1',
                            speakerId: 'eagle',
                            text: 'Luck? Every single calculation was earned with sweat. (light dims)',
                        },
                        {
                            id: 'eagle-c2-c-2',
                            speakerId: 'eco',
                            text: 'Event failed.',
                        },
                    ],
                },
            ],
        },
        {
            kind: 'choice',
            id: 'eagle-choice-3',
            lines: [
                {
                    id: 'eagle-q3',
                    speakerId: 'eagle',
                    text: '(quietly) Part of me stayed behind here. Part of me went back. What do you feel when you look at what remains?',
                },
            ],
            choices: [
                {
                    id: 'eagle-c3-a',
                    label: '“Pity. You were just left behind all alone.”',
                    correct: false,
                    outcomeLines: [
                        {
                            id: 'eagle-c3-a-1',
                            speakerId: 'eagle',
                            text: 'Do not pity me. I was not left behind—I stayed. (systems shut down)',
                        },
                        {
                            id: 'eagle-c3-a-2',
                            speakerId: 'eco',
                            text: 'Event failed.',
                        },
                    ],
                },
                {
                    id: 'eagle-c3-b',
                    label: '“Gratitude. This is where humanity took its very first step onto another world.”',
                    correct: true,
                    outcomeLines: [
                        {
                            id: 'eagle-c3-b-1',
                            speakerId: 'eagle',
                            text: '(warmth in his voice) Gratitude. That is exactly what I hoped to hear.',
                        },
                    ],
                },
                {
                    id: 'eagle-c3-c',
                    label: '“Nothing special. It’s just an old hunk of metal.”',
                    correct: false,
                    outcomeLines: [
                        {
                            id: 'eagle-c3-c-1',
                            speakerId: 'eagle',
                            text: '... (icy silence)',
                        },
                        {
                            id: 'eagle-c3-c-2',
                            speakerId: 'eco',
                            text: 'Event failed.',
                        },
                    ],
                },
            ],
        },
    ],
    clearLines: [
        {
            id: 'eagle-clear-1',
            speakerId: 'eagle',
            text: 'Let me tell you a story, little one. On July 20, 1969, I touched down right here carrying Neil Armstrong and Buzz Aldrin. Michael Collins waited up in orbit inside the command module so the two of them could make it home.',
        },
        {
            id: 'eagle-clear-2',
            speakerId: 'eagle',
            text: 'When the time came to leave, my upper half carried them back up. My lower half—the descent stage—stayed right here to serve as a launchpad. I am still here, standing guard over the place where it all began.',
        },
        {
            id: 'eagle-clear-3',
            speakerId: 'eagle',
            text: 'Take this with you.',
        },
        {
            id: 'eagle-clear-item',
            speakerId: 'eco',
            text: 'Item Obtained: Tranquility Base Plaque. Eagle Descent Stage (Apollo 11). The lunar module that landed in the Sea of Tranquility on July 20, 1969. Its descent stage remains on the Moon as an abandoned launchpad, carrying a plaque stating that humans came in peace for all mankind. The ascent stage (the upper half) lifted off, docked with the command module Columbia, and was later jettisoned into lunar orbit; after signal loss it is believed to have crashed on the lunar surface, with its exact impact site never confirmed (NASA estimates Mare Crisium, roughly 800 km / 500 miles from Tranquility Base).',
        },
        {
            id: 'eagle-clear-farewell',
            speakerId: 'eagle',
            text: '(farewell) Tell your grandfather that the silence up here is beautiful. And that he was never alone.',
        },
    ],
};
