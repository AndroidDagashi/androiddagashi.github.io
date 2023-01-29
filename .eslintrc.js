/* eslint-env node */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    browser: true,
    'jest/globals': true,
  },
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    'import/no-named-as-default-member': 'off',
  },
}
