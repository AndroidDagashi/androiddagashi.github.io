/* eslint @typescript-eslint/no-var-requires: "off", no-undef: "off" */
import { defineNuxtConfig } from 'nuxt/config'
import { siteConfig } from 'site-config'
import { renderOGPMeta } from './app/utils/ogp'
import fs from 'node:fs'

function readJson(path: string) {
  return JSON.parse(fs.readFileSync(path, 'utf-8'))
}

const indexJson = readJson('./public/api/index.json')

let pageInfo = indexJson.milestones.pageInfo
while (pageInfo.hasNextPage) {
  const next = readJson(`./public/api/${pageInfo.endCursor}.json`)
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
    indexJson.milestones.nodes.map((milestone) => {
      return `/issue/${milestone.path}/`
    })
  )
)

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  // Nuxt 4 スタイルのディレクトリ構造を使用
  srcDir: 'app',
  // Nuxt 4 では public/ はデフォルトで rootDir から解決される

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'iconify-icon',
    },
  },

  ssr: true,

  runtimeConfig: {
    public: {
      ...siteConfig,
      apiEndpoint: baseUrl,
    },
  },

  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: 'append',
      },
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

  css: [],

  /*
   * Build configuration
   */
  build: {
    // analyze: true,
    transpile: ['iconify-icon', 'date-fns', 'markdown-it', 'cookie-es'],
  },

  // generate: {
  //   fallback: '404.html',
  //   // @ts-ignore
  //   // routes: issueIds,
  // },
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/', ...issueIds],
    },
  },


  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/eslint'],

  tailwindcss: {
    viewer: false,
    configPath: './tailwind.config.cjs',
  },

  telemetry: {},

  devtools: { enabled: true },
  compatibilityDate: '2025-03-25',

})
