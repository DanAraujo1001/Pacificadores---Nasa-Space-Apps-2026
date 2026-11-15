import { jsx as _jsx } from "react/jsx-runtime";
export function ThemeIcon({ src, className = "", label }) {
    const maskStyle = {
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
    };
    return (_jsx("span", { role: label ? "img" : "presentation", "aria-label": label, "aria-hidden": label ? undefined : true, className: `inline-block bg-primary ${className}`, style: maskStyle }));
}
