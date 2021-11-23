module.exports = {
    env: {
        browser: true,
        es2021: true,
        commonjs: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/warnings',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 13,
        sourceType: "module"
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'react-hooks',
        'simple-import-sort'
    ],
    rules: {
        'import/order': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'simple-import-sort/imports': 'error',
        'react/prop-types': 'off',
        'import/no-default-export': 'error',
        'import/default': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            },
        },
        react: {
            version: 'detect',
        },
    },
};
