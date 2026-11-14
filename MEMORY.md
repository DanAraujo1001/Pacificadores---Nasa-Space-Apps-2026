# MEMORY.md — Estado Atual do Projeto

## Estado Atual
- **Fase:** UI cinematográfica VN + infra de áudio automática (motor de diálogo ainda pendente).
- **O que está pronto:**
  - Stack Vite + React + TypeScript + Tailwind + HeroUI + Zustand + Framer Motion (+ Howler).
  - Temas dinâmicos por planeta em `src/hero.ts` (`space-default` / `space-moon` / `space-mars`).
  - `LoadingScreen` com fill progressivo + preload; `MenuScreen` placeholder.
  - `GameScreen` (letterbox + opções staggered) e `GameDialogueScreen` (só diálogo + continue stars).
  - Componentes VN: `DialogueBox`, `ChoiceButton`, `ThemeIcon`, hook `useTypewriterText`.
  - Store: telas `loading` | `menu` | `playing` | `dialogue` + `currentStage` / `dialoguePhase` para áudio.
  - Áudio automático: `audioAutoplay` + `useAudioStore` + `audioTracks` (ligado em `main.tsx`).
  - Assets UI: `bg-example.png`, ícones star/bag/glasses, sprites do player.
- **O que falta (Próximos passos imediatos):**
  1. Menu jogável com botão para entrar em `dialogue` / `playing`.
  2. `src/engine/dialogueEngine.ts` + primeiro roteiro tipado em `src/data/missions/`.
  3. Completar `LORE_DATA.md` e adicionar arquivos reais em `public/assets/music/`.

## Bugs / Bloqueios Conhecidos
- Fluxo ainda depende de setar `currentScreen` manualmente no store para testar `playing` / `dialogue`.
- Arquivos de áudio ainda não existem em `public/assets/music/` — fallback silencioso.
- `CharacterId` em `src/types/novel.ts` ainda é `''` (placeholder).
- Background ilustrado único (`bg-example.png`); falta mundos Lua/nave.

## Log de Marcos
- [2026-11-14] Criação do `AGENTS.md` e alinhamento da identidade visual (Cores: `#0E0C0F` base, `#EC8501` nave, `#6FCEC6` Lua, `#CD4116` Marte).
- [2026-11-14 17:53] Telas VN cinematográficas: loading, GameScreen com opções, GameDialogueScreen só diálogo, typewriter com skip e continue stars temáticos.
- [2026-11-14 17:59] Trilha sonora automática reativa ao `useGameStore` (audioAutoplay + playEventMusic), pastas de assets criadas e `howler` instalado; build/lint/typecheck ok.
