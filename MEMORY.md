# MEMORY.md — Estado Atual do Projeto

## Estado Atual
- **Fase:** Jogo completo (Ato 0 → Ato 1 → Final Act → FinalScreen); equipamento escolhido na cena do planeta; barra de diálogo fixa.
- **O que está pronto:**
  - Stack Vite + React + TypeScript + Tailwind + HeroUI + Zustand + Framer Motion (+ Howler).
  - Temas dinâmicos por planeta em `src/hero.ts` (`space-default` / `space-moon` / `space-mars`).
  - Fluxo: `LoadingScreen` → `MenuScreen` → `NameEntryScreen` → `StoryLoadingScreen` → `PrologueScreen` → `Act1Screen` → `FinalScreen`; `HomeButton` (exceto menu) + `HomeTransitionVeil`; persist `playerName` + `unlockedMemoryIds`.
  - **Ato 0 / Ato 1 / Final Act** com roteiros tipados, `StageScreen`, game over com retry e `FinalScreen`.
  - **Cena de equipamento** (`HubScreen` + `EquipmentMarker`): fundos Lua/Marte, ícones no solo, progresso `0/2 explored`, concluídos bloqueados, link `← Destinations`. Home inline no canto.
  - **Tela de contato** (`StageLoadingScreen`) antes de cada equipamento.
  - **Barra de diálogo fixa** (`DialoguePanel` / `dialogueBox.ts`): escolhas dentro da barra, auto-fit, sprites congelados; `playerName` em falas/nameplate/escolhas.
  - **Tela Team** (`TeamScreen`): aberta pelo botão Team do menu (fade), botão Back volta ao menu sem resetar; 4 molduras `PhotoFrame` (estilo Memories, maiores) com fotos `.jpeg` recortadas no rosto (`object-cover`+`object-top`); nomes + links LinkedIn/GitHub (`SocialLink`, nova aba, `noopener`, hover invertendo cor com o quadrado); dados em `data/team.ts`, caminhos/tamanhos em `config/teamAssets.ts`.
  - **Final Act** mostra o sprite do protagonista (Vanguard) à esquerda do início ao fim, via flag `LinearScene.protagonistAlwaysOnStage`; `FinalScreen` sem rótulo de placeholder no fundo.
  - Sprites reais (player, eco, grandpa, eagle, lrv, spirit, phoenix) + expressões proud/sad; Vite resolve `.tsx`/`.ts` antes de `.js`.
  - Áudio automático (`resolveEvent`).
- **O que falta (Próximos passos imediatos):**
  1. Backgrounds reais dos estágios/final em `public/assets/backgrounds/` + faixas em `public/assets/music/`.
  2. (Team concluído: os 4 integrantes com foto .jpeg e links LinkedIn/GitHub ativos.)
  3. Completar `LORE_DATA.md` onde ainda houver lacunas.
  4. Não versionar `.js` emitidos ao lado dos `.ts`/`.tsx`.

## Bugs / Bloqueios Conhecidos
- Lint pré-existente em `useTypewriterText.ts` / `HomeTransitionVeil.tsx` (`react-hooks/set-state-in-effect`), não tratado.
- Fundos de diálogo (Atos 0/1, estágios e tela final) ainda ausentes — escolha de equipamento tem arte real.
- Arquivos de áudio ainda não existem em `public/assets/music/` — fallback silencioso.
- Há `.js` emitidos ao lado dos `.ts`/`.tsx`; o Vite prioriza o fonte TypeScript.

## Log de Marcos
- [2026-11-14] Criação do `AGENTS.md` e alinhamento da identidade visual (Cores: `#0E0C0F` base, `#EC8501` nave, `#6FCEC6` Lua, `#CD4116` Marte).
- [2026-11-14 17:53] Telas VN cinematográficas: loading, GameScreen com opções, GameDialogueScreen só diálogo, typewriter com skip e continue stars temáticos.
- [2026-11-14 17:59] Trilha sonora automática reativa ao `useGameStore` (audioAutoplay + playEventMusic), pastas de assets criadas e `howler` instalado; build/lint/typecheck ok.
- [2026-11-14 21:05] Ato 0 (Prólogo) implementado: `PrologueScreen`/`LinearSceneScreen`, roteiro tipado, configs centrais de personagens e assets, `CharacterSprite`/`SceneBackground` com fallback; build/typecheck/lint (arquivos novos) ok.
- [2026-11-14 21:13] Home jogável + name entry/story loading, persist de nome/memórias, HomeButton e transições de tela (fade + conteúdo).
- [2026-11-14 22:09] Ato 1 implementado: `Act1Screen` (intro→hub→estágio→final), `StageScreen` dirigido por dados, 4 estágios tipados verbatim + act1Intro/finalAct, `HubScreen`/`EquipmentButton`/`GameOverScreen`, progresso central (`completedStageIds` + bloqueio de reentrada); typecheck/build ok.
- [2026-11-14 23:44] Home com arte hero (PNG) no bottom, glow amarelo e layout copy/Play à esquerda.
- [2026-11-15 00:50] Sprites reais ligados (eco/grandpa/equipamentos + expressões proud/sad); hub e preload atualizados.
- [2026-11-15 02:44] Final Act + FinalScreen; barra fixa/estática com auto-fit; nome do jogador em todo o jogo; texto/imagens não selecionáveis; escolhas dentro da barra; barra +1rem sem mover sprites; descrições de item na fonte padrão divididas por medição (`useSplitItemLines`).
- [2026-11-15 02:47] Painel aumentado p/ +1.5rem (teto sem mover sprites) e botões de escolha maiores (fonte 20px, padding 0.7em, min 12px); corrigido `BASE_PANEL_HEIGHT` (teto 15rem); build/lint ok.
- [2026-11-15 02:52] Painel bem maior (`+5rem`, engole ~3.5rem da base do sprite, estilo Monster Prom; sprites inalterados) e fonte do diálogo padronizada em 15px (fala/descrições/opções iguais), auto-fit só como proteção (min 13px); `TEXT_HEIGHT_PX`=150; build/lint ok.
- [2026-11-15 02:56] Checkpoint: estado confirmado, sem novas mudanças de código desde o marco anterior (`Estado Atual` já atualizado).
- [2026-11-15 03:04] Fonte do diálogo padronizada em 17px (min 14px) com painel `+6rem`; travessões removidos de diálogos, roteiro e textos de UI com pontuação ajustada; build ok, lint só com os 2 erros pré-existentes.
- [2026-11-15 03:11] Tela final sem o rótulo "Final Screen" do placeholder de fundo (`backgroundPlaceholderLabel` vazio); build/lint ok.
- [2026-11-15 03:14] Checkpoint: estado confirmado, sem novas mudanças de código desde o marco anterior.
- [2026-11-15 04:06] Cena de equipamento (Lua/Marte) com ícones no solo, Destinations, tela de contato na cor do planeta e Home inline.
- [2026-11-15 13:19] Final Act: sprite do protagonista (Vanguard) agora aparece (flag `protagonistAlwaysOnStage` em `LinearScene`; consumida pelo `LinearSceneScreen`); sem alterar o roteiro; build/lint ok.
- [2026-11-15 13:40] Tela Team criada (4 molduras estilo Memories maiores, nomes, LinkedIn/GitHub); botão Team ligado à navegação; ícones SVG linkedin/github; fotos pendentes em public/assets/team/; build/lint ok.
- [2026-11-15 13:51] Checkpoint: tela Team concluída; `Estado Atual` e próximos passos atualizados (fotos/URLs da equipe pendentes); build/lint ok.
- [2026-11-15 14:02] Team: fotos `.jpeg` ligadas (config), rosto enquadrado (`object-top`), hover dos ícones LinkedIn/GitHub invertendo cor com o quadrado, URLs do Victor adicionadas; falta Lucas (foto+links); build/lint ok.
- [2026-11-15 14:08] Checkpoint: estado confirmado (Team com fotos `.jpeg`, rosto enquadrado e hover invertido); pendência única: Lucas (foto + links).
- [2026-11-15 14:14] Team: URLs do Lucas (LinkedIn/GitHub) adicionadas; os 4 integrantes agora com foto e links ativos; build/lint ok.
- [2026-11-15 14:20] Checkpoint: estado confirmado, sem novas mudanças de código desde o marco anterior (Team completa).
- [2026-11-15 14:22] Checkpoint: estado confirmado, sem novas mudanças de código (pendente apenas commit das alterações da Team + fix do Final Act).
