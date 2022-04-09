/* eslint @typescript-eslint/no-var-requires: "off", no-undef: "off" */
import { defineNuxtConfig } from '@nuxt/bridge'
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

const port =
  process.env.PORT || process.env.npm_package_config_nuxt_port || '3000'
const host =
  process.env.HOST || process.env.npm_package_config_nuxt_host || 'localhost'

const isDev = process.env.NODE_ENV === 'development'
// const isProd = process.env.NODE_ENV === 'production'

const baseUrl = isDev
  ? `http://${host}:${port}`
  : siteConfig.baseUrl || `http://${host}:${port}`

const issueIds = indexJson.milestones.nodes.map(
  (milestone) => `/issue/${milestone.path}`
)

const config = defineNuxtConfig({
  target: 'static',
  publicRuntimeConfig: {
    ...siteConfig,
    apiEndpoint: baseUrl,
  },
  head: {
    title: siteConfig.title,
    htmlAttrs: {
      lang: 'ja',
    },
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
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true,
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap',
      },
    ],
  },
  /*
   * Customize the progress-bar color
   */
  loading: { color: '#3B8070' },

  css: [],

  hooks: {
    'webpack:config'(configs): void {
      configs.forEach((config) => {
        if (config.name === 'client') {
          config.node = config.node || {}
          config.node.fs = 'empty'
        }
      })
    }
  },

  /*
   * Build configuration
   */
  build: {
    // analyze: true,
    transpile: [
      'twitter-text'
    ],
    // "webpackHotUpdate is not defined" workaround
    // https://github.com/nuxt/framework/issues/1309
    optimization: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      runtimeChunk: true,
      splitChunks: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        name: true,
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    // transpile: ['@iconify/vue2'],
  },
  generate: {
    fallback: '404.html',
    routes: issueIds,
  },
  modules: [],
  buildModules: ['@nuxtjs/tailwindcss'],
  plugins: [
    '~/plugins/composition-api.ts',
    '~/plugins/api',
    '~/plugins/markdownit.ts',
    { src: '~/plugins/ga.ts', ssr: false },
    { src: '~/plugins/init.client.ts', mode: 'client' },
  ],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  tailwindcss: {
    viewer: false,
    configPath: '~/tailwind.config.cjs',
  },
  // https://github.com/nuxt/telemetry
  telemetry: true,
})

export default config
