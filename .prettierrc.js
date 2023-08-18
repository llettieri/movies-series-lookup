module.exports = {
    semi: true,
    tabWidth: 4,
    singleQuote: true,
    trailingComma: "all",
    arrowParens: "always",
    endOfLine: "crlf",
    plugins: [require("prettier-plugin-import-sort"), "prettier-plugin-tailwindcss"]
}