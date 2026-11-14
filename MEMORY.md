# MEMORY.md — Estado Atual do Projeto

## Estado Atual
- **Fase:** Infra de áudio pronta; motor de diálogo (VN) ainda não implementado.
- **O que está pronto:**
  - Ambiente Vite + React + TS + Tailwind + HeroUI instalado e compilando (`tsc -b`, `eslint`, `vite build` passam).
  - Dependências instaladas de fato (incluindo `howler` + `@types/howler`, que faltavam no `package.json`).
  - Estado de jogo (`src/store/useGameStore.ts`): `currentScreen`, `currentWorld`, `currentStage`, `dialoguePhase` + setters.
  - **Áudio automático:** `src/engine/audioAutoplay.ts` observa o `useGameStore` e troca a trilha sozinho (`resolveEvent` + `initAudioAutoplay`, ligado em `main.tsx`). O dev não chama áudio durante o gameplay.
  - `src/store/useAudioStore.ts`: `playEventMusic` (não reinicia faixa igual), fallback silencioso p/ arquivo ausente e destravamento de autoplay no 1º gesto do usuário.
  - `src/data/audioTracks.ts`: mapa evento → arquivo e lista de SFX.
  - Tipos: `GameEvent` em `src/types/novel.ts`; `StageId`/`DialoguePhase` no store.
  - Pastas de assets criadas com README: `public/assets/music/` e `public/assets/images/`.
- **O que falta (Próximos passos imediatos):**
  1. `src/engine/dialogueEngine.ts` — máquina de estados de diálogo (avançar nó, aplicar escolhas, detectar `clear`/`game-over`) que alimenta os setters do `useGameStore`.
  2. `src/data/missions/*.ts` — roteiros tipados (eagle, lrv, spirit, phoenix) a partir de `echoes_of_astra_game_script.md`.
  3. `src/components/vn/` — `DialogueBox`, `ChoiceList`, `CharacterSprite`, `Background` para renderizar o fluxo.
  4. Adicionar os arquivos de áudio reais em `public/assets/music/` com os nomes do README.

## Bugs / Bloqueios Conhecidos
- Arquivos de áudio ainda não existem em `public/assets/music/` — por ora a música usa fallback silencioso (só `console.warn`), sem quebrar o jogo.
- Motor de diálogo inexistente: os campos `currentStage`/`dialoguePhase` existem mas ainda não são atualizados por nenhum gameplay real.

## Log de Marcos
- [2026-11-14] Criação do `AGENTS.md` e alinhamento da identidade visual (Cores: `#0E0C0F` base, `#EC8501` nave, `#6FCEC6` Lua, `#CD4116` Marte).
- [2026-11-14 17:59] Trilha sonora automática reativa ao `useGameStore` (audioAutoplay + playEventMusic), pastas de assets criadas e `howler` instalado; build/lint/typecheck ok.