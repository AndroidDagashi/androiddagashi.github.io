module.exports = {
  root: false,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'plugin:nuxt/recommended',
  ],
  plugins: [],
  // add your custom rules here
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
