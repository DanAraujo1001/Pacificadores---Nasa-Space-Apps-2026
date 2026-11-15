# MEMORY.md — Estado Atual do Projeto

## Estado Atual
- **Fase:** Atos 0 e 1 jogáveis com sprites reais de personagem + fluxo de entrada e Home com arte hero.
- **O que está pronto:**
  - Stack Vite + React + TypeScript + Tailwind + HeroUI + Zustand + Framer Motion (+ Howler).
  - Temas dinâmicos por planeta em `src/hero.ts` (`space-default` / `space-moon` / `space-mars`).
  - `LoadingScreen` + `MenuScreen` (Play → callsign); arte `image-home-teste.png` no bottom-direita (pulso + glow amarelo).
  - Fluxo: `NameEntryScreen` → `StoryLoadingScreen` → `PrologueScreen` → `Act1Screen`; `HomeButton` + `HomeTransitionVeil`; persist `playerName` + `unlockedMemoryIds`.
  - **Ato 0 / Ato 1** com roteiros tipados e progresso (`completedStageIds`, `hubPhase`, etc.).
  - **Sprites em `public/assets/sprites/`** ligados em `sceneAssets.ts` / `characters.ts`: player, eco, grandpa-tadeu, eagle, lrv, spirit, phoenix (normal + proud/sad onde existir).
  - Cenas usam `getCharacterSpriteSrc` (outcomes proud/sad); hub usa sprites `normal` como ícone de equipamento; preload cobre todos os PNGs; `playerName` no nameplate/diálogos.
  - Componentes VN: `DialogueBox`, `ChoiceButton`, `ThemeIcon`, `CharacterSprite`, `SceneBackground`, `EquipmentButton`, `useTypewriterText`.
  - Áudio automático (`resolveEvent`).
- **O que falta (Próximos passos imediatos):**
  1. `src/components/vn/FinalScreen.tsx` — tela final definitiva pós-Final Act.
  2. Backgrounds reais em `public/assets/backgrounds/` + faixas em `public/assets/music/` (ver `README-ASSETS.md`).
  3. `LORE_DATA.md` — completar; ícones dedicados de equipamento (hoje o hub reusa sprites).

## Bugs / Bloqueios Conhecidos
- Lint pré-existente em `src/components/vn/useTypewriterText.ts` (`react-hooks/set-state-in-effect`), não tratado (fora de escopo).
- Backgrounds de Ato 0/1 ainda ausentes — cenas usam placeholder de fundo.
- Saída após o Final Act volta ao `menu` (falta tela final definitiva).
- Arquivos de áudio ainda não existem em `public/assets/music/` — fallback silencioso.

## Log de Marcos
- [2026-11-14] Criação do `AGENTS.md` e alinhamento da identidade visual (Cores: `#0E0C0F` base, `#EC8501` nave, `#6FCEC6` Lua, `#CD4116` Marte).
- [2026-11-14 17:53] Telas VN cinematográficas: loading, GameScreen com opções, GameDialogueScreen só diálogo, typewriter com skip e continue stars temáticos.
- [2026-11-14 17:59] Trilha sonora automática reativa ao `useGameStore` (audioAutoplay + playEventMusic), pastas de assets criadas e `howler` instalado; build/lint/typecheck ok.
- [2026-11-14 21:05] Ato 0 (Prólogo) implementado: `PrologueScreen`/`LinearSceneScreen`, roteiro tipado, configs centrais de personagens e assets, `CharacterSprite`/`SceneBackground` com fallback; build/typecheck/lint (arquivos novos) ok.
- [2026-11-14 21:13] Home jogável + name entry/story loading, persist de nome/memórias, HomeButton e transições de tela (fade + conteúdo).
- [2026-11-14 22:09] Ato 1 implementado: `Act1Screen` (intro→hub→estágio→final), `StageScreen` dirigido por dados, 4 estágios tipados verbatim + act1Intro/finalAct, `HubScreen`/`EquipmentButton`/`GameOverScreen`, progresso central (`completedStageIds` + bloqueio de reentrada); typecheck/build ok.
- [2026-11-14 23:44] Home com arte hero (PNG) no bottom, glow amarelo e layout copy/Play à esquerda.
- [2026-11-15 00:50] Sprites reais ligados (eco/grandpa/equipamentos + expressões proud/sad); hub e preload atualizados.
