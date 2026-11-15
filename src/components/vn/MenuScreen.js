import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@heroui/react";
import { useGameStore } from "../../store/useGameStore";
import { HomeLinksPanel } from "./HomeLinksPanel";
import { InventoryPanel } from "./InventoryPanel";
import { ThemeIcon } from "./ThemeIcon";
const HOME_IMAGE = "/assets/images/image-home-teste.png";
const enterContainer = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.2,
        },
    },
};
const enterItem = {
    hidden: { opacity: 0, y: 18 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};
export function MenuScreen() {
    const fadeToScreen = useGameStore((state) => state.fadeToScreen);
    const setWorld = useGameStore((state) => state.setWorld);
    const resetProgress = useGameStore((state) => state.resetProgress);
    const unlockedMemoryIds = useGameStore((state) => state.unlockedMemoryIds);
    const [menuOpen, setMenuOpen] = useState(false);
    const [imageFailed, setImageFailed] = useState(false);
    const headerRef = useRef(null);
    useEffect(() => {
        setWorld("ship");
    }, [setWorld]);
    useEffect(() => {
        if (!menuOpen)
            return;
        const handlePointerDown = (event) => {
            if (!headerRef.current?.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handlePointerDown);
        return () => document.removeEventListener("mousedown", handlePointerDown);
    }, [menuOpen]);
    return (_jsxs("section", { className: "relative flex h-screen w-full flex-col items-start justify-center overflow-hidden bg-background px-6 py-16 text-foreground md:px-10 lg:px-16", children: [_jsx(motion.div, { ref: headerRef, className: "absolute right-4 top-4 z-30 md:right-6 md:top-6", initial: { opacity: 0, y: -12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }, children: _jsxs("div", { className: "relative", children: [_jsx(Button, { variant: "outline", size: "lg", onPress: () => setMenuOpen((open) => !open), className: "group h-12 cursor-pointer rounded-sm border border-primary bg-transparent px-5 text-primary transition-colors hover:bg-primary hover:text-primary-foreground data-[hovered=true]:bg-primary data-[hovered=true]:text-primary-foreground", "aria-expanded": menuOpen, "aria-haspopup": "menu", children: _jsxs("span", { className: "inline-flex items-center justify-center gap-4", children: [_jsx("span", { className: "text-sm font-medium", children: "Menu" }), _jsx(ThemeIcon, { src: "/assets/icons/icon-bag.svg", className: "h-8 w-8 transition-colors group-hover:bg-primary-foreground group-data-[hovered=true]:bg-primary-foreground" })] }) }), _jsx(AnimatePresence, { children: menuOpen ? (_jsxs(motion.div, { className: "absolute right-0 top-full z-40 mt-2 flex w-[min(92vw,22rem)] origin-top-right flex-col gap-2", initial: { opacity: 0, y: -8, scale: 0.96 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -6, scale: 0.98 }, transition: { duration: 0.2, ease: "easeOut" }, children: [_jsx(HomeLinksPanel, {}), _jsx(InventoryPanel, { unlockedMemoryIds: unlockedMemoryIds })] }, "home-menu-dropdown")) : null })] }) }), _jsxs(motion.div, { className: "relative z-20 flex w-full max-w-md flex-col items-center gap-8 text-center md:ml-16 lg:ml-24 xl:ml-32", variants: enterContainer, initial: "hidden", animate: "show", children: [_jsxs(motion.div, { variants: enterItem, children: [_jsx("p", { className: "mb-2 font-mono text-sm uppercase tracking-[0.2em] text-primary/70 md:text-base", children: "NASA Space Apps 2026" }), _jsx("h1", { className: "font-display text-4xl font-bold uppercase tracking-wide text-primary md:text-5xl lg:text-6xl", children: "Echoes of Astra" }), _jsx("p", { className: "mt-3 max-w-md text-sm text-foreground/70 md:text-base", children: "Forgotten hardware. Stories that still echo." })] }), _jsx(motion.div, { variants: enterItem, className: "play-shine-border text-primary", children: _jsx(Button, { variant: "primary", size: "lg", onPress: () => {
                                resetProgress();
                                fadeToScreen("name-entry");
                            }, className: "min-h-14 min-w-[260px] cursor-pointer rounded-sm border-0 bg-[#0E0C0F] px-12 py-5 text-lg font-semibold text-white transition-colors hover:bg-primary/90 data-[hovered=true]:bg-primary/90", children: "Play" }) })] }), _jsx(motion.div, { className: "pointer-events-none absolute bottom-0 right-[-2%] z-10 flex w-[min(96vw,56rem)] items-end justify-end md:right-[2%] md:w-[min(62vw,60rem)] lg:right-[4%] lg:w-[min(58vw,66rem)]", initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }, children: _jsxs("div", { className: "relative flex w-full items-end justify-center", children: [_jsx("div", { className: "pointer-events-none absolute bottom-[8%] left-1/2 h-[55%] w-[70%] -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl", "aria-hidden": "true" }), _jsx("div", { className: "pointer-events-none absolute bottom-[12%] left-1/2 h-[45%] w-[60%] -translate-x-1/2 rounded-full bg-yellow-300/8 blur-3xl", "aria-hidden": "true" }), _jsx("div", { className: "pointer-events-none absolute bottom-[18%] left-1/2 h-[35%] w-[50%] -translate-x-1/2 rounded-full bg-yellow-200/5 blur-2xl", "aria-hidden": "true" }), imageFailed ? (_jsx("div", { className: "relative z-10 mb-0 flex aspect-square w-full max-w-[42rem] items-center justify-center rounded-sm border border-primary/30 bg-content1/40 backdrop-blur-md md:max-w-[52rem]", "aria-hidden": "true", children: _jsx("span", { className: "font-display text-xs uppercase tracking-widest text-primary", children: "Astra" }) })) : (_jsxs(_Fragment, { children: [_jsx("img", { src: HOME_IMAGE, alt: "", "aria-hidden": "true", className: "pointer-events-none absolute bottom-0 z-0 w-full object-contain object-bottom opacity-10 blur-2xl brightness-125 sepia-[0.35] saturate-150 hue-rotate-[-10deg]", draggable: false }), _jsx(motion.img, { src: HOME_IMAGE, alt: "Echoes of Astra", className: "relative z-10 w-full origin-bottom object-contain object-bottom drop-shadow-[0_0_28px_rgba(255,255,255,0.08)]", draggable: false, animate: { scale: [1, 1.045, 1] }, transition: {
                                        duration: 4.5,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                    }, onError: () => setImageFailed(true) })] }))] }) })] }));
}
