<template>
  <div class="flex min-h-screen flex-col bg-gray-50">
    <AppHeader :title="$config.public.title" :rss-url="$config.public.rssUrl" />
    <nuxt class="flex-grow" />
    <AppFooter
      :title="$config.public.title"
      :authors="$config.public.authors"
      :contact="$config.public.contact"
      :links="$config.public.links"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '~/components/organisms/AppHeader/index.vue'
import AppFooter from '~/components/organisms/AppFooter/index.vue'

export default defineComponent({
  components: { AppHeader, AppFooter },
})
</script>
