module.exports = {
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@nuxtjs'
  ],
  rules: {
    '@typescript-eslint/indent': [
      "error",
      2
    ],
    '@typescript-eslint/no-unused-vars': [
      "warn",
      {
        "args": "after-used"
      }
    ]
  }
}
