module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            light: "#FFFFFF",
            main_blue: "#004f9b",
            main_orange: "#fb7448",
            main_black: "#1a1d29",
            main_yellow: "#FFF200",
            main_red: "#BC0F0F",
            gray: { 50: "#e7e7e7", 100: "#F1F1F1", 200: "#6F6F6F" },
            blue: { 100: "#e6eef5" },
            green: { 100: "#b0ff80", 200: "#61FF00" },
            yellow: { 100: "#fff880", 200: "#FFF000" },
            red: { 100: "#ff8080", 200: "#FF0000" },
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}