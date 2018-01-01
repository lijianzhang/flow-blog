module.exports = {
    "extends": "airbnb-base",
    parser: "babel-eslint",
    plugins: ["flowtype"],
    rules: {
        "global-require": 0,
        "import/no-dynamic-require": 0,
        'class-methods-use-this': 0,
        'max-len': [2, 120],
        'no-param-reassign': 0,
        'no-mixed-operators': 0,
        'no-underscore-dangle': 0,
        indent: [2, 4, { SwitchCase: 0 }],
        'import/no-dynamic-require': 0,
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'no-shadow': 0,
        'camelcase': 0,
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-debugger': 0,
        'flowtype/use-flow-type': 1,
    }
};