import { BACKGROUND_ASSETS } from '../../config/sceneAssets';
import { PROTAGONIST_NAME_TOKEN } from '../../config/characters';
export { PROTAGONIST_NAME_TOKEN };
/**
 * ACT 0: Real World (Prologue).
 *
 * Falas transcritas EXATAMENTE do roteiro-fonte (texto, ordem, pontuação e
 * falante). Rubricas entre parênteses `(...)` do roteiro são mantidas junto da
 * fala a que pertencem. Ações de cena entre `((...))` viram linhas de narração
 * (speakerId: 'narrator'), preservando o texto original.
 *
 * Cena: um sótão cheio de fotos antigas, maquetes e um capacete de astronauta.
 * Está chovendo lá fora.
 */
export const PROLOGUE_SCENE = {
    id: 'act0-prologue',
    world: 'ship',
    backgroundAsset: BACKGROUND_ASSETS.act0Attic,
    backgroundPlaceholderLabel: 'Act 0 — Attic (rain outside)',
    lines: [
        {
            id: 'p-00-narrator',
            speakerId: 'narrator',
            text: 'In the not-too-distant future, people look up at the sky and forget who got there first. The records vanished, the machines turned to scrap, and the stories turned to dust.',
        },
        {
            id: 'p-01-protagonist',
            speakerId: 'protagonist',
            // Protagonista já está em cena (sempre à esquerda) desde o início.
            entersCharacterId: 'protagonist',
            text: 'Grandpa, why do you keep all this old junk? Nobody cares about this stuff anymore.',
        },
        {
            id: 'p-02-grandpa',
            speakerId: 'grandpa-tadeu',
            // Avô Tadeu entra em cena (personagem novo → direita).
            entersCharacterId: 'grandpa-tadeu',
            text: `(chuckling softly) Nobody cares because they forgot, ${PROTAGONIST_NAME_TOKEN}. Every piece of those machines carries the hard work of thousands of people.`,
        },
        {
            id: 'p-03-protagonist',
            speakerId: 'protagonist',
            text: 'But they were abandoned out there, on the Moon, on Mars...',
        },
        {
            id: 'p-04-grandpa',
            speakerId: 'grandpa-tadeu',
            text: 'Abandoned, yes. Forgotten, never. As long as someone remembers, they stay alive. That’s what I learned in space: the silence up there isn’t empty—it’s memory waiting for someone to listen.',
        },
        {
            id: 'p-05-protagonist',
            speakerId: 'protagonist',
            text: 'And how do I talk to a machine?',
        },
        {
            id: 'p-06-grandpa',
            speakerId: 'grandpa-tadeu',
            text: 'The exact same way you talk to people. Each one has its own personality, and you have to figure out what it is. If you rush in or act careless, they won\'t listen to you.',
        },
        {
            id: 'p-07-grandpa',
            speakerId: 'grandpa-tadeu',
            text: '(handing over the helmet) When I was a kid, I used to put this on and pretend I was up there. Now it’s your turn. Use your imagination as your spaceship.',
        },
        {
            id: 'p-08-narrator',
            speakerId: 'narrator',
            // Avô Tadeu sai de cena quando o protagonista coloca o capacete e a
            // cena transita para a Eco / sistema do capacete.
            exitsCharacterId: 'grandpa-tadeu',
            text: `(${PROTAGONIST_NAME_TOKEN} puts on the helmet. The lights flicker on and the visor powers up.)`,
        },
        {
            id: 'p-09-eco',
            speakerId: 'eco',
            // Eco entra em cena (personagem novo → direita).
            entersCharacterId: 'eco',
            text: `System initialized. Welcome, Astronaut ${PROTAGONIST_NAME_TOKEN}. Available destinations: The Moon and Mars.`,
        },
    ],
};
