const LINKS = [
  { id: "team", label: "Team", href: "#team" },
  { id: "pitch", label: "Pitch video", href: "#pitch" },
  { id: "credits", label: "Credits", href: "#credits" },
] as const;

export function HomeLinksPanel() {
  return (
    <div
      className="w-full rounded-sm border border-primary bg-content1/95 p-2 shadow-lg backdrop-blur-md"
      role="menu"
      aria-label="Menu"
    >
      <nav className="flex flex-col gap-1">
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={link.href}
            role="menuitem"
            className="rounded-sm px-3 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
