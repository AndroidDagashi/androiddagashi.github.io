module.exports = {
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs'
  ],
  rules: {
    'vue/no-v-html': 'off',
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-unused-vars': ['warn', {'args': 'after-used'}]
  }
}
