import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ThemeIcon } from "./ThemeIcon";
export function MemorySlot({ memory, unlocked }) {
    return (_jsxs("article", { className: `flex flex-col gap-2 rounded-sm border p-3 ${unlocked
            ? "border-primary/60 bg-content1/80"
            : "border-primary/20 bg-content1/40 opacity-70"}`, children: [_jsx("div", { className: "flex aspect-square items-center justify-center overflow-hidden rounded-sm bg-[#0E0C0F]/60", children: unlocked && memory.thumbnail ? (_jsx("img", { src: memory.thumbnail, alt: memory.title, className: "size-full object-cover", draggable: false })) : unlocked ? (_jsx(ThemeIcon, { src: "/assets/icons/icon-star-1.svg", className: "h-10 w-8", label: memory.title })) : (_jsx(ThemeIcon, { src: "/assets/icons/icon-bag.svg", className: "h-10 w-10 opacity-40" })) }), unlocked ? (_jsxs("div", { className: "text-left", children: [_jsx("h3", { className: "font-display text-xs font-bold uppercase tracking-wide text-primary", style: { fontFamily: '"Space Grotesk", sans-serif' }, children: memory.title }), _jsx("p", { className: "mt-1 text-[11px] leading-snug text-foreground/80", children: memory.description })] })) : (_jsx("p", { className: "font-mono text-center text-xs text-primary/50", children: "???" }))] }));
}
