/**
 * Caixa de diálogo — CONFIGURAÇÃO ÚNICA (sem valores soltos nos componentes).
 *
 * Regras (obrigatórias):
 *  1) Tamanho FIXO: largura e altura constantes, iguais em TODAS as falas de
 *     todos os atos. Dimensionadas pela MAIOR fala do jogo (não pela atual).
 *  2) Posição FIXA e fora do fluxo (ancorada na base), para nunca empurrar nem
 *     causar reflow em background, sprites, ícones ou botões.
 *  3) O texto SEMPRE cabe: se não couber na fonte padrão, a fonte é reduzida
 *     (em passos de `FONT_STEP_PX`) até caber, nunca a caixa. Abaixo de
 *     `FONT_MIN_PX` não reduz mais: registra aviso no console (não corta além
 *     do overflow, que fica contido pela caixa).
 *
 * Maior fala de referência do jogo (604 caracteres): a descrição do item
 * "LRV Wire-Mesh Wheel" (empatada com "Tranquility Base Plaque"), em
 * `src/data/missions/lrv.ts` / `eagle.ts`. A altura/fonte foram escolhidas para
 * essa fala caber inteira, sem rolagem e sem cortar.
 *
 * Unidades relativas (rem/vw) para a caixa e a fonte escalarem juntas entre
 * resoluções, mantendo a proporção. Para ajustar, altere APENAS este arquivo.
 */
export const DIALOGUE_BOX = {
  /** Largura do bloco da caixa (relativa à viewport, com teto em px). */
  WIDTH: 'min(92vw, 42rem)',
  /**
   * Altura BASE histórica do painel — referência para o posicionamento dos
   * sprites (ver `SPRITE.BOTTOM_OFFSET`). Mantida separada da altura real do
   * painel para que a barra possa crescer SEM mover os sprites: o offset dos
   * sprites continua ancorado nesta base, não na altura aumentada.
   */
  BASE_PANEL_HEIGHT: 'clamp(11rem, 26vh, 15rem)',
  /**
   * Altura FIXA total do painel do diálogo (nameplate + texto + opções).
   * Aumentada em `+6rem` sobre a base para caber todo o conteúdo na FONTE
   * PADRÃO (grande e uniforme) com folga nas bordas. Os sprites NÃO se movem
   * (offset usa `BASE_PANEL_HEIGHT`); como o painel cresce além da folga de
   * 1.5rem, ele ENGOLE um pouco a base do sprite (~4.5rem), de propósito —
   * estilo Monster Prom (o personagem some atrás da barra). Relativa à viewport.
   */
  PANEL_HEIGHT: 'calc(clamp(11rem, 26vh, 15rem) + 6rem)',
  /**
   * Altura FIXA reservada só para a ÁREA DE TEXTO da fala (dentro do painel).
   * Com o painel maior, há mais espaço; descrições longas ainda são divididas
   * em partes (`useSplitItemLines`) para manter a FONTE PADRÃO.
   */
  TEXT_HEIGHT_PX: 150,
  /**
   * Tamanho de fonte PADRÃO do texto branco do diálogo (fala, descrições e
   * opções usam o MESMO tamanho, para ficar tudo uniforme).
   */
  FONT_MAX_PX: 17,
  /** Mínimo legível (px) — só proteção de borda em telas pequenas. */
  FONT_MIN_PX: 14,
  /** Passo (px) de redução da fonte no auto-fit. */
  FONT_STEP_PX: 1,
  /** Entrelinha (line-height) relativa, aplicada em qualquer tamanho de fonte. */
  LINE_HEIGHT: 1.35,
  /** Tamanho de fonte padrão do NOME do personagem (px). */
  NAME_FONT_MAX_PX: 20,
  /** Tamanho de fonte mínimo do NOME do personagem (px). */
  NAME_FONT_MIN_PX: 13,

  /*
   * Escolhas (opções do jogador) — em MODO ESCOLHA a barra mostra, de cima para
   * baixo: nome, fala e TODAS as opções, todos visíveis ao mesmo tempo, dentro
   * da barra fixa. O auto-fit mede o BLOCO INTEIRO (fala + todas as opções, com
   * quebras de linha reais, gaps e paddings) contra `CHOICE_AREA_HEIGHT` e reduz
   * a fonte (de forma proporcional entre fala e opções) até caber. Todas as
   * opções da mesma escolha usam o MESMO tamanho.
   *
   * Pior caso do jogo (referência de dimensionamento): LRV, 3 opções, ~227
   * caracteres somados (maior opção ~102), com fala relativamente longa — e
   * Eagle, cuja opção 2 quebra em 2 linhas.
   */
  /**
   * Tamanho de fonte padrão das opções de escolha — IGUAL ao do corpo do
   * diálogo (`FONT_MAX_PX`), para tudo ficar padronizado.
   */
  CHOICE_FONT_MAX_PX: 17,
  /** Mínimo legível (px) — só proteção de borda em telas pequenas. */
  CHOICE_FONT_MIN_PX: 14,
  /**
   * Altura REAL disponível para o bloco de escolha (fala + todas as opções),
   * dentro do painel fixo. É o painel inteiro menos o espaço do nameplate e do
   * preenchimento vertical (`pt`/`pb`). Em modo escolha, a fala e as opções
   * ocupam esta área (a dica de avanço fica oculta), e o auto-fit mede o bloco
   * inteiro contra esta altura. Mantém a barra com tamanho FIXO.
   */
  CHOICE_AREA_HEIGHT: 'calc(clamp(11rem, 26vh, 15rem) + 6rem - 4.5rem)',
  /** Espaçamento (em `em`) entre as opções — escala com a fonte no auto-fit. */
  CHOICE_GAP_EM: 0.6,
  /** Preenchimento vertical (em `em`) de cada opção — escala com a fonte. */
  CHOICE_PADDING_Y_EM: 0.7,
} as const;

/**
 * Posicionamento vertical dos SPRITES — CONFIGURAÇÃO ÚNICA (consumida por
 * `CharacterSprite`, para todas as cenas). Objetivo: a barra de diálogo não
 * pode cobrir nenhum sprite — a BASE de todo sprite fica acima do topo da barra,
 * com margem de segurança. O offset usa `DIALOGUE_BOX.BASE_PANEL_HEIGHT` (altura
 * histórica), para que o aumento da barra NÃO desloque os sprites.
 *
 * Regras mantidas: protagonista à esquerda, novos personagens à direita, mesma
 * linha de base, mesma escala e mesma margem lateral para todos.
 */
export const SPRITE = {
  /** Margem de segurança entre a base do sprite e o topo da barra. */
  SAFE_MARGIN: '1.5rem',
  /**
   * Deslocamento vertical (quanto a base do sprite sobe a partir do fundo da
   * tela) = altura BASE da barra + margem de segurança. Usa `BASE_PANEL_HEIGHT`
   * (não a altura aumentada) de propósito: assim a barra pôde crescer `+1rem`
   * SEM mover os sprites. A base do sprite fica a 1.5rem acima do topo da barra
   * BASE e a ~0.5rem acima do topo da barra atual (ainda sem cobrir o sprite).
   */
  BOTTOM_OFFSET: `calc(${DIALOGUE_BOX.BASE_PANEL_HEIGHT} + 1.5rem)`,
  /**
   * Altura do sprite (reduzida para caber na tela depois de subir, sem cortar o
   * topo). Mesma escala para TODOS os personagens (protagonista e novos). Antes
   * era `min(78vh, 760px)`; reduzida para compensar o deslocamento para cima.
   */
  HEIGHT: 'min(62vh, 620px)',
} as const;
