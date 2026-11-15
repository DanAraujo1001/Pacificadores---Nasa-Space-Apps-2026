# MEMORY.md — Estado Atual do Projeto

## Estado Atual
- **Fase:** Atos 0 e 1 jogáveis de ponta a ponta com placeholders (prólogo → hub → 4 estágios com escolhas → final act → menu).
- **O que está pronto:**
  - Stack Vite + React + TypeScript + Tailwind + HeroUI + Zustand + Framer Motion (+ Howler).
  - Temas dinâmicos por planeta em `src/hero.ts` (`space-default` / `space-moon` / `space-mars`).
  - `LoadingScreen` + `MenuScreen` (Play reseta progresso → prólogo).
  - **Ato 0 (Prólogo):** `PrologueScreen` + base `LinearSceneScreen`, roteiro `src/data/missions/prologue.ts` (verbatim).
  - **Ato 1:** `Act1Screen` orquestra intro(ECO) → `HubScreen` (destino Lua/Marte → equipamento) → `StageScreen` (motor de estágio reutilizável, dirigido por dados) → volta ao hub; todos concluídos → Final Act → menu.
  - **Estágios tipados** (verbatim) em `src/data/missions/`: `eagle`, `lrv`, `spirit`, `phoenix` (+ `act1Intro`, `finalAct`, `index` registry). Escolhas certas avançam; erradas → `GameOverScreen` (try again).
  - **Progresso central** no store: `completedStageIds`, `hubPhase`, `selectedDestination`, `completeStage`, `resetProgress`. Estágio concluído fica marcado ✓/esmaecido/bloqueado (`EquipmentButton`), sem reentrada. Ordem livre.
  - **Configs centrais:** `src/config/characters.ts` (nome/lado — protagonista=esquerda, equipamentos=direita, token do nome), `src/config/sceneAssets.ts` (bg/sprites/ícones), `src/config/destinations.ts` (Lua: Eagle/LRV; Marte: Spirit/Phoenix; `ALL_STAGE_IDS`).
  - Componentes VN reutilizáveis: `DialogueBox`, `ChoiceButton`, `ThemeIcon`, `CharacterSprite`, `SceneBackground`, `EquipmentButton`, hook `useTypewriterText`. Fallback de asset automático (placeholder nomeado).
  - Áudio automático (`resolveEvent` cobre prólogo/hub/estágios/stage-clear/game-over/final).
- **O que falta (Próximos passos imediatos):**
  1. Adicionar assets (ver `public/assets/README-ASSETS.md`): backgrounds do hub e dos 4 estágios, sprites eagle/lrv/spirit/phoenix (+ eco/grandpa), ícones de equipamento.
  2. Confirmar decisões do roteiro: saída pós-Final Act (hoje → menu; falta tela de créditos/"Abandoned, Yet Never Forgotten"), tratamento de rubricas/narração, descrição de item (fala da ECO vs. inventário), sprite da ECO.
  3. Arquivos reais em `public/assets/music/` e completar `LORE_DATA.md`.
  4. Limpeza opcional: `GameScreen`/`GameDialogueScreen` (mocks) não são mais roteados.

## Bugs / Bloqueios Conhecidos
- Lint pré-existente em `src/components/vn/useTypewriterText.ts` (`react-hooks/set-state-in-effect`), não tratado (fora de escopo).
- Assets de Ato 0 e Ato 1 ainda não existem — cenas rodam com placeholders nomeados (sem quebrar).
- Saída após o Final Act volta ao `menu` (ponto de saída marcado no código; falta tela final definitiva).
- Arquivos de áudio ainda não existem em `public/assets/music/` — fallback silencioso.

## Log de Marcos
- [2026-11-14] Criação do `AGENTS.md` e alinhamento da identidade visual (Cores: `#0E0C0F` base, `#EC8501` nave, `#6FCEC6` Lua, `#CD4116` Marte).
- [2026-11-14 17:53] Telas VN cinematográficas: loading, GameScreen com opções, GameDialogueScreen só diálogo, typewriter com skip e continue stars temáticos.
- [2026-11-14 17:59] Trilha sonora automática reativa ao `useGameStore` (audioAutoplay + playEventMusic), pastas de assets criadas e `howler` instalado; build/lint/typecheck ok.
- [2026-11-14 21:05] Ato 0 (Prólogo) implementado: `PrologueScreen`/`LinearSceneScreen`, roteiro tipado, configs centrais de personagens e assets, `CharacterSprite`/`SceneBackground` com fallback; build/typecheck/lint (arquivos novos) ok.
- [2026-11-14 22:09] Ato 1 implementado: `Act1Screen` (intro→hub→estágio→final), `StageScreen` dirigido por dados, 4 estágios tipados verbatim + act1Intro/finalAct, `HubScreen`/`EquipmentButton`/`GameOverScreen`, progresso central (`completedStageIds` + bloqueio de reentrada); typecheck/build ok.
