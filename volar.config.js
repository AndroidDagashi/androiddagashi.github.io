/** @type {import('@volar-plugins/prettier')} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { volarPrettierPlugin } = require('@volar-plugins/prettier')

module.exports = {
  plugins: [
    // to properly format tailwindcss classes
    // https://github.com/tailwindlabs/tailwindcss/discussions/6284
    // https://github.com/johnsoncodehk/volar/issues/1448
    volarPrettierPlugin({
      languages: ['html', 'postcss', 'css', 'scss', 'typescript', 'javascript'],
      html: {
        breakContentsFromTags: true,
      },
      // useVscodeIndentation: true,
    }),
  ],
}
