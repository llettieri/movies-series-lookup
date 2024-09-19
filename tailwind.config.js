import flowbite from 'flowbite-react/tailwind';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        flowbite.content()
    ],
    theme: {
        extend: {
            colors: {
                primary: '#8a2be2',
                primaryHover: '#671fa8',
                standard: '#f5f5f5',
                primaryTint: '#b95eda',
                secondary: '#00ced1',
                secondaryText: 'rgba(130,254,255,0.78)',
                secondaryTint: '#00ffff',
                base100: '#3F324C',
                neutral: '#4C3165',
                accent: '#58307E',
            },
        },
    },
    plugins: [
        flowbite.plugin()
    ]
};
