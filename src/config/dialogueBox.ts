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
 * Maiores falas do jogo: as descrições de item (catálogo `src/data/items.ts`,
 * ~600 caracteres, ex.: "Tranquility Base Plaque"). Elas não reduzem a fonte:
 * são divididas em falas consecutivas que cabem na altura fixa
 * (`useSplitItemLines`). As demais falas cabem na fonte padrão.
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
 * Enquadramento da CENA (letterbox) — CONFIGURAÇÃO ÚNICA.
 *
 * `TOP_BAR_HEIGHT` é a faixa preta no topo das cenas lineares (Ato 0, intro do
 * Ato 1, Final Act), para combinar com o topo preto do hub do Ato 1 (onde a
 * arte do cockpit, com proporção fixa, deixa uma faixa `#0E0C0F` acima dela).
 * Relativa à viewport para manter a proporção entre resoluções.
 */
const TOP_BAR_HEIGHT = '8.5vh';

export const SCENE = {
  TOP_BAR_HEIGHT,
  /**
   * Altura do PAINEL SUPERIOR (área da cena: background + sprites) — proporção
   * ÚNICA e central para TODAS as telas entre atos (Ato 0, seleção na nave,
   * seleção de equipamento, estágios, telas de escolha, tela de item obtido,
   * Ato Final). Referência: as cenas de diálogo (`LinearSceneScreen`/
   * `StageScreen`), em que a área da cena é a viewport menos a barra fixa. Assim
   * a proporção painel-superior : barra fica igual em todas as telas, sem alturas
   * soltas por tela. Relativa à viewport (vh) para todas as resoluções.
   *
   * = 100vh menos a barra de diálogo fixa (`DIALOGUE_BOX.PANEL_HEIGHT`).
   */
  UPPER_PANEL_HEIGHT: `calc(100vh - (${DIALOGUE_BOX.PANEL_HEIGHT}))`,
  /**
   * Distância do rótulo do placeholder de fundo (ex.: "STAGE: SPIRIT (GUSEV
   * CRATER)") a partir do topo: logo abaixo da faixa preta, fora do centro da
   * cena, para nunca ficar sob o item em destaque nem sob os sprites.
   */
  PLACEHOLDER_LABEL_TOP: `calc(${TOP_BAR_HEIGHT} + 1rem)`,
} as const;

/**
 * Tela de ITEM OBTIDO — CONFIGURAÇÃO ÚNICA da posição/tamanho do item em
 * destaque e dos raios de brilho (consumida por `ItemReward`).
 *
 * O item fica centralizado na horizontal (entre o protagonista, à esquerda, e
 * o equipamento, à direita) e na vertical dentro da faixa livre entre a faixa
 * preta superior (`TOP`) e o topo da barra de diálogo (`BOTTOM`). Como essa
 * faixa termina no topo da barra, nem o item nem os raios cobrem a barra. Os
 * tamanhos são limitados pela altura e pela largura da viewport para o ícone
 * caber no vão entre os sprites quando há vão (Eagle, Spirit, Phoenix). O item
 * é desenhado à frente dos sprites porque o sprite do LRV ocupa o centro.
 */
export const ITEM_REWARD = {
  /** Topo da faixa do item = fim da faixa preta superior. */
  TOP: TOP_BAR_HEIGHT,
  /** Base da faixa do item = topo da barra de diálogo fixa. */
  BOTTOM: DIALOGUE_BOX.PANEL_HEIGHT,
  /** Lado do ícone do item (quadrado). */
  ICON_SIZE: 'min(20vh, 18vw, 13rem)',
  /** Diâmetro da área dos raios, relativo ao ícone. */
  RAYS_SCALE: 1.9,
  /** Quantidade de raios (alternando longos e curtos). */
  RAY_COUNT: 16,
  /** Duração (s) de um ciclo da pulsação suave dos raios. */
  PULSE_S: 2.4,
  /** Duração (s) de uma volta completa da rotação lenta dos raios. */
  ROTATE_S: 48,
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
