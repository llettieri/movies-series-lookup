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
                base100: '#333333',
                neutral: '#444444',
                accent: '#9e9e9e',
            },
        },
    },
    daisyui: {
        themes: [
            {
                dark: {
                    primary: '#8a2be2',
                    secondary: '#00ced1',
                    accent: '#9e9e9e',
                    neutral: '#444444',
                    base100: '#333333',
                    info: '#22c55e',
                    success: '#00ffff',
                    warning: '#facc15',
                    error: '#991b1b',
                },
            },
        ],
    },
    plugins: [require('daisyui')],
};
