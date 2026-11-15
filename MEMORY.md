# MEMORY.md — Estado Atual do Projeto

## Estado Atual
- **Fase:** Atos 0 e 1 jogáveis; a escolha de equipamento é uma cena no planeta, com tela de contato antes do diálogo.
- **O que está pronto:**
  - Stack Vite + React + TypeScript + Tailwind + HeroUI + Zustand + Framer Motion (+ Howler).
  - Temas dinâmicos por planeta em `src/hero.ts` (`space-default` / `space-moon` / `space-mars`).
  - Fluxo: `LoadingScreen` → `MenuScreen` → `NameEntryScreen` → `StoryLoadingScreen` → `PrologueScreen` → `Act1Screen`; `HomeButton` em todas as telas exceto o menu (`HomeTransitionVeil`); persist `playerName` + `unlockedMemoryIds`.
  - **Ato 0 / Ato 1** com roteiros tipados, `StageScreen`, game over com retry e `FinalScreen` (auto-dismiss para o menu).
  - **Cena de equipamento** (`HubScreen` + `EquipmentMarker`): fundos `bg-moon-choose.png` / `bg-mars-choose.png`, ícones SVG no solo, progresso `0/2 explored`, concluídos bloqueados, link `← Destinations` com hover saturado na cor do planeta. Home fica inline no canto, junto do nome do local.
  - **Tela de contato** (`StageLoadingScreen`) antes de cada equipamento: “Contacting {nome}…”, ícone de carga na cor do tema (`bg-primary`, igual ao Home) e preload do fundo do estágio.
  - Sprites reais (player, eco, grandpa, eagle, lrv, spirit, phoenix) e `playerName` nos diálogos. Vite resolve `.tsx`/`.ts` antes de `.js`.
- **O que falta (Próximos passos imediatos):**
  1. Backgrounds reais dos estágios e do final em `public/assets/backgrounds/` (`stage-eagle-tranquility.png`, `stage-lrv-plain.png`, `stage-spirit-gusev.png`, `stage-phoenix-arctic.png`, `final-screen.png`).
  2. Faixas em `public/assets/music/` (hoje o áudio cai no fallback silencioso).
  3. Completar `LORE_DATA.md` onde ainda houver lacunas de missão.

## Bugs / Bloqueios Conhecidos
- Lint pré-existente em `src/components/vn/useTypewriterText.ts` (`react-hooks/set-state-in-effect`), não tratado.
- Fundos de diálogo (Atos 0/1, estágios e tela final) ainda ausentes — só a escolha de equipamento tem arte real.
- Arquivos de áudio ainda não existem em `public/assets/music/` — fallback silencioso.
- Há `.js` emitidos ao lado dos `.ts`/`.tsx`; não versionar. O Vite prioriza o fonte TypeScript.

## Log de Marcos
- [2026-11-14] Criação do `AGENTS.md` e alinhamento da identidade visual (Cores: `#0E0C0F` base, `#EC8501` nave, `#6FCEC6` Lua, `#CD4116` Marte).
- [2026-11-14 17:53] Telas VN cinematográficas: loading, GameScreen com opções, GameDialogueScreen só diálogo, typewriter com skip e continue stars temáticos.
- [2026-11-14 17:59] Trilha sonora automática reativa ao `useGameStore` (audioAutoplay + playEventMusic), pastas de assets criadas e `howler` instalado; build/lint/typecheck ok.
- [2026-11-14 21:05] Ato 0 (Prólogo) implementado: `PrologueScreen`/`LinearSceneScreen`, roteiro tipado, configs centrais de personagens e assets, `CharacterSprite`/`SceneBackground` com fallback; build/typecheck/lint (arquivos novos) ok.
- [2026-11-14 21:13] Home jogável + name entry/story loading, persist de nome/memórias, HomeButton e transições de tela (fade + conteúdo).
- [2026-11-14 22:09] Ato 1 implementado: `Act1Screen` (intro→hub→estágio→final), `StageScreen` dirigido por dados, 4 estágios tipados verbatim + act1Intro/finalAct, `HubScreen`/`EquipmentButton`/`GameOverScreen`, progresso central (`completedStageIds` + bloqueio de reentrada); typecheck/build ok.
- [2026-11-14 23:44] Home com arte hero (PNG) no bottom, glow amarelo e layout copy/Play à esquerda.
- [2026-11-15 00:50] Sprites reais ligados (eco/grandpa/equipamentos + expressões proud/sad); hub e preload atualizados.
- [2026-11-15 04:06] Cena de equipamento (Lua/Marte) com ícones no solo, Destinations, tela de contato na cor do planeta e Home inline.
