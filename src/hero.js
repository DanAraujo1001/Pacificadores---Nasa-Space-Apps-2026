import { heroui } from "@heroui/theme";
export default heroui({
    defaultTheme: "dark",
    layout: {
        radius: {
            small: "4px",
            medium: "6px",
            large: "8px",
        },
        borderWidth: {
            small: "1px",
            medium: "1px",
            large: "2px",
        },
    },
    themes: {
        "space-default": {
            extend: "dark",
            colors: {
                background: "#0E0C0F",
                foreground: "#F1F5F9",
                content1: "#1A161D",
                primary: {
                    DEFAULT: "#EC8501",
                    foreground: "#0E0C0F",
                },
            },
        },
        "space-moon": {
            extend: "dark",
            colors: {
                background: "#0E0C0F",
                foreground: "#F1F5F9",
                content1: "#1A161D",
                primary: {
                    DEFAULT: "#6FCEC6",
                    foreground: "#0E0C0F",
                },
            },
        },
        "space-mars": {
            extend: "dark",
            colors: {
                background: "#0E0C0F",
                foreground: "#F1F5F9",
                content1: "#1A161D",
                primary: {
                    DEFAULT: "#CD4116",
                    foreground: "#F1F5F9",
                },
            },
        },
    },
});
