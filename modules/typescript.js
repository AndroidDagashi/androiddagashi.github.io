/**
 * typescript module for Nuxt.js
 * @returns {Void} void
 */
export default function () {
  // Add .ts extension for store, middleware and more
  this.nuxt.options.extensions.push('ts');
  // Extend build
  this.extendBuild(config => {
    const tsLoader = {
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/]
      },
      exclude: [
        /dist/,
        /vendor/,
        /\.temp/,
        /\.nuxt/
      ]
    };
    // Add TypeScript loader
    config.module.rules.push(
      Object.assign(
        {
          test: /((client|server)\.js)|(\.tsx?)$/
        },
        tsLoader
      )
    );
    // Add .ts extension in webpack resolve
    if (config.resolve.extensions.indexOf('.ts') === -1) {
      config.resolve.extensions.push('.ts');
    }
  });
}
