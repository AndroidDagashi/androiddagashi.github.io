<template>
  <footer id="footer" class="bg-gray-100 text-gray-800">
    <div
      class="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:flex md:items-center md:justify-between lg:px-8"
    >
      <SiteDescription :title="title" :authors="authors" :contact="contact" />
    </div>
    <div
      class="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:flex md:items-center md:justify-between lg:px-8"
    >
      <!-- links -->
      <ul class="flex justify-center space-x-6 md:order-2">
        <li v-for="(link, index) in links" :key="index">
          <a :href="link.url" target="_blank" class="inline-block h-6 w-6">
            <iconify-icon :icon="link.icon" width="24" />
            <span class="sr-only">{{ link.name }}</span>
          </a>
        </li>
      </ul>
      <div class="mt-8 text-center font-medium md:order-1 md:mt-0 md:text-left">
        <p>
          &copy; 2018-{{ new Date().getUTCFullYear() }} <span>{{ title }}</span>
        </p>
      </div>
    </div>
  </footer>
</template>
<script lang="ts">
import type { LinkInfo, TwitterInfo } from 'site-types/SiteConfig'
import type { PropType } from '@vue/composition-api'
import { defineComponent } from '@vue/composition-api'
import SiteDescription from '~/components/organisms/SiteDescription/index.vue'

export default defineComponent({
  name: 'AppFooter',
  components: { SiteDescription },
  props: {
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: Array as PropType<TwitterInfo[]>,
      required: true,
    },
    contact: {
      type: Object as PropType<TwitterInfo>,
      required: true,
    },
    links: {
      type: Array as PropType<LinkInfo[]>,
      required: true,
    },
  },
})
</script>
