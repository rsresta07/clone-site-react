// tailwind.config.js
module.exports = {
    content: [
        "./src/**/*.{html,js,jsx,ts,tsx}", // Add your file paths here
    ],
    theme: {
        extend: {
            colors: {
                "dark-bg": "#1d1d1d",
                "light-gray": "#ccc",
                "link-color": "#00b4d8",
            },
            fontFamily: {
                sans: ["Arimo", "Arial", "Helvetica", "sans-serif"],
            },
        },
    },
    plugins: [],
};
