export type WorldId = 'ship' | 'moon' | 'mars';

/** Equipamento / estágio de missão visitável. */
export type StageId = 'eagle' | 'lrv' | 'spirit' | 'phoenix';

/** Situação do nó de diálogo atual (também usada pela trilha). */
export type DialoguePhase = 'normal' | 'clear' | 'game-over';

/**
 * Eventos narrativos que disparam uma trilha sonora específica.
 * Cada estágio e ato do roteiro (echoes_of_astra_game_script.md) é um evento.
 */
export type GameEvent =
  | 'prologue' // ACT 0: sótão, chuva
  | 'hub' // ACT 1: seleção de missão (ECO)
  | 'stage-eagle' // STAGE 1: Lua — Eagle (Apollo 11)
  | 'stage-lrv' // STAGE 2: Lua — LRVs
  | 'stage-spirit' // STAGE 3: Marte — Spirit
  | 'stage-phoenix' // STAGE 4: Marte — Phoenix
  | 'stage-clear' // Sucesso de um estágio
  | 'game-over' // Evento falhou / sinal perdido
  | 'final'; // FINAL ACT: resolução

/**
 * Identificadores de personagens com fala no roteiro
 * (echoes_of_astra_game_script.md). O protagonista é parametrizado por nome,
 * mas seu id é estável para posicionamento e configuração.
 */
export type CharacterId =
  | '' // vazio: legado / nó sem personagem definido
  | 'protagonist'
  | 'grandpa-tadeu'
  | 'eco'
  | 'narrator'
  | 'eagle'
  | 'lrv'
  | 'spirit'
  | 'phoenix';

/** Lado da tela onde o sprite do personagem é ancorado. */
export type CharacterSide = 'left' | 'right';

/**
 * Configuração central e única de um personagem: nome exibido, lado da tela,
 * caminho do sprite e rótulo do placeholder. Consumida por todas as cenas,
 * para que posição/alinhamento não fiquem espalhados em vários arquivos.
 */
export interface CharacterConfig {
  id: CharacterId;
  /** Nome exibido no nameplate da caixa de diálogo. */
  displayName: string;
  side: CharacterSide;
  /** Caminho do sprite final (pode ainda não existir em disco). */
  spriteAsset: string | null;
  /** Texto mostrado no placeholder quando o sprite não existe. */
  placeholderLabel: string;
  /**
   * Ajuste vertical fino, só deste personagem, da BASE do sprite em relação ao
   * offset padrão (`SPRITE.BOTTOM_OFFSET`). Um valor CSS positivo (ex.: "2rem")
   * ABAIXA o sprite (reduz o offset); negativo sobe. Opcional: quando ausente,
   * usa o offset padrão compartilhado por todos. Não altera a posição dos demais.
   */
  spriteBottomNudge?: string;
}

/** Uma fala de uma cena linear (sem escolhas), como o Ato 0. */
export interface ScriptLine {
  id: string;
  /** Quem fala. null = narração / rubrica sem personagem em cena. */
  speakerId: CharacterId | null;
  text: string;
  /**
   * Quando definido, o personagem entra em cena a partir desta fala.
   * Usado para controlar continuidade (quem está em cena e quando).
   */
  entersCharacterId?: CharacterId;
  /** Quando true, o personagem indicado sai de cena após esta fala. */
  exitsCharacterId?: CharacterId;
  /**
   * Quando true, esta fala é uma DESCRIÇÃO DE ITEM. Descrições usam o mesmo
   * tamanho de fonte dos diálogos comuns (sem redução automática) e, se não
   * couberem inteiras na barra, são DIVIDIDAS em várias falas consecutivas
   * (em pontos finais de frase), em tempo de render, por medição real do layout.
   * O texto não é alterado — só dividido. Ver `useSplitItemLines`.
   */
  isItemDescription?: boolean;
  /**
   * Fala de ITEM OBTIDO: id do item do catálogo (`src/data/items.ts`). Enquanto
   * esta fala (ou qualquer parte dela, se dividida) estiver na tela, o item
   * aparece em destaque no centro da cena, e ele é concedido uma única vez.
   */
  itemId?: string;
  /**
   * Marca uma transição do capacete do protagonista A PARTIR desta fala
   * (inclusive) até a próxima transição. `'off'` mostra o sprite sem capacete
   * (`player-without-helmet.png`); `'on'` mostra o sprite normal com capacete.
   * As cenas lineares consomem isto para trocar o sprite no momento certo
   * (ex.: Ato 0 começa `off` e vira `on` quando ele coloca o capacete; o Final
   * Act vira `off` quando ele o tira). Sem marca, mantém o estado anterior.
   */
  protagonistHelmet?: "on" | "off";
  /**
   * Troca o fundo A PARTIR desta fala (inclusive) até a próxima marca.
   * Sem marca, a cena mantém o fundo anterior (o `backgroundAsset` da cena
   * no início).
   */
  backgroundAsset?: string | null;
}

/** Roteiro de uma cena linear (prólogo/epílogo). */
export interface LinearScene {
  id: string;
  world: WorldId;
  backgroundAsset: string | null;
  backgroundPlaceholderLabel: string;
  lines: ScriptLine[];
  /**
   * Quando true, o protagonista está em cena durante TODA a cena (sempre à
   * esquerda), sem precisar de `entersCharacterId` numa fala. Usado em cenas em
   * que ele já está presente do início ao fim (ex.: Final Act). Default: false.
   */
  protagonistAlwaysOnStage?: boolean;
}

/* -------------------------------------------------------------------------- */
/*  ACT 1 — Estágios com escolhas                                             */
/* -------------------------------------------------------------------------- */

/** Uma opção de escolha dentro de um estágio. */
export interface StageChoice {
  id: string;
  label: string;
  /** true = resposta correta (avança); false = leva a game-over. */
  correct: boolean;
  /**
   * Falas mostradas imediatamente após escolher (reação do personagem +
   * eventual feedback da ECO). Transcritas verbatim do roteiro.
   */
  outcomeLines: ScriptLine[];
}

/** Um passo de escolha: falas introdutórias + as opções. */
export interface StageChoiceStep {
  kind: 'choice';
  id: string;
  /** Falas que antecedem as opções (ex.: pergunta do personagem). */
  lines: ScriptLine[];
  choices: StageChoice[];
}

/** Um passo puramente narrativo (sequência de falas). */
export interface StageTalkStep {
  kind: 'talk';
  id: string;
  lines: ScriptLine[];
}

export type StageStep = StageTalkStep | StageChoiceStep;

/**
 * Roteiro completo de um estágio do Ato 1 (um equipamento).
 *
 * `steps` é a sequência correta do estágio: alterna falas e escolhas. Ao
 * acertar todas as escolhas, o jogador chega ao `clearLines` (Stage Clear) e o
 * estágio é concluído. Errar qualquer escolha dispara game-over (reiniciar).
 */
export interface StageScript {
  stageId: StageId;
  world: WorldId;
  /** Personagem-equipamento desta cena (lado direito). */
  characterId: CharacterId;
  backgroundAsset: string | null;
  backgroundPlaceholderLabel: string;
  steps: StageStep[];
  /** Falas finais de sucesso (Stage Clear), incluindo o item obtido. */
  clearLines: ScriptLine[];
}

/** Destino de missão jogável (Lua / Marte), sem a nave. */
export type DestinationId = Exclude<WorldId, 'ship'>;

/** Ponto do ícone na cena, em porcentagem do quadro (ex.: "28%"). */
export interface EquipmentHotspot {
  left: string;
  top: string;
}

/** Destino de missão (Lua / Marte) com seus equipamentos. */
export interface DestinationConfig {
  id: DestinationId;
  label: string;
  /** Estágios/equipamentos disponíveis neste destino. */
  stageIds: StageId[];
  /** Fundo da cena de escolha de equipamento. */
  backgroundAsset: string;
  /** Rótulo do placeholder se o fundo ainda não existir. */
  backgroundPlaceholderLabel: string;
  /** Planeta clicável na janela da cabine. */
  iconAsset: string;
  /**
   * Canto superior esquerdo do planeta no quadro da cabine (1519×569).
   * Tela larga e tela estreita usam a mesma proporção do fundo.
   */
  hotspot: {
    desktop: EquipmentHotspot;
    narrow: EquipmentHotspot;
  };
  /** Largura do planeta em relação ao quadro da cabine. */
  iconWidth: {
    desktop: string;
    narrow: string;
  };
  /** Altura do planeta em relação ao quadro da cabine. */
  iconHeight: {
    desktop: string;
    narrow: string;
  };
}

/** Metadados de um equipamento para o hub (ícone + rótulo). */
export interface EquipmentConfig {
  stageId: StageId;
  label: string;
  world: DestinationId;
  /** Ícone clicável do equipamento no cenário (pode não existir ainda). */
  iconAsset: string | null;
  /** Onde o marcador senta no solo: tela larga e tela estreita. */
  hotspot: {
    desktop: EquipmentHotspot;
    narrow: EquipmentHotspot;
  };
}