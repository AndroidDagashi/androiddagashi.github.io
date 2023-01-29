module.exports = {
  root: false,
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
  plugins: ['import'],
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:import/typescript',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  rules: {
    'vue/no-v-html': 'off',
    'no-unused-vars': 'off',
    'import/no-named-as-default-member': 'off',
  },
  overrides: [
    {
      files: ['pages/**/*.vue', 'layouts/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
  ],
}
