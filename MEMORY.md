# MEMORY.md — Estado Atual do Projeto

## Estado Atual
- **Fase:** Fluxo de entrada jogável + Home visual com arte hero; motor de diálogo ainda pendente.
- **O que está pronto:**
  - Stack Vite + React + TypeScript + Tailwind + HeroUI + Zustand + Framer Motion (+ Howler).
  - Temas dinâmicos por planeta em `src/hero.ts` (`space-default` / `space-moon` / `space-mars`).
  - `LoadingScreen` (boot → menu) e `StoryLoadingScreen` (pós-nome → `playing`) com fill do ícone.
  - Home `MenuScreen` (EN): copy + Play à esquerda; arte `image-home-teste.png` fixa no bottom-direita com pulso suave e glow amarelo suave; Menu+bag dropdown.
  - Fluxo Play → `NameEntryScreen` → `StoryLoadingScreen` → `GameScreen` (fades + Home compartilhado name/story).
  - Store Zustand + `persist` (`echoes-of-astra-save`): `playerName` + `unlockedMemoryIds`; telas `loading` | `menu` | `name-entry` | `story-loading` | `playing` | `dialogue`.
  - `GameScreen` / `GameDialogueScreen` usam `playerName` + `HomeButton`.
  - Catálogo `src/data/memories.ts`; áudio automático; componentes VN (`DialogueBox`, `ChoiceButton`, etc.).
- **O que falta (Próximos passos imediatos):**
  1. `src/engine/dialogueEngine.ts` + primeiro roteiro tipado em `src/data/missions/` (ligar `GameScreen` ao engine).
  2. Completar `LORE_DATA.md` e arquivos reais em `public/assets/music/`.
  3. Backgrounds/sprites por mundo (Lua/nave/Marte) no lugar de `bg-example.png`.

## Bugs / Bloqueios Conhecidos
- Arquivos de áudio ainda não existem em `public/assets/music/` — fallback silencioso.
- `CharacterId` em `src/types/novel.ts` ainda é `''` (placeholder).
- Background ilustrado único (`bg-example.png`); falta mundos Lua/nave.
- Gameplay ainda usa nós mock em `GameScreen` / `GameDialogueScreen` (sem engine de diálogo).
- Assets `image-home.svg` / `image-home-teste.svg` ainda no repo; Home ativa usa `image-home-teste.png`.

## Log de Marcos
- [2026-11-14] Criação do `AGENTS.md` e alinhamento da identidade visual (Cores: `#0E0C0F` base, `#EC8501` nave, `#6FCEC6` Lua, `#CD4116` Marte).
- [2026-11-14 17:53] Telas VN cinematográficas: loading, GameScreen com opções, GameDialogueScreen só diálogo, typewriter com skip e continue stars temáticos.
- [2026-11-14 17:59] Trilha sonora automática reativa ao `useGameStore` (audioAutoplay + playEventMusic), pastas de assets criadas e `howler` instalado; build/lint/typecheck ok.
- [2026-11-14 21:13] Home jogável + name entry/story loading, persist de nome/memórias, HomeButton e transições de tela (fade + conteúdo).
- [2026-11-14 23:44] Home com arte hero (PNG) no bottom, glow amarelo e layout copy/Play à esquerda.
