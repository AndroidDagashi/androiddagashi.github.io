<template>
  <v-app-bar color="indigo" dark fixed app>
    <v-toolbar-title>
      <nuxt-link
        class="text-h6 white--text"
        style="text-decoration: none;"
        to="/"
      >
        {{ title }}
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <v-btn :href="rssUrl" text target="_blank">
        RSS
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'AppHeader',
  computed: {
    ...mapState(['title', 'rssUrl']),
  },
})
</script>

<style scoped>
.title {
  padding-left: 20px;
}
</style>
