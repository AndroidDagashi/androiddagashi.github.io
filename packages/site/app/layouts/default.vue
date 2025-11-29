<template>
  <div class="flex min-h-screen flex-col bg-gray-50">
    <AppHeader :title="title" :rss-url="rssUrl" />
    <slot class="flex-grow" />
    <AppFooter
      :title="title"
      :authors="authors"
      :contact="contact"
      :links="links"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { LinkInfo, TwitterInfo } from 'site-types/SiteConfig'
import { useNuxtApp } from '#imports'
import AppHeader from '~/components/organisms/AppHeader/index.vue'
import AppFooter from '~/components/organisms/AppFooter/index.vue'

export default defineComponent({
  components: { AppHeader, AppFooter },
  setup() {
    const app = useNuxtApp()

    return {
      title: app.$config.public.title,
      description: app.$config.public.description,
      rssUrl: app.$config.public.rssUrl,
      contact: app.$config.public.contact,
      authors: app.$config.public.authors as TwitterInfo[],
      links: app.$config.public.links as LinkInfo[],
    }
  },
})
</script>
