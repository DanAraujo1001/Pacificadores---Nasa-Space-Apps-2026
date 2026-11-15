# MEMORY.md — Estado Atual do Projeto

## Estado Atual
- **Fase:** Jogo completo (Ato 0 → Ato 1 → Final Act → FinalScreen) com save de progresso, Continue/New Game, tela de item obtido e Memories por item.
- **O que está pronto:**
  - Stack Vite + React + TypeScript + Tailwind + HeroUI + Zustand + Framer Motion (+ Howler). Temas por planeta em `src/hero.ts`.
  - Fluxo: `LoadingScreen` → `MenuScreen` → `NameEntryScreen` → `StoryLoadingScreen` → `PrologueScreen` → `Act1Screen` (intro → destino → equipamento → contato → estágio → Final Act) → `FinalScreen`; `HomeButton` + `HomeTransitionVeil`.
  - **Proporção central:** `SCENE.UPPER_PANEL_HEIGHT = 100vh − DIALOGUE_BOX.PANEL_HEIGHT`, `SCENE.TOP_BAR_HEIGHT` (8.5vh) e `SCENE.PLACEHOLDER_LABEL_TOP` em `src/config/dialogueBox.ts`. Cenas de diálogo, estágios, item obtido e seleção de equipamento usam a mesma proporção (1280×720: cena 437px / barra 283px). Seleção de destino mantém a arte 1519:569 abaixo da faixa (sem barra de diálogo). `SPRITE` inalterado.
  - **Itens (catálogo único `src/data/items.ts`):** Eagle "Tranquility Base Plaque", LRV "Genesis Rock, Big Muley & Orange Soil" (1 item/1 ícone), Spirit "Pure Silica Mars", Phoenix "Martian Ice Core". Falas da Eco geradas por `itemObtainedText(id)`; `ScriptLine.itemId` liga a fala ao item. Roteiro e `LORE_DATA.md` atualizados. `src/data/memories.ts` saiu; o catálogo de itens o substitui.
  - **Tela de item obtido:** `ItemReward.tsx` (item central + raios que pulsam/giram, respeita reduce-motion) e `ItemIcon.tsx` (placeholder com o nome). Config `ITEM_REWARD` em `dialogueBox.ts`. Item desenhado à FRENTE dos sprites (no LRV o sprite das 3 buggies ocupa o centro). Ícones em `ITEM_ICON_ASSETS` apontam para os PNGs em `public/assets/icons/equipment/`.
  - **Memories:** `useMemoriesStore` (chave separada), `InventoryPanel`/`MemorySlot` leem o catálogo; sem duplicar; sobrevivem a fim de jogo e novo save.
  - **Save:** módulo único `src/engine/saveSystem.ts` (único acesso ao localStorage). Chaves `echoes-of-astra:progress` e `echoes-of-astra:memories` (v1); migra a chave antiga `echoes-of-astra-save`. Autosave por subscribe em `useGameStore` (`initProgressAutosave` no `main.tsx`), só em telas retomáveis e só quando muda. Posição exata: `scenePosition` e `stagePosition` (incl. `lineId` da parte dividida). Inválido/corrompido/versão antiga → descartado sem log, Memories intactos. Estágio concluído no save → retoma na escolha de destino. Game over → retoma do início do estágio. `endRun()` ao fim do Final Act apaga o progresso.
  - **Home:** "Play" sem save; "Continue" + "New Game" (confirmação inline) com save.
  - Perfil (ECO) por equipamento, troca de sprite por capacete, tela Team, faixa preta superior, backgrounds reais dos Atos 0/1 e 4 estágios.
  - **Fundo do foguete em largura total:** `SceneBackground` aceita `bleedWidth`/`bleedOffsetY`. Na abertura da ECO e no começo do Final Act a arte (`rocket_background.webp`, margens transparentes) usa `158vw` e sobe `6vh`. `ScriptLine.backgroundAsset` troca o fundo a partir da fala; em `final-return-note` o Final Act passa para `Grandpa's_House.webp` e fica no sótão até o fim (sem o bleed do foguete).
- **Próximos passos imediatos:**
  1. Arte própria da tela final (`final-screen.png`); o Final Act ainda reusa o túnel e o sótão.
  2. Faixas em `public/assets/music/`.
  3. Revisar o item do LRV por cima do sprite e decidir a limpeza de assets/dependências sem uso (`lucide-react`, fundos e ícones listados no log).

## Bugs / Bloqueios Conhecidos
- (Resolvido) Falas "engolidas" no typewriter e lint zerado (ver Log de Marcos).
- (Resolvido) Divisor de falas descartava texto em decimais ("about 11.7 kg" cortava "...(about 11."): `toSentences` em `useSplitItemLines` agora só quebra em `.`/`?`/`!` seguido de espaço.
- Retrato de celular (390×844): sprites se sobrepõem (pré-existente, não tratado).
- Fundos dos Atos 0/1, dos 4 estágios e do Final Act (túnel, depois sótão) ligados; a tela final ainda sem arte própria.
- Arquivos de áudio ausentes em `public/assets/music/` (fallback silencioso).
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
- [2026-11-15 15:55] Commit `d7b580d` em `dev/arthur` (17 arquivos: perfis ECO, sprite por capacete, fix typewriter, lint zerado, Stage 4 art, + `player-without-helmet.png`). Push para `origin` falhou por autenticação (HTTPS sem token); pendente de credencial GitHub.
- [2026-11-15 16:18] Hub do Ato 1: legenda padrão trocada de "Select a planet" para "Select a destination" (`HubScreen.tsx`), alinhando com o heading/placeholder "Choose a destination"; build ok.
- [2026-11-15 16:24] Faixa preta superior (letterbox) nas cenas lineares para igualar o topo do hub: nova config central `SCENE.TOP_BAR_HEIGHT` (`17vh`) em `dialogueBox.ts`, consumida por `LinearSceneScreen` (Ato 0 / intro Ato 1 / Final Act); build/lint ok.
- [2026-11-15 16:26] Faixa preta superior reduzida pela metade: `SCENE.TOP_BAR_HEIGHT` de `17vh` para `8.5vh` (afeta Ato 0 / intro Ato 1 / Final Act via config central).
- [2026-11-15 16:29] Faixa preta superior estendida aos 4 estágios de gameplay (`StageScreen`), usando a mesma `SCENE.TOP_BAR_HEIGHT`; hub e EquipmentScene já tinham topo preto pelo layout; build/lint ok.
- [2026-11-15 16:41] Diagnóstico (sem mudança de código): intro do Ato 1 "quebrada" era build antigo servido por dev servers presos em 5173/5174. Confirmado que a intro usa o mesmo `LinearSceneScreen`/fundo `object-cover` do Ato 0. Ação: encerrar servers antigos e recarregar.
- [2026-11-15 16:50] Tela de seleção de destino padronizada ao topo: `DestinationChoice` (`HubScreen`) deixou de centralizar o letterbox e passou a usar a faixa `SCENE.TOP_BAR_HEIGHT` no topo (igual às demais cenas da intro do Ato 1 até destinos); build/lint ok.
- [2026-11-15 17:21] Início da tarefa grande (7 partes: proporção do painel, novos itens LRV/Spirit, tela de item obtido, Memories por-item, sistema de save versionado, auditoria de diálogos, limpeza). Exploração completa do repo e plano definidos; baseline build OK / lint 0 / sem testes. Sem mudança de código: BLOQUEADO aguardando confirmação do usuário sobre mapeamento LRV→missão e descrição factual de "Pure Silica Mars".
- [2026-11-15 17:23] Decisão do usuário: LRV = UM item único (1 sprite/1 ícone/1 descrição) para as 3 pedras juntas — não repete tela 3x. Ainda bloqueado: nome do item combinado do LRV + confirmação da descrição de "Pure Silica Mars". Sem mudança de código.
- [2026-11-15 17:29] Partes 1 e 2 concluídas. P1: `SCENE.UPPER_PANEL_HEIGHT` central aplicada ao EquipmentScene (HUD do destino vira overlay). P2: itens LRV "Genesis Rock, Big Muley & Orange Soil" e Spirit "Pure Silica Mars" atualizados no roteiro e dados; novo catálogo `src/data/items.ts` + `ITEM_ICON_ASSETS` (placeholders documentados). build+lint ok. Falta ligar `items.ts` nas Partes 3/4.
- [2026-11-15 18:50] Tarefa de 7 partes concluída: proporção central (SCENE.UPPER_PANEL_HEIGHT), itens novos (LRV/Spirit) no catálogo items.ts, tela de item obtido (ItemReward), Memories por item em chave separada, save versionado (saveSystem.ts) com Continue/New Game, auditoria (fala do LRV ajustada), limpeza (mocks, memories antigos, tipos e exports sem uso). Fix do divisor de falas em decimais. build/lint ok; playthrough headless completo sem erros.
- [2026-11-15 19:14] Fundo do foguete em largura total na abertura da ECO e no início do Final Act (`bleedWidth` 158vw, −6vh); a partir de `final-return-note` o fundo troca para o sótão (`Grandpa's_House.webp`).
