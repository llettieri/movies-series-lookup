/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#8a2be2',
                primaryText: '#f5f5f5',
                primaryTint: '#b95eda',
                secondary: '#00ced1',
                secondaryText: 'rgba(130,254,255,0.78)',
                secondaryTint: '#00ffff',
                mainBackground: '#333333',
                tag: '#9E9E9E',
                navbar: '#444444',
            },
        },
    },
    plugins: [],
};
