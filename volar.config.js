/** @type {import('@volar-services-prettier')} */

module.exports = {
  plugins: [
    // to properly format tailwindcss classes
    // https://github.com/tailwindlabs/tailwindcss/discussions/6284
    // https://github.com/johnsoncodehk/volar/issues/1448
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('volar-service-prettier').default(
      {
        languages: ['html', 'css', 'scss', 'typescript', 'javascript'],
        html: {
          breakContentsFromTags: true,
        },
        ignoreIdeOptions: true,
      },
      // provide your prettier options, otherwise auto resolve config file by plugin
      () => ({
        // ...
      })
    ),
  ],
}
