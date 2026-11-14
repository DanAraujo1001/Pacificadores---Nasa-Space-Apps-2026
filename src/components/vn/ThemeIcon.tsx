import type { CSSProperties } from "react";

interface ThemeIconProps {
  src: string;
  className?: string;
  label?: string;
}

export function ThemeIcon({ src, className = "", label }: ThemeIconProps) {
  const maskStyle: CSSProperties = {
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
  };

  return (
    <span
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`inline-block bg-primary ${className}`}
      style={maskStyle}
    />
  );
}
