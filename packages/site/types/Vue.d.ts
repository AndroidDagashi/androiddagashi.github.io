import type MarkdownIt from 'markdown-it'
import type { Route } from 'vue-router'

declare module 'vue/types/vue' {
  interface Vue {
    $md: MarkdownIt
    $route: Route
  }
}
