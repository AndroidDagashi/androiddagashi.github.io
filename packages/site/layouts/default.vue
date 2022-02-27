<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
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
import { mapState, mapGetters } from 'vuex'
import { defineComponent } from '@vue/composition-api'
import AppHeader from '~/components/organisms/AppHeader/index.vue'
import AppFooter from '~/components/organisms/AppFooter/index.vue'

import * as GetterTypes from '~/store/GetterTypes'

export default defineComponent({
  components: { AppHeader, AppFooter },
  computed: {
    ...mapState(['title', 'rssUrl', 'description', 'contact']),
    ...mapGetters({ authors: GetterTypes.GET_AUTHORS }),
  },
})
</script>
