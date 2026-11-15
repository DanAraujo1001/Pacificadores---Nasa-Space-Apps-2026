import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MEMORIES } from "../../data/memories";
import { MemorySlot } from "./MemorySlot";
export function InventoryPanel({ unlockedMemoryIds }) {
    return (_jsxs("div", { className: "w-full rounded-sm border border-primary bg-content1/95 p-3 shadow-lg backdrop-blur-md", role: "dialog", "aria-label": "Memories", children: [_jsx("h2", { className: "mb-1 font-display text-sm font-bold uppercase tracking-wide text-primary", style: { fontFamily: '"Space Grotesk", sans-serif' }, children: "Memories" }), _jsx("p", { className: "mb-3 font-mono text-xs text-foreground/60", children: "Collected when missions are cleared successfully." }), _jsx("div", { className: "grid max-h-[50vh] grid-cols-2 gap-2 overflow-y-auto", children: MEMORIES.map((memory) => (_jsx(MemorySlot, { memory: memory, unlocked: unlockedMemoryIds.includes(memory.id) }, memory.id))) })] }));
}
