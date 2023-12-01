/* eslint @typescript-eslint/no-var-requires: "off", no-undef: "off" */
import { siteConfig } from 'site-config'
import { defineNuxtConfig } from '@nuxt/bridge'
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

// dedupe via Set
const issueIds = Array.from(
  new Set<string>(
    indexJson.milestones.nodes.map((milestone) => `/issue/${milestone.path}`)
  )
)

const config = defineNuxtConfig({
  target: 'static',
  runtimeConfig: {
    public: {
      ...siteConfig,
      apiEndpoint: baseUrl,
    },
  },
  app: {
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
          content: siteConfig.title,
        },
        { property: 'og:type', content: 'website' },
        { property: 'twitter:card', content: 'summary' },
        {
          property: 'twitter:site',
          content: `@${siteConfig.contact.name}`,
        },
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
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap',
        },
      ],
    },
  },
  /*
   * Customize the progress-bar color
   */
  loading: { color: '#3B8070' },

  css: [],

  build: {
    transpile: ['iconify-icon'],
  },

  generate: {
    fallback: '404.html',
    // routes: issueIds,
  },
  nitro: {
    static: true,
    prerender: {
      routes: issueIds,
    },
  },
  router: {
    prefetchLinks: false,
    prefetchPayloads: false,
    routes: issueIds.map((path) => ({ route: path, payload: {} })),
  },
  modules: [],
  buildModules: ['@nuxtjs/tailwindcss'],
  plugins: [
    { src: '~/plugins/api.client.ts', mode: 'client' },
    { src: '~/plugins/api.server.ts', mode: 'server' },
    '~/plugins/markdownit.ts',
    '~/plugins/iconify-icon.ts',
    { src: '~/plugins/ga.ts', mode: 'client' },
    { src: '~/plugins/init.client.ts', mode: 'client' },
  ],
  tailwindcss: {
    viewer: false,
    configPath: '~/tailwind.config.cjs',
  },
  // https://github.com/nuxt/telemetry
  telemetry: true,

  alias: {},

  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['@types/gtag.js'],
      },
    },
  },

  bridge: {
    // vite: true,
    capi: true,
    meta: true,
    nitro: true,
    typescript: true,
    // vite: true,
  },
})

export default config
