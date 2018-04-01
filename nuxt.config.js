const nodeExternals = require('webpack-node-externals');
const parseArgs = require('minimist');

const indexJson = require('./static/api/index.json');

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
  ? `http://${host}:${port}` : process.env.BASE_URL || `http://${host}:${port}`;


const issueIds = indexJson.milestones.nodes.map((milestone, index, array) => `/issue/${milestone.title}`);

module.exports = {
  env: {
    baseUrl: baseUrl,
    GH_REPO_OWNER: process.env.GH_REPO_OWNER,
    GH_REPO_NAME: process.env.GH_REPO_NAME,
    RSS: 'https://twitrss.me/twitter_user_to_rss/?user=AndroidDagashi'
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
        rel: 'styleSheet',
        type: 'text/css',
        href: 'https://cdn.materialdesignicons.com/2.1.19/css/materialdesignicons.min.css'
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
      configs.node = configs.node || {};
      configs.node['fs'] = 'empty';
    }
  },
  generate: {
    fallback: true,
    routes: issueIds
  },
  modules: [
    '@nuxtjs/axios',
    '~/modules/typescript.js'
  ],
  plugins: [
    '~/plugins/github-api-v3.ts',
    '~/plugins/vuetify.ts',
    { src: '~/plugins/ga.js', ssr: false }
  ],
  axios: {}
};
