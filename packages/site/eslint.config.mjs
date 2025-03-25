import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  files: ['**/*.vue', '**/*.ts'],
  rules: {
    'no-console': 'warn',
  },
})
