<template>
  <div class="flex min-h-screen flex-col bg-gray-50">
    <AppHeader :title="title" :rss-url="rssUrl" />
    <nuxt class="flex-grow" />
    <AppFooter
      :title="title"
      :authors="authors"
      :contact="contact"
      :links="$config.links"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import AppHeader from '~/components/organisms/AppHeader/index.vue'
import AppFooter from '~/components/organisms/AppFooter/index.vue'

export default defineComponent({
  components: { AppHeader, AppFooter },
  data() {
    return {
      title: this.$config.title,
      description: this.$config.description,
      rssUrl: this.$config.rssUrl,
      contact: this.$config.contact,
      authors: this.$config.authors,
    }
  },
})
</script>
