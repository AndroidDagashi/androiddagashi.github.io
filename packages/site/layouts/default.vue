<template>
  <v-app>
    <app-header />
    <v-main class="primary--text">
      <v-container fluid fill-height justify-center>
        <nuxt />
      </v-container>
    </v-main>
    <app-footer />
    <span v-if="didMount">
      <script
        async
        defer
        src="//platform.twitter.com/widgets.js"
        charset="utf-8"
      />
    </span>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'

@Component({
  name: 'default-layout',
  components: {
    AppHeader,
    AppFooter,
  },
})
export default class DefaultLayout extends Vue {
  didMount = false

  // eslint-disable-next-line require-await
  async mounted(): Promise<void> {
    this.didMount = true
  }
}
</script>

<style scoped></style>
