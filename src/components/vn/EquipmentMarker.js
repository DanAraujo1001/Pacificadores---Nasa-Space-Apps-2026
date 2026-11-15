import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
/**
 * Marcador de equipamento pousado no cenário. O ponto da config é o centro
 * do ícone. Estágio concluído fica esmaecido e não abre de novo.
 */
export function EquipmentMarker({ label, iconSrc, completed, hotspot, onSelect, }) {
    const [iconFailed, setIconFailed] = useState(false);
    const showIcon = iconSrc !== null && !iconFailed;
    const position = {
        "--hotspot-x": hotspot.narrow.left,
        "--hotspot-y": hotspot.narrow.top,
        "--hotspot-x-md": hotspot.desktop.left,
        "--hotspot-y-md": hotspot.desktop.top,
    };
    return (_jsxs("button", { type: "button", disabled: completed, onClick: () => {
            if (completed)
                return;
            onSelect();
        }, "aria-label": completed ? `${label} (completed)` : label, style: position, className: "group absolute left-[var(--hotspot-x)] top-[var(--hotspot-y)] z-20 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-2 border-0 bg-transparent p-0 text-primary disabled:cursor-not-allowed disabled:opacity-40 md:left-[var(--hotspot-x-md)] md:top-[var(--hotspot-y-md)]", children: [_jsxs("span", { className: "relative flex size-24 items-center justify-center drop-shadow-[0_10px_14px_rgba(0,0,0,0.55)] transition-transform duration-200 group-hover:-translate-y-2 group-hover:[filter:drop-shadow(0_0_18px_currentColor)] group-disabled:transform-none group-disabled:[filter:none] md:size-40", children: [showIcon ? (_jsx("img", { src: iconSrc, alt: "", className: "size-full object-contain", draggable: false, onError: () => setIconFailed(true) })) : (_jsx("span", { className: "flex size-full items-center justify-center rounded-sm border border-primary/40 bg-background/70 px-1 text-center font-mono text-[10px] uppercase tracking-widest text-primary/70", children: label })), completed ? (_jsx("span", { className: "absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-sm border border-primary bg-background font-mono text-xs text-primary", "aria-hidden": "true", children: "\u2713" })) : null] }), _jsxs("span", { className: "rounded-sm border border-primary bg-background/80 px-2 py-1 font-display text-sm font-bold uppercase tracking-wide text-primary backdrop-blur-sm", children: [label, completed ? " · done" : ""] })] }));
}
