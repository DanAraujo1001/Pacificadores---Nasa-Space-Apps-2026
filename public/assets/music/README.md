# Músicas e efeitos sonoros

Coloque aqui os arquivos de áudio (`.mp3`, `.ogg` ou `.webm`).
Eles são servidos a partir da raiz, ex.: `public/assets/music/hub.mp3` → `/assets/music/hub.mp3`.

O mapa de evento → arquivo fica em `src/data/audioTracks.ts`.

## Totalmente automático

A troca de trilha é automática. O desenvolvedor **não chama nada de áudio
durante o jogo** — basta atualizar o estado em `useGameStore` (tela, mundo,
estágio e fase do diálogo). O módulo `src/engine/audioAutoplay.ts` observa esse
estado e troca a música sozinho. Para adicionar/trocar uma faixa, basta colocar
o arquivo aqui com o nome esperado abaixo.

## Trilhas por evento (BGM)

| Evento         | Arquivo esperado        | Cena no roteiro                       |
| -------------- | ----------------------- | ------------------------------------- |
| `prologue`     | `prologue.mp3`          | ACT 0 — sótão / chuva                 |
| `hub`          | `hub.mp3`               | ACT 1 — seleção de missão (ECO)       |
| `stage-eagle`  | `eagle.mp3`             | STAGE 1 — Lua / Eagle (Apollo 11)     |
| `stage-lrv`    | `lrv.mp3`               | STAGE 2 — Lua / LRVs                  |
| `stage-spirit` | `spirit.mp3`            | STAGE 3 — Marte / Spirit              |
| `stage-phoenix`| `phoenix.mp3`           | STAGE 4 — Marte / Phoenix             |
| `stage-clear`  | `stage-clear.mp3`       | Sucesso de um estágio                 |
| `game-over`    | `game-over.mp3`         | Evento falhou / sinal perdido         |
| `final`        | `final.mp3`             | FINAL ACT — resolução                 |

## Efeitos sonoros (SFX)

| Chave             | Arquivo esperado    |
| ----------------- | ------------------- |
| `dialogueAdvance` | `sfx-blip.mp3`      |
| `choiceSelect`    | `sfx-select.mp3`    |
| `itemObtained`    | `sfx-item.mp3`      |

Se um arquivo não existir ainda, o áudio simplesmente não toca (fallback
silencioso) — o jogo não quebra.
