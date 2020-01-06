module.exports = {
    root: true,
    env: {
        node: true
    },

    globals: {
        "ELEMENT": true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'eslint-disable-next-line': 0,
        'eslint-disable': 0,
        'semi': 0,
        'indent': ["off", 4],
        'quotes': 0,
        'one-var': 0,
        'space-before-function-paren': 0,
        'no-multiple-empty-lines': 0,
        'no-multi-spaces': 0,
        'no-useless-call': 0,
    },
}
