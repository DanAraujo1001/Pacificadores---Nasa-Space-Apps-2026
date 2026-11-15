import {} from '../types/novel.ts';
/**
 * Mapeia cada evento narrativo para o arquivo de música correspondente.
 *
 * Os arquivos ficam em `public/assets/music/` e são servidos pela raiz
 * (ex.: `/assets/music/hub.mp3`). Coloque os arquivos de áudio com estes
 * nomes nessa pasta. Caso um arquivo ainda não exista, o áudio apenas não
 * toca (fallback silencioso), sem quebrar o jogo.
 */
export const EVENT_MUSIC = {
    prologue: '/assets/music/prologue.mp3',
    hub: '/assets/music/hub.mp3',
    'stage-eagle': '/assets/music/eagle.mp3',
    'stage-lrv': '/assets/music/lrv.mp3',
    'stage-spirit': '/assets/music/spirit.mp3',
    'stage-phoenix': '/assets/music/phoenix.mp3',
    'stage-clear': '/assets/music/stage-clear.mp3',
    'game-over': '/assets/music/game-over.mp3',
    final: '/assets/music/final.mp3',
};
/**
 * Efeitos sonoros curtos reutilizáveis (SFX), também em `public/assets/music/`.
 */
export const SFX = {
    dialogueAdvance: '/assets/music/sfx-blip.mp3',
    choiceSelect: '/assets/music/sfx-select.mp3',
    itemObtained: '/assets/music/sfx-item.mp3',
};
