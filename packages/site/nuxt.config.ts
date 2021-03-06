/* eslint @typescript-eslint/no-var-requires: "off", no-undef: "off" */
import { NuxtConfig } from '@nuxt/types'
import nodeExternals from 'webpack-node-externals'
import parseArgs from 'minimist'
import { siteConfig } from 'site-config'
import { renderOGPMeta } from './utils/ogp'

const indexJson = require('./static/api/index.json')

let pageInfo = indexJson.milestones.pageInfo
while (pageInfo.hasNextPage) {
  const next = require(`./static/api/${pageInfo.endCursor}.json`)
  indexJson.milestones.nodes = indexJson.milestones.nodes.concat(
    next.milestones.nodes
  )
  pageInfo = next.milestones.pageInfo
}

const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: 'hostname',
    p: 'port',
  },
  string: ['H'],
  unknown: () => false,
})

const port =
  argv.port ||
  process.env.PORT ||
  process.env.npm_package_config_nuxt_port ||
  '3000'
const host =
  argv.hostname ||
  process.env.HOST ||
  process.env.npm_package_config_nuxt_host ||
  'localhost'

const isDev = process.env.NODE_ENV === 'development'
// const isProd = process.env.NODE_ENV === 'production'

const baseUrl = isDev
  ? `http://${host}:${port}`
  : siteConfig.baseUrl || `http://${host}:${port}`

const issueIds = indexJson.milestones.nodes.map(
  (milestone) => `/issue/${milestone.path}`
)

const config: NuxtConfig = {
  target: 'static',
  publicRuntimeConfig: siteConfig,
  head: {
    title: siteConfig.title,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        property: 'og:site_name',
        hid: 'og:site_name',
        content: siteConfig.title,
      },
      { property: 'og:type', hid: 'og:type', content: 'website' },
      ...renderOGPMeta({
        title: siteConfig.title,
        description: siteConfig.description,
        image: `${siteConfig.baseUrl}/image/logo.jpg`,
      }),
    ],
    link: [
      {
        rel: 'shortcut icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'styleSheet',
        type: 'text/css',
        href: 'https://cdn.materialdesignicons.com/2.1.19/css/materialdesignicons.min.css',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
      },
    ],
  },
  /*
   * Customize the progress-bar color
   */
  loading: { color: '#3B8070' },
  /*
   * Build configuration
   */
  css: ['~assets/css/main.css'],
  build: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    extend(configs, ctx): void {
      if (ctx.isServer) {
        configs.externals = [
          nodeExternals({
            allowlist: [/^vuetify/],
          }),
        ]
      }
      configs.node = configs.node || {}
      configs.node.fs = 'empty'
    },
  },
  generate: {
    fallback: true,
    routes: issueIds,
  },
  modules: ['@nuxtjs/axios'],
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  plugins: [
    '~/plugins/api',
    '~/plugins/markdownit.ts',
    { src: '~/plugins/ga.js', ssr: false },
    { src: '~/plugins/init.client.ts', mode: 'client' },
  ],
  axios: {
    baseURL: baseUrl,
  },
  vuetify: {
    treeShake: true,
    optionsPath: './vuetify.options.ts',
  },
  // https://github.com/nuxt/telemetry
  telemetry: true,
}

export default config
