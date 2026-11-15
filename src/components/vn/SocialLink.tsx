import { ThemeIcon } from "./ThemeIcon";

interface SocialLinkProps {
  /** Caminho do ícone (SVG em `public/assets/icons/`). */
  iconSrc: string;
  /** URL de destino. Vazia = link pendente (ícone desabilitado, sem navegação). */
  href: string;
  /** Rótulo acessível, ex.: "LinkedIn de Fulano". */
  label: string;
}

/**
 * Link de rede social com ícone, no visual do jogo (cor primária via `ThemeIcon`).
 *
 * - Abre em nova aba com `rel="noopener noreferrer"` (não afeta o estado do jogo).
 * - Área de clique confortável, estados de hover/foco (teclado) e clique.
 * - URL vazia: renderiza o ícone DESABILITADO (sem `<a>`), evitando link quebrado.
 */
export function SocialLink({ iconSrc, href, label }: SocialLinkProps) {
  if (!href) {
    return (
      <span
        className="pointer-events-none inline-flex size-9 items-center justify-center rounded-sm border border-primary/20 opacity-30"
        aria-label={`${label} (em breve)`}
        aria-disabled="true"
      >
        <ThemeIcon src={iconSrc} className="h-5 w-5" />
      </span>
    );
  }

  return (
    // `group` + inversão no hover/foco: o quadrado preenche com a cor primária e
    // o ícone fica escuro (cor do fundo base), invertendo com o quadrado.
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group inline-flex size-9 cursor-pointer items-center justify-center rounded-sm border border-primary/40 bg-transparent outline-none transition-colors hover:bg-primary focus-visible:bg-primary focus-visible:ring-2 focus-visible:ring-primary"
    >
      <ThemeIcon
        src={iconSrc}
        className="h-5 w-5 bg-primary transition-colors group-hover:bg-[#0E0C0F] group-focus-visible:bg-[#0E0C0F]"
      />
    </a>
  );
}
