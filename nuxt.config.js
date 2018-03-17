const nodeExternals = require('webpack-node-externals')
const parseArgs = require("minimist")
const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: "hostname",
    p: "port"
  },
  string: ["H"],
  unknown: parameter => false
})

const port =
  argv.port ||
  process.env.PORT ||
  process.env.npm_package_config_nuxt_port ||
  "3000"
const host =
  argv.hostname ||
  process.env.HOST ||
  process.env.npm_package_config_nuxt_host ||
  "localhost"
module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || `http://${host}:${port}`,
    GH_READONLY_TOKEN: process.env.GH_READONLY_TOKEN,
    GH_REPO_OWNER: process.env.GH_REPO_OWNER,
    GH_REPO_NAME: process.env.GH_REPO_NAME
  },
  head: {
    title: "tt1",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Nuxt.js project"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
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
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  css: [
    "~/assets/css/main.css",
    "~/assets/css/app.styl"
  ],
  build: {
    extend(configs, ctx) {
      if (ctx.isServer) {
        configs.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  },
  modules: [
    "@nuxtjs/axios",
    '@nuxtjs/apollo',
    "~/modules/typescript.js"
  ],
  plugins: [
    "~/plugins/github-api-v3.ts",
    "~/plugins/vuetify.ts"
  ],
  axios: {},
  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.ts'
    }
  }
}
