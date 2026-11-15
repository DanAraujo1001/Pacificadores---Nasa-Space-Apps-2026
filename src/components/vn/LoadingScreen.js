import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../../store/useGameStore";
import { delay, LOADING_MIN_DURATION_MS, preloadAssets, } from "../../engine/preload";
const ICON_SIZE_PX = 80;
/** Duração de um ciclo de preenchimento (loop infinito até a próxima tela). */
const FILL_CYCLE_SECONDS = 1.2;
/** Pausa mínima entre o reset e o próximo fill. */
const FILL_REPEAT_DELAY_SECONDS = 0.08;
export function LoadingScreen() {
    const setScreen = useGameStore((state) => state.setScreen);
    const [iconFailed, setIconFailed] = useState(false);
    useEffect(() => {
        let cancelled = false;
        void (async () => {
            // Animação segue em loop; só avançamos quando a próxima tela estiver pronta
            // e o tempo mínimo de loading tiver passado.
            await Promise.all([delay(LOADING_MIN_DURATION_MS), preloadAssets()]);
            if (!cancelled) {
                setScreen("menu");
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [setScreen]);
    return (_jsx("section", { role: "status", "aria-busy": "true", "aria-label": "Carregando", className: "relative min-h-screen w-full bg-background text-foreground", children: _jsx("div", { className: "absolute bottom-6 right-6", style: { width: ICON_SIZE_PX, height: ICON_SIZE_PX }, children: iconFailed ? (_jsx("div", { className: "size-full rounded-sm bg-primary", "aria-hidden": "true" })) : (_jsxs("div", { className: "relative size-full", "aria-hidden": "true", children: [_jsx("img", { src: "/assets/icons/icon-base.svg", alt: "", className: "absolute inset-0 size-full object-contain", draggable: false, onError: () => setIconFailed(true) }), _jsx(motion.div, { className: "absolute inset-0", animate: {
                            clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
                        }, transition: {
                            duration: FILL_CYCLE_SECONDS,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: FILL_REPEAT_DELAY_SECONDS,
                        }, children: _jsx("img", { src: "/assets/icons/icon-base-filled.png", alt: "", className: "size-full object-contain", draggable: false, onError: () => setIconFailed(true) }) })] })) }) }));
}
