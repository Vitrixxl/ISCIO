const { nextui } = require("@nextui-org/react");

import type { Config } from "tailwindcss";

const config: Config = {
     content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@nextui-org/**/*.{js,ts,jsx,tsx,mdx}"],
     theme: {
          extend: {
               colors: {
                    background: "var(--background)",
                    foreground: "var(--foreground)",
                    "blue-i": "#0063af",
                    "dark-blue-i": "#014980",
                    "green-i": "#3aaa35",
                    primary: "#464382",
                    secondary: "#8680ff",
                    accent: "#7a75ff",
                    "dark-mode-border": "#212121",
                    "dark-mode-navbar": "#060606",
                    "dark-mode-background": "#080808",
                    "dark-mode-slider": "#000000",
                    "dark-mode-text": "#000000",
                    "dark-mode-hover": "#7a75ff",
                    "dark-mode-card": "#18181b",
                    "dark-mode-searcher-border": "#3f3f46",

                    "white-mode-border": "#e5e5e5",
                    "white-mode-container": "#fff",
                    "white-mode-background": "#fff",
                    "white-mode-navbar": "#fff",
                    "white-mode-slider": "#fff",
                    "white-mode-text": "#000000",
                    "white-mode-hover": "#ebebed",
                    "white-mode-card": "#18181b",
               },
               fontFamily: {
                    sans: ["var(--font-geist-sans)"],
                    mono: ["var(--font-geist-mono)"],
               },
               maxWidth: {
                    "8xl": "88rem",
               },
          },
     },
     plugins: [nextui(nextui())],
};
export default config;
