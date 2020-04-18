<template>
  <v-app-bar color="indigo" dark fixed app>
    <v-toolbar-title>
      <nuxt-link
        class="title white--text"
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
import { mapState } from 'vuex'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'app-header',
  computed: mapState(['title', 'rssUrl']),
})
export default class AppHeader extends Vue {
  title!: string
  rssUrl!: string
}
</script>

<style scoped>
.title {
  padding-left: 20px;
}
</style>
