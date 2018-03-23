const nodeExternals = require('webpack-node-externals');
const parseArgs = require('minimist');
const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: 'hostname',
    p: 'port'
  },
  string: ['H'],
  unknown: parameter => false
});

const port =
  argv.port ||
  process.env.PORT ||
  process.env.npm_package_config_nuxt_port ||
  '3000';
const host =
  argv.hostname ||
  process.env.HOST ||
  process.env.npm_package_config_nuxt_host ||
  'localhost';

const baseUrl = process.env.NODE_ENV === 'dev'
  ? `http://${host}:${port}` : process.env.BASE_URL || `http://${host}:${port}`

const tokenA = process.env.GH_READONLY_TOKEN.slice(0, 10);
const tokenB = process.env.GH_READONLY_TOKEN.slice(10);
module.exports = {
  env: {
    baseUrl: baseUrl,
    // GH_READONLY_TOKEN: process.env.GH_READONLY_TOKEN,
    GHRT_A: tokenA,
    GHRT_B: tokenB,
    GH_REPO_OWNER: process.env.GH_REPO_OWNER,
    GH_REPO_NAME: process.env.GH_REPO_NAME
  },
  head: {
    title: 'Android Dagashi',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Weekly Android development news digest in Japanese'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  css: [
    '~/assets/css/main.css',
    '~/assets/css/app.styl'
  ],
  build: {
    extend(configs, ctx) {
      if (ctx.isServer) {
        configs.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ];
      }
    }
  },
  generate: {
    fallback: true
  },
  modules: [
    '@nuxtjs/axios',
    '~/modules/typescript.js'
  ],
  plugins: [
    '~/plugins/github-api-v3.ts',
    '~/plugins/androiddagashi-api.ts',
    '~/plugins/vuetify.ts'
  ],
  axios: {}
};
