# MEMORY.md — Estado Atual do Projeto

## Estado Atual
- **Fase:** UI cinematográfica da Visual Novel (telas de gameplay mock).
- **O que está pronto:**
  - Stack Vite + React + TypeScript + Tailwind + HeroUI + Zustand + Framer Motion.
  - Temas dinâmicos por planeta em `src/hero.ts` (`space-default` / `space-moon` / `space-mars`).
  - `LoadingScreen` com fill progressivo + preload; `MenuScreen` placeholder.
  - `GameScreen` (letterbox + opções staggered) e `GameDialogueScreen` (só diálogo + continue stars).
  - Componentes VN: `DialogueBox`, `ChoiceButton`, `ThemeIcon`, hook `useTypewriterText`.
  - Assets: `bg-example.png`, ícones star/bag/glasses, sprites do player.
  - Store com telas: `loading` | `menu` | `playing` | `dialogue`.
- **O que falta (Próximos passos imediatos):**
  1. Menu jogável com botão para entrar em `dialogue` / `playing` (sem gambiarra no store).
  2. Motor de diálogo em `src/engine/` + primeiro roteiro tipado em `src/data/missions/` (dados → nós, sem mock hardcoded nas telas).
  3. Completar `LORE_DATA.md` e ligar falas/personagens às missões oficiais da NASA.

## Bugs / Bloqueios Conhecidos
- Fluxo ainda depende de setar `currentScreen` manualmente no store para testar `playing` / `dialogue`.
- `CharacterId` em `src/types/novel.ts` ainda é `''` (placeholder).
- Background ilustrado único (`bg-example.png`); falta fallbacks/mundos Lua e nave.

## Log de Marcos
- [2026-11-14] Criação do `AGENTS.md` e alinhamento da identidade visual (Cores: `#0E0C0F` base, `#EC8501` nave, `#6FCEC6` Lua, `#CD4116` Marte).
- [2026-11-14 17:53] Telas VN cinematográficas: loading, GameScreen com opções, GameDialogueScreen só diálogo, typewriter com skip e continue stars temáticos.
