/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-red': '#db0007',
                'brand-yellow': '#ffc72c',
                'brand-dark': '#27251f',
            },
        },
    },
    plugins: [],
}
