/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                gray: {
                    100: "#f3f4f6", // Light mode background
                    800: "#1f2937", // Dark mode background
                    900: "#111827", // Dark mode card/nav background
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
