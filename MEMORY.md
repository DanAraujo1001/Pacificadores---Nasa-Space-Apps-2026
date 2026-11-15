# MEMORY.md — Estado Atual do Projeto

## Estado Atual
- **Fase:** Atos 0 e 1 jogáveis + fluxo de entrada (Home → Callsign → Story Loading → prólogo → hub/estágios).
- **O que está pronto:**
  - Stack Vite + React + TypeScript + Tailwind + HeroUI + Zustand + Framer Motion (+ Howler).
  - Temas dinâmicos por planeta em `src/hero.ts` (`space-default` / `space-moon` / `space-mars`).
  - `LoadingScreen` + `MenuScreen` (Play reseta progresso → fade para callsign).
  - Fluxo de entrada: `NameEntryScreen` → `StoryLoadingScreen` → `PrologueScreen` → `Act1Screen`; `HomeButton` + `HomeTransitionVeil`; persist `playerName` + `unlockedMemoryIds`.
  - **Ato 0 (Prólogo):** `PrologueScreen` + base `LinearSceneScreen`, roteiro `src/data/missions/prologue.ts` (verbatim).
  - **Ato 1:** `Act1Screen` orquestra intro(ECO) → `HubScreen` → `StageScreen` → Final Act → menu.
  - **Estágios tipados** em `src/data/missions/`: `eagle`, `lrv`, `spirit`, `phoenix` (+ `act1Intro`, `finalAct`, `index`).
  - Progresso: `completedStageIds`, `hubPhase`, `selectedDestination`, `completeStage`, `resetProgress`.
  - Configs: `characters.ts`, `sceneAssets.ts`, `destinations.ts`.
  - Componentes VN: `DialogueBox`, `ChoiceButton`, `ThemeIcon`, `CharacterSprite`, `SceneBackground`, `EquipmentButton`, `useTypewriterText`.
  - Áudio automático (`resolveEvent` cobre prólogo/hub/estágios/stage-clear/game-over/final).
- **O que falta (Próximos passos imediatos):**
  1. `src/components/vn/FinalScreen.tsx` — tela final definitiva pós-Final Act.
  2. `public/assets/.../*` — assets reais (ver `public/assets/README-ASSETS.md`) + faixas em `public/assets/music/`.
  3. `LORE_DATA.md` — completar; decisões de roteiro pendentes (rubricas, ECO, etc.).

## Bugs / Bloqueios Conhecidos
- Lint pré-existente em `src/components/vn/useTypewriterText.ts` (`react-hooks/set-state-in-effect`), não tratado (fora de escopo).
- Assets de Ato 0 e Ato 1 ainda não existem — cenas rodam com placeholders nomeados.
- Saída após o Final Act volta ao `menu` (falta tela final definitiva).
- Arquivos de áudio ainda não existem em `public/assets/music/` — fallback silencioso.

## Log de Marcos
- [2026-11-14] Criação do `AGENTS.md` e alinhamento da identidade visual (Cores: `#0E0C0F` base, `#EC8501` nave, `#6FCEC6` Lua, `#CD4116` Marte).
- [2026-11-14 17:53] Telas VN cinematográficas: loading, GameScreen com opções, GameDialogueScreen só diálogo, typewriter com skip e continue stars temáticos.
- [2026-11-14 17:59] Trilha sonora automática reativa ao `useGameStore` (audioAutoplay + playEventMusic), pastas de assets criadas e `howler` instalado; build/lint/typecheck ok.
- [2026-11-14 21:05] Ato 0 (Prólogo) implementado: `PrologueScreen`/`LinearSceneScreen`, roteiro tipado, configs centrais de personagens e assets, `CharacterSprite`/`SceneBackground` com fallback; build/typecheck/lint (arquivos novos) ok.
- [2026-11-14 21:13] Home jogável + name entry/story loading, persist de nome/memórias, HomeButton e transições de tela (fade + conteúdo).
- [2026-11-14 22:09] Ato 1 implementado: `Act1Screen` (intro→hub→estágio→final), `StageScreen` dirigido por dados, 4 estágios tipados verbatim + act1Intro/finalAct, `HubScreen`/`EquipmentButton`/`GameOverScreen`, progresso central (`completedStageIds` + bloqueio de reentrada); typecheck/build ok.
