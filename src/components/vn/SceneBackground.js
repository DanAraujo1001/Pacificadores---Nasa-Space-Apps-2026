import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
/**
 * Fundo de cena com fallback resiliente: se o arquivo não existir (ou `src`
 * for null), mostra um placeholder sólido com o nome do asset visível, sem
 * quebrar a tela. Mesmo padrão usado em `GameScreen`, agora centralizado.
 */
export function SceneBackground({ src, placeholderLabel }) {
    // O estado de erro é resetado na troca de asset pela `key` no componente pai.
    const [failed, setFailed] = useState(false);
    const showImage = src !== null && !failed;
    if (showImage) {
        return (_jsx("img", { src: src, alt: "", className: "absolute inset-0 size-full object-cover", draggable: false, onError: () => setFailed(true) }));
    }
    return (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-[#1A161D]", "aria-hidden": "true", children: _jsx("span", { className: "font-mono text-xs uppercase tracking-widest text-primary/50", children: placeholderLabel }) }));
}
