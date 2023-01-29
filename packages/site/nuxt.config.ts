/* eslint @typescript-eslint/no-var-requires: "off", no-undef: "off" */
import { NuxtConfig } from '@nuxt/types'
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

const config: NuxtConfig = {
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

  /*
   * Build configuration
   */
  build: {
    // analyze: true,
    extend(configs, ctx): void {
      if (ctx.isClient) {
        configs.node = configs.node || {}
        configs.node.fs = 'empty'
      }

      // .cjs seems not to be transpiled(and iconify-icon failed to load).
      // https://github.com/nuxt/nuxt.js/issues/10339
      // https://github.com/nuxt-community/i18n-module/issues/1443
      // PR(https://github.com/nuxt/nuxt.js/pull/10340) has already been merged, so should be fixed in next release(2.16.0).
      configs.resolve?.extensions?.push('.cjs')
      const orig = configs.module!.rules![2]!.exclude! as (
        path: string
      ) => boolean
      configs.module!.rules[2].test = /\.(m|c)?jsx?$/i
      configs.module!.rules[2].exclude = function (file) {
        const res = orig(file)
        if (res) return !/ufo/.test(file)
        return res
      }
    },
    transpile: ['iconify-icon'],
  },
  generate: {
    fallback: true,
    routes: issueIds,
  },
  modules: [],
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss'],
  plugins: [
    '~/plugins/composition-api.ts',
    '~/plugins/api',
    '~/plugins/markdownit.ts',
    '~/plugins/iconify-icon.ts',
    { src: '~/plugins/ga.js', ssr: false },
    { src: '~/plugins/init.client.ts', mode: 'client' },
  ],
  tailwindcss: {
    viewer: false,
    configPath: '~/tailwind.config.cjs',
  },
  // https://github.com/nuxt/telemetry
  telemetry: true,
}

export default config
