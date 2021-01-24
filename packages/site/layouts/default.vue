<template>
  <v-app>
    <AppHeader :title="title" :rss-url="rssUrl" />
    <v-main class="primary--text">
      <v-container fluid fill-height justify-center>
        <nuxt />
      </v-container>
    </v-main>
    <AppFooter :title="title" />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import AppHeader from '~/components/organisms/AppHeader/index.vue'
import AppFooter from '~/components/organisms/AppFooter/index.vue'

export default Vue.extend({
  name: 'DefaultLayout',
  components: { AppHeader, AppFooter },
  computed: {
    ...mapState(['title', 'rssUrl']),
  },
})
</script>
