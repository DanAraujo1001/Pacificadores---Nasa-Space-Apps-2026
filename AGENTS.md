# AGENTS.md — NASA Space Apps 2026: Visual Novel Engine

## 1. Visão Geral do Projeto
- **Desafio:** *Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars*.
- **Conceito:** Uma Visual Novel interativa no navegador (estilo *Monster Prom*), onde o jogador assume o papel de um astronauta/arqueólogo espacial interagindo com equipamentos históricos da NASA antropomorfizados na Lua e em Marte.
- **Restrição Crítica:** O jogo roda 100% no cliente (determinístico, baseado em roteiros e estados). **NÃO** utilize chamadas de API de IA generativa em tempo real dentro do gameplay.

---

## 2. Stack Tecnológica & UI
- **Core:** React 18+, TypeScript (strict mode), Vite.
- **UI Library:** `@heroui/react` (HeroUI) customizado via `src/hero.ts` com temas dinâmicos (`space-default`, `space-moon`, `space-mars`).
- **Estilização:** Tailwind CSS + Framer Motion (para transições de cena, entrada de sprites e efeito typewriter).
- **Tipografia:** `Inter` (corpo/diálogos), `Space Grotesk` (títulos/nameplates), `JetBrains Mono` (dados técnicos/telemetria).
- **Gerenciamento de Estado:** Zustand (controlando cena atual, nó de diálogo, atributos e registros desbloqueados).
- **Arquitetura de Pastas:**
  - `src/components/vn/`: Componentes visuais puros (Caixa de diálogo, Sprite do personagem, Fundo, HUD, Opções de Escolha).
  - `src/engine/`: Lógica pura da máquina de estados de diálogo (sem acoplamento com JSX).
  - `src/data/missions/`: Roteiros isolados por equipamento em TypeScript tipado (ex: `opportunity.ts`, `apollo11.ts`, `ingenuity.ts`).
  - `src/types/`: Contratos de dados (`Character`, `DialogueNode`, `Choice`, `GameState`).
  - `public/assets/`: Imagens organizadas em `/backgrounds` e `/sprites/{character_id}/`.

---

## 3. Regras de Ouro de Desenvolvimento & Narrativa
1. **Fidelidade Histórica (Anti-Alucinação):** Antes de escrever ou editar qualquer diálogo, evento ou dado técnico de uma missão, leia obrigatoriamente o arquivo `LORE_DATA.md`. Nunca invente datas, instrumentos ou fatos sobre as missões da NASA.
2. **Show, Don't Info-Dump:** Nunca crie telas estáticas tipo "Wikipédia". Os dados históricos e científicos devem ser revelados organicamente através da personalidade do equipamento, suas falas e as consequências das escolhas do jogador.
3. **Separação Dados vs. UI:** Nunca coloque textos de diálogo hardcoded dentro de componentes React. Todo o fluxo narrativo deve ser dirigido por dados estruturados em `src/data/missions/`.
4. **Resiliência de Assets:** Sempre preveja um fallback visual elegante (ex: silhueta ou ícone estilizado) caso uma imagem de sprite ou fundo ainda não tenha sido adicionada em `public/assets/`.

---

## 4. Protocolo de Memória & Sessão (`MEMORY.md`)
Para evitar degradação de contexto e desperdício de tokens, **NÃO** atualize o `MEMORY.md` a cada micro-alteração. Siga estritamente os dois comandos abaixo:

### Comando: `/resume-session`
Quando o usuário iniciar com `/resume-session` (ou pedir para retomar o contexto):
1. Leia `AGENTS.md`, `MEMORY.md` e `LORE_DATA.md`.
2. **NÃO** modifique nenhum arquivo ainda.
3. Responda apenas com um resumo objetivo (máx. 6 linhas) contendo:
   - Onde paramos (último marco concluído).
   - Bugs conhecidos ou bloqueios ativos.
   - Qual é a próxima tarefa prioritária listada no `MEMORY.md`.

### Comando: `/save-session`
Когда o usuário executar `/save-session` (ou ao concluir uma funcionalidade/marco importante):
1. Verifique os arquivos modificados recentemente no projeto.
2. Atualize o `MEMORY.md` seguindo sua estrutura:
   - **Sobrescreva** a seção `## Estado Atual` (o que funciona, o que falta, próximos passos imediatos).
   - **Adicione (append-only)** apenas 1 linha resumida na seção `## Log de Marcos` com timestamp.
3. Confirme ao usuário que o checkpoint foi salvo.

---

## 5. Design System, Cores Dinâmicas & Caixa de Diálogo
- **Estética Geral:** "NASA Telemetry HUD" combinado com expressividade de Visual Novel (*Monster Prom*).
- **Tipografia:**
  - Títulos e Nameplates: `Space Grotesk` (Bold, uppercase).
  - Corpo do Diálogo: `Inter` (`text-lg`, máximo 3 linhas por nó).
  - Dados Técnicos/Status: `JetBrains Mono` (`text-xs`).
- **Padrão de Arredondamento (HeroUI):**
  - **Obrigatório:** Todos os componentes (`Button`, `Card`, `Chip`, etc.) devem usar **`radius="sm"`** (raio small de 4px) para manter a estética angular e técnica de interface espacial. Nunca utilize arredondamentos grandes (`lg`, `full`).
- **Sistema de Temas Dinâmicos por Planeta (HeroUI Themes):**
  - O tema reage globalmente ao mundo atual (`currentWorld` no Zustand):
    - **Nave / Menu (`space-default`):** Accent `#EC8501` (Laranja Solar).
    - **Cenário Lunar (`space-moon`):** Accent `#6FCEC6` (Ciano Lunar / Earthrise).
    - **Cenário Marciano (`space-mars`):** Accent `#CD4116` (Vermelho Óxido / Poeira Marciana).
  - Utilize sempre as classes e propriedades semânticas (`color="primary"`, `border-primary`, `text-primary`), pois o HeroUI já mapeia automaticamente para a cor ativa do planeta.
- **Componente `<DialogueBox/>`:**
  - Posição: Fixo na parte inferior (`bottom-6`, `max-w-4xl`, `w-11/12`, `min-h-[190px]`).
  - Superfície: Fundo escuro base (`bg-space-base/88` ou `bg-content1/88`), com `backdrop-blur-md`, borda de 1px usando a cor primária ativa e **`rounded-sm`**.
  - Nameplate/Badge: Posicionado no canto superior esquerdo da caixa, utilizando a cor primária ativa do mundo/personagem.