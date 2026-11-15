import { jsx as _jsx } from "react/jsx-runtime";
const LINKS = [
    { id: "team", label: "Team", href: "#team" },
    { id: "pitch", label: "Pitch video", href: "#pitch" },
    { id: "credits", label: "Credits", href: "#credits" },
];
export function HomeLinksPanel() {
    return (_jsx("div", { className: "w-full rounded-sm border border-primary bg-content1/95 p-2 shadow-lg backdrop-blur-md", role: "menu", "aria-label": "Menu", children: _jsx("nav", { className: "flex flex-col gap-1", children: LINKS.map((link) => (_jsx("a", { href: link.href, role: "menuitem", className: "rounded-sm px-3 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white", children: link.label }, link.id))) }) }));
}
