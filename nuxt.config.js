/* eslint typescript/no-var-requires: "off" */
import nodeExternals from 'webpack-node-externals';
import parseArgs from 'minimist';
import yaml from 'js-yaml';
import fs from 'fs';

const siteConfigs = yaml.safeLoad(fs.readFileSync('./siteconfig.yml', 'utf8'));
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

const baseUrl = process.env.NODE_ENV === 'development'
  ? `http://${host}:${port}` : siteConfigs.baseUrl || `http://${host}:${port}`;


const issueIds = indexJson.milestones.nodes.map((milestone, index, array) => `/issue/${milestone.title}`);

module.exports = {
  env: {
    SITE_CONFIG: JSON.stringify(siteConfigs)
  },
  head: {
    title: siteConfigs.title,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: siteConfigs.description
      }
    ],
    link: [
      {
        rel: 'shortcut icon',
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
    '~assets/css/main.css',
    '~assets/css/app.styl'
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
    '~/modules/typescript'
  ],
  plugins: [
    '~/plugins/vuetify.ts',
    '~/plugins/markdownit.ts',
    { src: '~/plugins/ga.js', ssr: false }
  ],
  axios: {
    baseURL: baseUrl
  }
};
