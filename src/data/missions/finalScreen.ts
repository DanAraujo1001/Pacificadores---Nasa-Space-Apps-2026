import { BACKGROUND_ASSETS } from '../../config/sceneAssets';

/**
 * FINAL SCREEN (encerramento do jogo).
 *
 * Texto VERBATIM do roteiro-fonte (echoes_of_astra_game_script.md):
 *
 *   ### FINAL SCREEN:
 *   > "Abandoned, Yet Never Forgotten."
 *
 * Esta é a tela de encerramento que aparece DEPOIS das falas do Final Act.
 * O texto é exibido com a MESMA fonte do nome do jogo ("Echoes of Astra" no
 * MenuScreen): família `Space Grotesk` via classe `font-display`, peso bold e
 * uppercase, cor `text-primary`. Nada de fonte nova ou valores soltos — a
 * renderização reaproveita a tipografia do título (ver `FinalScreen`).
 */
export const FINAL_SCREEN = {
  id: 'final-screen',
  /** Fundo da tela final (placeholder automático enquanto o arquivo não existe). */
  backgroundAsset: BACKGROUND_ASSETS.finalScreen,
  backgroundPlaceholderLabel: 'Final Screen',
  /** Frase de encerramento, exatamente como no roteiro. */
  title: 'Abandoned, Yet Never Forgotten.',
  /**
   * Tempo total (ms) que a tela fica visível antes de voltar ao menu sozinha.
   * Cobre fade-in, leitura e fade-out. Ajuste aqui (sem valores soltos no
   * componente).
   */
  holdMs: 5000,
} as const;
