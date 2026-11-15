# MEMORY.md — Estado Atual do Projeto

## Estado Atual
- **Fase:** Ato 0 (Prólogo) jogável de ponta a ponta com placeholders; motor de escolhas dos estágios ainda pendente.
- **O que está pronto:**
  - Stack Vite + React + TypeScript + Tailwind + HeroUI + Zustand + Framer Motion (+ Howler).
  - Temas dinâmicos por planeta em `src/hero.ts` (`space-default` / `space-moon` / `space-mars`).
  - `LoadingScreen` com fill progressivo + preload; `MenuScreen` (botão Play → prólogo).
  - `GameScreen` (letterbox + opções staggered) e `GameDialogueScreen` (só diálogo + continue stars).
  - **Ato 0 (Prólogo):** `PrologueScreen` + base reutilizável `LinearSceneScreen`, roteiro tipado em `src/data/missions/prologue.ts` (falas verbatim do script), tela `prologue` no store/App.
  - **Configs centrais:** `src/config/characters.ts` (nome/lado/sprite — protagonista=esquerda, novos=direita) e `src/config/sceneAssets.ts` (caminhos de backgrounds/sprites).
  - Componentes VN reutilizáveis: `DialogueBox`, `ChoiceButton`, `ThemeIcon`, `CharacterSprite`, `SceneBackground`, hook `useTypewriterText`. Fallback de asset automático (placeholder nomeado).
  - Áudio automático: `audioAutoplay` + `useAudioStore` + `audioTracks` (prólogo já coberto por `resolveEvent`).
- **O que falta (Próximos passos imediatos):**
  1. Adicionar assets do Ato 0: `act0-attic.png`, `eco/eco-normal.png`, `grandpa-tadeu/grandpa-normal.png` (ver `public/assets/README-ASSETS.md`).
  2. Confirmar decisões do roteiro: nome do protagonista (hoje `"Vanguard"`), tratamento de narração/rubricas, sprite da Eco.
  3. `src/engine/dialogueEngine.ts` (escolhas/clear/game-over) + estágios tipados (eagle, lrv, spirit, phoenix).
  4. Completar `LORE_DATA.md` e adicionar arquivos reais em `public/assets/music/`.

## Bugs / Bloqueios Conhecidos
- Lint pré-existente em `src/components/vn/useTypewriterText.ts` (`react-hooks/set-state-in-effect`), não tratado (fora de escopo do Ato 0).
- Assets do Ato 0 ainda não existem — cena roda com placeholders nomeados (sem quebrar).
- Fluxo dos estágios (`playing`/`dialogue`) ainda usa mocks; motor de diálogo real inexistente.
- Arquivos de áudio ainda não existem em `public/assets/music/` — fallback silencioso.

## Log de Marcos
- [2026-11-14] Criação do `AGENTS.md` e alinhamento da identidade visual (Cores: `#0E0C0F` base, `#EC8501` nave, `#6FCEC6` Lua, `#CD4116` Marte).
- [2026-11-14 17:53] Telas VN cinematográficas: loading, GameScreen com opções, GameDialogueScreen só diálogo, typewriter com skip e continue stars temáticos.
- [2026-11-14 17:59] Trilha sonora automática reativa ao `useGameStore` (audioAutoplay + playEventMusic), pastas de assets criadas e `howler` instalado; build/lint/typecheck ok.
- [2026-11-14 21:05] Ato 0 (Prólogo) implementado: `PrologueScreen`/`LinearSceneScreen`, roteiro tipado, configs centrais de personagens e assets, `CharacterSprite`/`SceneBackground` com fallback; build/typecheck/lint (arquivos novos) ok.
