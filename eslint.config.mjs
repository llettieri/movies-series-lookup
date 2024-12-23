import prettier from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ['**/manifest.ts', '**/.github'],
}, ...compat.extends(
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
), {
    plugins: {
        prettier,
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
    },

    rules: {
        'no-empty': ['error'],
        'no-empty-character-class': ['error'],
        'no-empty-pattern': ['error'],
        'no-ex-assign': ['error'],
        'no-extra-boolean-cast': ['error'],
        'no-extra-semi': ['error'],
        'no-fallthrough': ['error'],
        'no-func-assign': ['error'],
        'no-global-assign': ['error'],
        'no-import-assign': ['error'],
        'no-inner-declarations': ['error'],
        'no-invalid-regexp': ['error'],
        'no-irregular-whitespace': ['error'],
        'no-loss-of-precision': ['error'],
        'no-misleading-character-class': ['error'],
        'no-mixed-spaces-and-tabs': ['error'],
        'no-new-symbol': ['error'],
        'no-nonoctal-decimal-escape': ['error'],
        'no-obj-calls': ['error'],
        'no-octal': ['error'],
        'no-prototype-builtins': ['error'],
        'no-redeclare': ['error'],
        'no-regex-spaces': ['error'],
        'no-self-assign': ['error'],
        'no-setter-return': ['error'],
        'no-shadow-restricted-names': ['error'],
        'no-sparse-arrays': ['error'],
        'no-this-before-super': ['error'],
        'no-undef': ['error'],
        'no-unexpected-multiline': ['error'],
        'no-unreachable': ['error'],
        'no-unsafe-finally': ['error'],
        'no-unsafe-negation': ['error'],
        'no-unsafe-optional-chaining': ['error'],
        'no-unused-labels': ['error'],
        'no-unused-vars': ['error'],
        'no-useless-backreference': ['error'],
        'no-useless-catch': ['error'],
        'no-useless-escape': ['error'],
        'no-with': ['error'],
        'require-yield': ['error'],
        'use-isnan': ['error'],
        'valid-typeof': ['error'],
        quotes: ['error', 'single'],
        semi: ['error'],
        indent: ['error', 4],
        'require-await': ['warn'],
        'no-console': ['warn'],
        'no-duplicate-imports': ['error'],
        camelcase: ['warn'],
        '@typescript-eslint/explicit-function-return-type': ['warn'],
        '@typescript-eslint/method-signature-style': ['error'],
    },
}];