/**
 * Tela TEAM — configuração central (caminhos de fotos e dimensões das molduras).
 *
 * As fotos são servidas a partir de `public/` (ex.:
 * `public/assets/team/arthur.png` → `/assets/team/arthur.png`). Para ativar uma
 * foto, basta colocar o arquivo final na pasta `public/assets/team/` com o nome
 * esperado abaixo — nenhum código precisa mudar. Enquanto o arquivo não existir,
 * a moldura fica vazia (sem erro), com o espaço já reservado (sem salto de layout).
 *
 * Proporção recomendada da foto: QUADRADA (1:1), pois a moldura é quadrada e a
 * imagem é recortada com `object-cover` (preenche e centraliza, sem distorcer).
 */

/** Caminhos das fotos de cada integrante (quadradas, recomendadas 512×512). */
export const TEAM_PHOTOS = {
  arthur: "/assets/team/arthur.jpeg",
  danilo: "/assets/team/danilo.jpeg",
  lucas: "/assets/team/lucas.jpeg",
  victor: "/assets/team/victor.jpeg",
} as const;

export type TeamPhotoKey = keyof typeof TEAM_PHOTOS;

/**
 * Tamanhos da moldura (`PhotoFrame`) por contexto, para não haver valores soltos
 * nos componentes. A tela Team usa `lg` (maior que a de Memories).
 */
export const PHOTO_FRAME_SIZE = {
  /** Usado na tela Memories (referência do tamanho original). */
  sm: "w-full max-w-[9rem]",
  /** Usado na tela Team (molduras maiores). */
  lg: "w-full max-w-[14rem]",
} as const;

export type PhotoFrameSize = keyof typeof PHOTO_FRAME_SIZE;
