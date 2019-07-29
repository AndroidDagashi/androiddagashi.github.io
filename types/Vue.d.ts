import MarkdownIt from 'markdown-it'
import { Route } from 'vue-router'

declare module 'vue/types/vue' {
  interface Vue {
    $md: MarkdownIt;
    $route: Route;
  }
}
