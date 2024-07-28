<template>
  <header class="bg-white font-roboto text-gray-800">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="lg:borrder-none flex w-full items-center justify-between border-b border-gray-200 py-3">
        <h1>
          <nuxt-link to="/" class="flex items-center">
            <ADAvatar image-url="/image/logo.jpg" class="border border-gray-200" />
            <span class="ml-3 text-2xl font-medium">{{ title }}</span>
          </nuxt-link>
        </h1>

        <!-- TODO: hamburger on smaller device -->
        <div class="ml-10 space-x-4 font-semibold">
          <a href="#footer" class="hidden sm:inline">ABOUT</a>
          <a :href="rssUrl" target="_blank" class="">RSS</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ADAvatar from '~/components/atoms/ADAvatar/index.vue'

export default defineComponent({
  name: 'AppHeader',
  components: { ADAvatar },
  props: {
    title: {
      type: String,
      required: true,
    },
    rssUrl: {
      type: String,
      required: true,
    },
  },
})
</script>
