import type { ScreenState } from "../../store/useGameStore";

interface HomeLinksPanelProps {
  /** Navega para uma tela (fecha o menu e dispara o fade). */
  onNavigate?: (screen: ScreenState) => void;
}

/**
 * Link do menu da Home. `screen` definido → item navegável (botão); senão,
 * âncora ainda não ligada (`href`), mantida como estava.
 */
const LINKS: ReadonlyArray<{
  id: string;
  label: string;
  screen?: ScreenState;
  href?: string;
}> = [
  { id: "team", label: "Team", screen: "team" },
  { id: "pitch", label: "Pitch video", href: "#pitch" },
];

export function HomeLinksPanel({ onNavigate }: HomeLinksPanelProps) {
  const itemClass =
    "cursor-pointer rounded-sm px-3 py-2.5 text-left text-sm font-medium text-foreground outline-none transition-colors hover:bg-primary hover:text-white focus-visible:bg-primary focus-visible:text-white";

  return (
    <div
      className="w-full rounded-sm border border-primary bg-content1/95 p-2 shadow-lg backdrop-blur-md"
      role="menu"
      aria-label="Menu"
    >
      <nav className="flex flex-col gap-1">
        {LINKS.map((link) =>
          link.screen ? (
            <button
              key={link.id}
              type="button"
              role="menuitem"
              onClick={() => onNavigate?.(link.screen!)}
              className={itemClass}
            >
              {link.label}
            </button>
          ) : (
            <a
              key={link.id}
              href={link.href}
              role="menuitem"
              className={itemClass}
            >
              {link.label}
            </a>
          ),
        )}
      </nav>
    </div>
  );
}
