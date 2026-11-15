# MEMORY.md — Estado Atual do Projeto

## Estado Atual
- **Fase:** Jogo completo (Ato 0 → Ato 1 → Final Act → FinalScreen); equipamento escolhido na cena do planeta; barra de diálogo fixa.
- **O que está pronto:**
  - Stack Vite + React + TypeScript + Tailwind + HeroUI + Zustand + Framer Motion (+ Howler).
  - Temas dinâmicos por planeta em `src/hero.ts` (`space-default` / `space-moon` / `space-mars`).
  - Fluxo: `LoadingScreen` → `MenuScreen` → `NameEntryScreen` → `StoryLoadingScreen` → `PrologueScreen` → `Act1Screen` → `FinalScreen`; `HomeButton` (exceto menu) + `HomeTransitionVeil`; persist `playerName` + `unlockedMemoryIds`.
  - **Ato 0 / Ato 1 / Final Act** com roteiros tipados, `StageScreen`, game over com retry e `FinalScreen`.
  - **Perfil (ECO) de cada equipamento**: 1ª fala de cada estágio é a descrição do personagem falada pela ECO (`*-profile`, `speakerId:'eco'`), verbatim do roteiro, antes do equipamento entrar em cena. O texto começa com o nome do equipamento no formato `Nome (Profile): ...` (Eagle/LRV/Spirit/Phoenix).
  - **Cena de equipamento** (`HubScreen` + `EquipmentMarker`): fundos Lua/Marte, ícones no solo, progresso `0/2 explored`, concluídos bloqueados, link `← Destinations`. Home inline no canto.
  - **Tela de contato** (`StageLoadingScreen`) antes de cada equipamento.
  - **Barra de diálogo fixa** (`DialoguePanel` / `dialogueBox.ts`): escolhas dentro da barra, auto-fit, sprites congelados; `playerName` em falas/nameplate/escolhas.
  - **Tela Team** (`TeamScreen`): aberta pelo botão Team do menu (fade), botão Back volta ao menu sem resetar; 4 molduras `PhotoFrame` (estilo Memories, maiores) com fotos `.jpeg` recortadas no rosto (`object-cover`+`object-top`); nomes + links LinkedIn/GitHub (`SocialLink`, nova aba, `noopener`, hover invertendo cor com o quadrado); dados em `data/team.ts`, caminhos/tamanhos em `config/teamAssets.ts`.
  - **Final Act** mostra o sprite do protagonista (Vanguard) à esquerda do início ao fim, via flag `LinearScene.protagonistAlwaysOnStage`; `FinalScreen` sem rótulo de placeholder no fundo.
  - **Troca de sprite por capacete** (protagonista): expressão `withoutHelmet` em `CHARACTER_SPRITES.protagonist` (`player-without-helmet.png`); marca de dados `ScriptLine.protagonistHelmet: 'on' | 'off'`; `LinearSceneScreen` deriva o estado atual (default `on`) e renderiza o sprite certo. Ato 0 começa sem capacete e vira normal em `p-08-narrator` (coloca o capacete); Final Act vira sem capacete em `final-return-note` (tira o capacete).
  - Sprites reais (player, eco, grandpa, eagle, lrv, spirit, phoenix) + expressões proud/sad; Vite resolve `.tsx`/`.ts` antes de `.js`.
  - Áudio automático (`resolveEvent`).
  - **Backgrounds reais ligados:** Ato 0 (Attic) → `Grandpa's_House.webp`; Ato 1 (Hub ship) → `rocket_background.webp`; Stage Eagle → `Mare_Tranquillitatis.webp`; Stage LRVs → `Shorty_Crater.webp`; Stage Spirit → `Gusev_Crater.webp`; Stage Phoenix → `Vastitas_Borealis.webp`, todos via `BACKGROUND_ASSETS` em `src/config/sceneAssets.ts` (apóstrofo URL-encoded `%27`). `object-cover` mantém o layout.
  - **Fundo do foguete em largura total:** `SceneBackground` aceita `bleedWidth`/`bleedOffsetY`. Na abertura da ECO e no começo do Final Act a arte (`rocket_background.webp`, margens transparentes) usa `158vw` e sobe `6vh`. `ScriptLine.backgroundAsset` troca o fundo a partir da fala; em `final-return-note` o Final Act passa para `Grandpa's_House.webp` e fica no sótão até o fim (sem o bleed do foguete).
  - **Thumbnails das memories:** cada item em `src/data/memories.ts` aponta para o ícone em `public/assets/icons/equipment/`; o slot só mostra a imagem quando a memória está desbloqueada.
- **O que falta (Próximos passos imediatos):**
  1. Arte própria da tela final (`final-screen.png`); o Final Act ainda reusa o túnel e o sótão.
  2. Faixas em `public/assets/music/`.
  3. Completar `LORE_DATA.md` onde ainda houver lacunas e não versionar `.js` emitidos ao lado dos `.ts`/`.tsx`.

## Bugs / Bloqueios Conhecidos
- (Resolvido) Falas "engolidas"/puladas: `useTypewriterText` resetava o estado da fala num efeito, deixando o 1º frame da nova fala com o estado da anterior (`textComplete=true`); clique nessa janela pulava a fala. Agora o reset é síncrono no render (padrão "prop anterior em estado"), afeta todas as cenas/estágios.
- (Resolvido) Lint zerado: os 2 erros pré-existentes foram corrigidos. `HomeTransitionVeil.tsx` (`set-state-in-effect`) agora inicia o véu no render via padrão de borda (`sawPending`); `StageLoadingScreen.tsx` (`refs`) move a escrita de `onCompleteRef` para um efeito. `npm run lint` passa sem erros.
- Fundos dos Atos 0/1, dos 4 estágios e do Final Act (túnel, depois sótão) ligados; a tela final ainda sem arte própria.
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
- [2026-11-15 05:30] Backgrounds reais dos Atos 0 e 1: `act0Attic`→`Grandpa's_House.webp`, `hubShip`→`Rocket_Transition.webp` em `sceneAssets.ts` (apóstrofo `%27`); build/typecheck ok, layout intacto (`object-cover`).
- [2026-11-15 05:40] Sprite da ECO corrigido: `eco.normal` → `/assets/sprites/eco/Eco.png` (arquivo real) em `sceneAssets.ts`; build/typecheck ok.
- [2026-11-15 05:48] Background do Stage Spirit (Gusev Crater) ligado: `stageSpirit` → `/assets/backgrounds/Gusev_Crater.webp` em `sceneAssets.ts`; build/typecheck ok, layout intacto (`object-cover`).
- [2026-11-15 05:55] Background do Stage Phoenix (Martian arctic) ligado: `stagePhoenix` → `/assets/backgrounds/Vastitas_Borealis.webp` em `sceneAssets.ts`; build/typecheck ok, layout intacto (`object-cover`).
- [2026-11-15 06:02] Background do Ato 1 (Hub ship) trocado para `rocket_background.webp` (`hubShip` em `sceneAssets.ts`); build/typecheck ok, layout intacto.
- [2026-11-15 06:10] Backgrounds dos stages lunares ligados: Eagle (Sea of Tranquility) → `Mare_Tranquillitatis.webp`, LRVs (lunar plain) → `Shorty_Crater.webp` em `sceneAssets.ts`; build/typecheck ok, layout intacto.
- [2026-11-15 06:25] Nudge vertical por personagem (`spriteBottomNudge` em `CharacterConfig`): ECO abaixada 2.5rem em relação à base da barra; `CharacterSprite` aceita `bottomNudge` e PrologueScreen/StageScreen repassam. Demais sprites inalterados; build/typecheck ok (lint só com os 3 erros pré-existentes).
- [2026-11-15 06:35] Thumbnails das memories ligadas em `src/data/memories.ts`: Eagle → `Tranquility_base_plaque-Eagle.png`, LRV → `Genesis_Rock_Big_Muley_Rock_Orange_Soil-LRV.png`, Spirit → `Pure_Silica_Mars-Spirit.png`, Phoenix → `Martian_Ice_Core-Phoenix.png` (pasta `public/assets/icons/equipment/`). `MemorySlot` já só exibe o thumbnail quando `unlocked`, e o unlock ocorre no `dialoguePhase==='clear'` (ato concluído); build/typecheck ok.
- [2026-11-15 13:19] Final Act: sprite do protagonista (Vanguard) agora aparece (flag `protagonistAlwaysOnStage` em `LinearScene`; consumida pelo `LinearSceneScreen`); sem alterar o roteiro; build/lint ok.
- [2026-11-15 13:40] Tela Team criada (4 molduras estilo Memories maiores, nomes, LinkedIn/GitHub); botão Team ligado à navegação; ícones SVG linkedin/github; fotos pendentes em public/assets/team/; build/lint ok.
- [2026-11-15 13:51] Checkpoint: tela Team concluída; `Estado Atual` e próximos passos atualizados (fotos/URLs da equipe pendentes); build/lint ok.
- [2026-11-15 14:02] Team: fotos `.jpeg` ligadas (config), rosto enquadrado (`object-top`), hover dos ícones LinkedIn/GitHub invertendo cor com o quadrado, URLs do Victor adicionadas; falta Lucas (foto+links); build/lint ok.
- [2026-11-15 14:08] Checkpoint: estado confirmado (Team com fotos `.jpeg`, rosto enquadrado e hover invertido); pendência única: Lucas (foto + links).
- [2026-11-15 14:14] Team: URLs do Lucas (LinkedIn/GitHub) adicionadas; os 4 integrantes agora com foto e links ativos; build/lint ok.
- [2026-11-15 14:20] Checkpoint: estado confirmado, sem novas mudanças de código desde o marco anterior (Team completa).
- [2026-11-15 14:22] Checkpoint: estado confirmado, sem novas mudanças de código (pendente apenas commit das alterações da Team + fix do Final Act).
- [2026-11-15 15:25] Troca de sprite por capacete: expressão `withoutHelmet` (`player-without-helmet.png`) + marca `ScriptLine.protagonistHelmet`; Ato 0 sem capacete até `p-08` e Final Act sem capacete a partir de `final-return-note`; `LinearSceneScreen` consome o estado; build ok, lint só com erros pré-existentes.
- [2026-11-15 15:31] Roteiro-fonte (`echoes_of_astra_game_script.md`): linha de cenário do Stage 4 (Phoenix) reescrita para descrever a nova arte (planície marciana vermelha, horizonte plano, céu laranja, Sol ao canto), em inglês e sem travessões; só doc, sem alteração de código.
- [2026-11-15 15:38] Fix de falas engolidas: `useTypewriterText` reescrito para resetar a fala de forma SÍNCRONA no render (padrão oficial "prop anterior em estado" via `renderedKey`), eliminando a janela de estado obsoleto que fazia um clique pular a fala; fala vazia já entra concluída. Vale para todas as cenas lineares e os 4 estágios; build ok, lint só com os 2 erros pré-existentes (arquivo do typewriter agora limpo).
- [2026-11-15 15:40] Lint zerado: corrigidos os 2 erros pré-existentes. `HomeTransitionVeil` inicia o véu no render via detecção de borda (`sawPending`), sem efeito; `StageLoadingScreen` move a escrita de `onCompleteRef.current` para um efeito `[onComplete]`. `npm run lint` passa sem erros; build ok.
- [2026-11-15 15:46] Perfil (ECO) por equipamento: adicionada a fala de descrição do personagem como 1ª linha de cada estágio (`eagle/lrv/spirit/phoenix-profile`, `speakerId:'eco'`), verbatim do roteiro, exibida antes do equipamento entrar; usa o auto-fit padrão da barra; build/lint ok.
- [2026-11-15 15:48] Perfil (ECO): texto passou a abrir com o nome do equipamento no formato `Nome (Profile): ...` (Eagle/LRV/Spirit/Phoenix); build/lint ok.
- [2026-11-15 19:14] Fundo do foguete em largura total na abertura da ECO e no início do Final Act (`bleedWidth` 158vw, −6vh); a partir de `final-return-note` o fundo troca para o sótão (`Grandpa's_House.webp`).
