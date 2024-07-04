const os = require('os');

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    // Prettier integration
    'prettier/prettier': ['error', { endOfLine: 'auto' }],

    // Styling rules
    'arrow-body-style': 'off',
    'import/extensions': ['error', 'ignorePackages', { js: 'always' }],
    'import/prefer-default-export': 'off',
    'linebreak-style': ['error', os.EOL === '\r\n' ? 'windows' : 'unix'],

    // Essential rules
    'no-underscore-dangle': [
      'error',
      { allow: ['__filename', '__dirname'], allowAfterThis: true },
    ],
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['element'] },
    ],
    'no-restricted-globals': [
      'error',
      {
        name: 'history',
        message: 'Use window.history instead of directly using history.',
      },
    ],
  },
  plugins: ['prettier'],
};
