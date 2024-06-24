module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base'],
  rules: {
    'import/prefer-default-export': 'off',
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['element'] },
    ],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
  },
};
