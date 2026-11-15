import { useState } from "react";
import { PHOTO_FRAME_SIZE, type PhotoFrameSize } from "../../config/teamAssets";

interface PhotoFrameProps {
  /** Caminho da imagem a exibir. Se não carregar (ou vazio), a moldura fica vazia. */
  src?: string;
  /** Texto alternativo da imagem (acessibilidade). */
  alt: string;
  /** Tamanho da moldura (config central). `sm` = Memories, `lg` = Team. */
  size?: PhotoFrameSize;
}

/**
 * Moldura de foto no mesmo visual da tela Memories (borda primária, cantos
 * `rounded-sm`, fundo escuro), parametrizada por tamanho — sem duplicar estilos.
 *
 * - Espaço reservado desde o início (`aspect-square`): a foto, quando carregar,
 *   NÃO causa salto de layout.
 * - A imagem preenche e centraliza sem distorcer (`object-cover`).
 * - Sem foto (arquivo ausente ou `src` vazio): moldura vazia, sem placeholder
 *   de texto e sem erro no console.
 * - Imagem não selecionável/arrastável (regra global; reforçado aqui).
 */
export function PhotoFrame({ src, alt, size = "sm" }: PhotoFrameProps) {
  const [failed, setFailed] = useState(false);
  const showImage = !!src && !failed;

  return (
    <div
      className={`${PHOTO_FRAME_SIZE[size]} aspect-square overflow-hidden rounded-sm border border-primary/60 bg-[#0E0C0F]/60`}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          className="size-full object-cover object-top"
          draggable={false}
          onError={() => setFailed(true)}
        />
      ) : null}
    </div>
  );
}
