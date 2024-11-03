const flowbite = require("flowbite-react/tailwind")

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/renderer/index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
    theme: {
        extend: {}
    },
    plugins: [flowbite.plugin()]
}
