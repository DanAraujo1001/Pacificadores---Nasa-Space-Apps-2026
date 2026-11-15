import { BACKGROUND_ASSETS } from '../../config/sceneAssets';
/**
 * STAGE 4: MARS — PHOENIX.
 *
 * Falas VERBATIM do roteiro-fonte (echoes_of_astra_game_script.md).
 *
 * Setting: The Martian Arctic plains. A three-legged lander with fan-shaped
 * solar arrays, dusted with a thin layer of frost.
 */
export const PHOENIX_STAGE = {
    stageId: 'phoenix',
    world: 'mars',
    characterId: 'phoenix',
    backgroundAsset: BACKGROUND_ASSETS.stagePhoenix,
    backgroundPlaceholderLabel: 'Stage — Phoenix (Martian arctic)',
    steps: [
        {
            kind: 'choice',
            id: 'phoenix-choice-1',
            lines: [
                {
                    id: 'phoenix-intro-1',
                    speakerId: 'phoenix',
                    entersCharacterId: 'phoenix',
                    text: '(bright, enthusiastic voice) Oh, hi! It is so good to hear a voice! Up here at the north pole it’s super cold, super quiet, and super fascinating!',
                },
                {
                    id: 'phoenix-intro-2',
                    speakerId: 'protagonist',
                    text: 'Phoenix! I came to hear your story.',
                },
                {
                    id: 'phoenix-intro-3',
                    speakerId: 'phoenix',
                    text: 'Awesome! Pop quiz first, though: do you know what my absolute favorite thing to do is?',
                },
            ],
            choices: [
                {
                    id: 'phoenix-c1-a',
                    label: '“Rest. You must be exhausted.”',
                    correct: false,
                    outcomeLines: [
                        {
                            id: 'phoenix-c1-a-1',
                            speakerId: 'phoenix',
                            text: 'Rest?! Are you kidding me?! (solar arrays fold up)',
                        },
                        {
                            id: 'phoenix-c1-a-2',
                            speakerId: 'eco',
                            text: 'Signal lost. Event terminated.',
                        },
                    ],
                },
                {
                    id: 'phoenix-c1-b',
                    label: '“Discover new things! Tell me what you found.”',
                    correct: true,
                    outcomeLines: [
                        {
                            id: 'phoenix-c1-b-1',
                            speakerId: 'phoenix',
                            text: '(thrilled) You asked for it! Buckle up, nerd mode activated!',
                        },
                    ],
                },
                {
                    id: 'phoenix-c1-c',
                    label: '“Follow orders from Mission Control, like every good machine.”',
                    correct: false,
                    outcomeLines: [
                        {
                            id: 'phoenix-c1-c-1',
                            speakerId: 'phoenix',
                            text: 'I am not just some mindless drone! (engine powers down)',
                        },
                        { id: 'phoenix-c1-c-2', speakerId: 'eco', text: 'Event failed.' },
                    ],
                },
            ],
        },
        {
            kind: 'choice',
            id: 'phoenix-choice-2',
            lines: [
                {
                    id: 'phoenix-q2',
                    speakerId: 'phoenix',
                    text: 'I’ve got a robotic arm built for digging into the dirt. I dug entire trenches! Wanna know how I analyze what I scoop up?',
                },
            ],
            choices: [
                {
                    id: 'phoenix-c2-a',
                    label: '“Yes, please! How does it work?”',
                    correct: true,
                    outcomeLines: [
                        {
                            id: 'phoenix-c2-a-1',
                            speakerId: 'phoenix',
                            text: '(giddy) I scoop up a soil sample, bake it in tiny ovens, and my instruments sniff the gases to tell me what it’s made of. It’s like an Easy-Bake Oven for science!',
                        },
                    ],
                },
                {
                    id: 'phoenix-c2-b',
                    label: '“No need to explain, I already know.”',
                    correct: false,
                    outcomeLines: [
                        {
                            id: 'phoenix-c2-b-1',
                            speakerId: 'phoenix',
                            text: 'Oh... buzzkill. (light dims)',
                        },
                        { id: 'phoenix-c2-b-2', speakerId: 'eco', text: 'Event failed.' },
                    ],
                },
                {
                    id: 'phoenix-c2-c',
                    label: '“Can you skip the technical jargon?”',
                    correct: false,
                    outcomeLines: [
                        {
                            id: 'phoenix-c2-c-1',
                            speakerId: 'phoenix',
                            text: 'But the technical details are the best part! (systems shut down)',
                        },
                        { id: 'phoenix-c2-c-2', speakerId: 'eco', text: 'Event failed.' },
                    ],
                },
            ],
        },
        {
            kind: 'choice',
            id: 'phoenix-choice-3',
            lines: [
                {
                    id: 'phoenix-q3',
                    speakerId: 'phoenix',
                    text: '(calmer now) When winter hit and the Sun practically vanished, I stopped working. Tell me honestly: when a mission ends, is the story over?',
                },
            ],
            choices: [
                {
                    id: 'phoenix-c3-a',
                    label: '“Yeah. Once the hardware dies, that’s it.”',
                    correct: false,
                    outcomeLines: [
                        {
                            id: 'phoenix-c3-a-1',
                            speakerId: 'phoenix',
                            text: 'That\'s it?... (solar panels close)',
                        },
                        { id: 'phoenix-c3-a-2', speakerId: 'eco', text: 'Event failed.' },
                    ],
                },
                {
                    id: 'phoenix-c3-b',
                    label: '“No way. As long as someone keeps sharing what you discovered, the mission lives on.”',
                    correct: true,
                    outcomeLines: [
                        {
                            id: 'phoenix-c3-b-1',
                            speakerId: 'phoenix',
                            text: '(joyful) Bingo! The discovery stays, even when I’m not around anymore!',
                        },
                    ],
                },
                {
                    id: 'phoenix-c3-c',
                    label: '“Depends. If there weren\'t any results, it was a waste.”',
                    correct: false,
                    outcomeLines: [
                        {
                            id: 'phoenix-c3-c-1',
                            speakerId: 'phoenix',
                            text: 'A waste?... (engine shuts off)',
                        },
                        { id: 'phoenix-c3-c-2', speakerId: 'eco', text: 'Event failed.' },
                    ],
                },
            ],
        },
    ],
    clearLines: [
        {
            id: 'phoenix-clear-1',
            speakerId: 'phoenix',
            text: 'I touched down in May 2008 near the Martian north pole, where ice hides just beneath the surface. I used my robotic arm to dig through the dirt, and my biggest breakthrough was confirming actual water ice on Mars!',
        },
        {
            id: 'phoenix-clear-2',
            speakerId: 'phoenix',
            text: 'I stayed active for about five months. When winter arrived and sunlight faded away, my solar panels just couldn\'t keep up. Still, mission accomplished! Take this, and remember: shutting down isn’t the same as being forgotten.',
        },
        {
            id: 'phoenix-clear-item',
            speakerId: 'eco',
            text: 'Item Obtained: Martian Ice Core. Phoenix Mars Lander. Landed on the Martian arctic plains (Vastitas Borealis) on May 25, 2008. Using a robotic arm to trench and analyze soil and ice, it confirmed the presence of water ice on Mars. It operated for 157 sols, its last communication on November 2, 2008, before the darkness of Martian winter and dwindling solar power brought the mission to an end.',
        },
        {
            id: 'phoenix-clear-farewell',
            speakerId: 'phoenix',
            text: '(softly) Keep an eye on Spirit for me, okay? He likes company too.',
        },
    ],
};
