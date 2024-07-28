/** @type {import('@volar-service-prettier')} */

module.exports = {
  services: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('volar-service-prettier').create(
      {
        languages: [
          'html',
          'postcss',
          'css',
          'scss',
          'typescript',
          'javascript',
        ],
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
