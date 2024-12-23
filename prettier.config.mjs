import exports from 'prettier-plugin-import-sort';

const config = {
    semi: true,
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'all',
    arrowParens: 'always',
    plugins: [exports, 'prettier-plugin-tailwindcss']
};

export default config;