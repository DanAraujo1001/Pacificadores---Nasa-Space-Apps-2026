import type { StageScript } from '../../types/novel';
import { BACKGROUND_ASSETS } from '../../config/sceneAssets';

/**
 * STAGE 2: THE MOON — LRVs (Lunar Roving Vehicles).
 *
 * Falas VERBATIM do roteiro-fonte (echoes_of_astra_game_script.md).
 *
 * Setting: A lunar plain. Three roofless buggies with wire-mesh wheels are
 * parked at different spots. Their headlights blink like curious eyes.
 */
export const LRV_STAGE: StageScript = {
  stageId: 'lrv',
  world: 'moon',
  characterId: 'lrv',
  backgroundAsset: BACKGROUND_ASSETS.stageLrv,
  backgroundPlaceholderLabel: 'Stage — LRVs (lunar plain)',
  steps: [
    {
      kind: 'choice',
      id: 'lrv-choice-1',
      lines: [
        {
          id: 'lrv-intro-1',
          speakerId: 'lrv',
          entersCharacterId: 'lrv',
          text: '(upbeat, almost youthful voice) Yo, yo, yo! A visitor! Guys, look, an actual visitor!',
        },
        {
          id: 'lrv-intro-2',
          speakerId: 'protagonist',
          text: 'There are three of you?',
        },
        {
          id: 'lrv-intro-3',
          speakerId: 'lrv',
          text: 'Yep! I’m speaking for the whole crew: Apollo 15, 16, and 17. The Moon buggies! Wanna go for a spin?',
        },
      ],
      choices: [
        {
          id: 'lrv-c1-a',
          label: '“With pleasure. I appreciate your kind hospitality.”',
          correct: false,
          outcomeLines: [
            {
              id: 'lrv-c1-a-1',
              speakerId: 'lrv',
              text: '(deflated) Yikes... who invited the buzzkill? (wheels stop)',
            },
            { id: 'lrv-c1-a-2', speakerId: 'eco', text: 'Event failed.' },
          ],
        },
        {
          id: 'lrv-c1-b',
          label:
            '“Heck yeah! Last one to that crater is a rotten space rock!”',
          correct: true,
          outcomeLines: [
            {
              id: 'lrv-c1-b-1',
              speakerId: 'lrv',
              text: '(laughing loudly) NOW you’re talking! Hold on tight!',
            },
          ],
        },
        {
          id: 'lrv-c1-c',
          label: '“No thanks. I’m just here to talk.”',
          correct: false,
          outcomeLines: [
            {
              id: 'lrv-c1-c-1',
              speakerId: 'lrv',
              text: 'Aw, come on... no adventure, no fun. (headlights turn off)',
            },
            { id: 'lrv-c1-c-2', speakerId: 'eco', text: 'Event failed.' },
          ],
        },
      ],
    },
    {
      kind: 'choice',
      id: 'lrv-choice-2',
      lines: [
        {
          id: 'lrv-race',
          speakerId: 'narrator',
          text: '(Short racing sequence. The LRVs do donuts and speed around {PROTAGONIST_NAME}.)',
        },
        {
          id: 'lrv-q2',
          speakerId: 'lrv',
          text: 'You know the coolest thing about being a Moon buggy? I flew all the way up here folded up like a piece of origami! Zero legroom, though—worst airline ever!',
        },
      ],
      choices: [
        {
          id: 'lrv-c2-a',
          label: '“No way! I wish I could’ve seen you unfold!”',
          correct: true,
          outcomeLines: [
            {
              id: 'lrv-c2-a-1',
              speakerId: 'lrv',
              text: '(laughing) Oh, it was a showstopper! The astronauts popped me open in minutes and I was ready to tear up the turf!',
            },
          ],
        },
        {
          id: 'lrv-c2-b',
          label: '“That’s just basic engineering, nothing special.”',
          correct: false,
          outcomeLines: [
            {
              id: 'lrv-c2-b-1',
              speakerId: 'lrv',
              text: 'Nothing special?! (engine sputters)',
            },
            { id: 'lrv-c2-b-2', speakerId: 'eco', text: 'Event failed.' },
          ],
        },
        {
          id: 'lrv-c2-c',
          label: '“You were basically just a glorified golf cart.”',
          correct: false,
          outcomeLines: [
            {
              id: 'lrv-c2-c-1',
              speakerId: 'lrv',
              text: 'Golf cart?! Take that back!... (lights flicker, then die)',
            },
            { id: 'lrv-c2-c-2', speakerId: 'eco', text: 'Event failed.' },
          ],
        },
      ],
    },
    {
      kind: 'choice',
      id: 'lrv-choice-3',
      lines: [
        {
          id: 'lrv-q3',
          speakerId: 'lrv',
          text: '(quieter, though still grinning) Now you’re gonna get all sad on me, aren’t you? Everybody gets bummed out when I tell them I’m still parked here.',
        },
      ],
      choices: [
        {
          id: 'lrv-c3-a',
          label:
            '“Yeah, it makes me sad that you guys were just dumped here.”',
          correct: false,
          outcomeLines: [
            {
              id: 'lrv-c3-a-1',
              speakerId: 'lrv',
              text: 'Sad? No way! We had the time of our lives! (wheels lock up)',
            },
            { id: 'lrv-c3-a-2', speakerId: 'eco', text: 'Event failed.' },
          ],
        },
        {
          id: 'lrv-c3-b',
          label:
            '“Not at all! You guys are holding down the fort, and you’re gonna get plenty of visitors soon.”',
          correct: true,
          outcomeLines: [
            {
              id: 'lrv-c3-b-1',
              speakerId: 'lrv',
              text: '(beaming) Boom! Nailed it! I knew you’d get it!',
            },
          ],
        },
        {
          id: 'lrv-c3-c',
          label: '“I don’t feel anything. Machines don’t have feelings.”',
          correct: false,
          outcomeLines: [
            {
              id: 'lrv-c3-c-1',
              speakerId: 'lrv',
              text: '... (sound of a dying battery)',
            },
            { id: 'lrv-c3-c-2', speakerId: 'eco', text: 'Event failed.' },
          ],
        },
      ],
    },
  ],
  clearLines: [
    {
      id: 'lrv-clear-1',
      speakerId: 'lrv',
      text: 'Wanna know how it went down? Before us, astronauts could only explore as far as their boots could carry them. With us, they cruised way farther and hauled back awesome rocks from places nobody had ever reached!',
    },
    {
      id: 'lrv-clear-2',
      speakerId: 'lrv',
      text: 'And at the end, once the job was done, they parked us right here. All three of us. Still waiting for a parking ticket!',
    },
    {
      id: 'lrv-clear-3',
      speakerId: 'lrv',
      text: 'Here, take this. It’s a piece of me, so you never forget the crew.',
    },
    {
      id: 'lrv-clear-item',
      speakerId: 'eco',
      text: 'Item Obtained: LRV Wire-Mesh Wheel. Lunar Roving Vehicle (LRV). Battery-powered four-wheeled rover used during the Apollo 15, 16, and 17 missions (1971–1972). It folded up to be stowed in the descent stage of the lunar module and ran on two non-rechargeable 36-volt silver-zinc batteries, with an individual electric motor on each wheel. Its wheels were made of woven steel-wire mesh with titanium chevrons for traction on lunar dust. All three rovers remain parked on the Moon. They vastly expanded the range astronauts could explore and collect samples from (about 65 km / 40 miles on battery power).',
    },
    {
      id: 'lrv-clear-farewell',
      speakerId: 'lrv',
      text: 'When you head back home, tell everyone the Moon had a hot rod—and it lived its best life!',
    },
  ],
};
