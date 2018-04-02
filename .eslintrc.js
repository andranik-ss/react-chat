module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    browser: true,
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'warn',
    quotes: ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
  },
};
