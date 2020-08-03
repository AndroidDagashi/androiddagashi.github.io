<template>
  <v-app>
    <AppHeader />
    <v-main class="primary--text">
      <v-container fluid fill-height justify-center>
        <nuxt />
      </v-container>
    </v-main>
    <AppFooter />
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
import Vue from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'

interface DefaultLayoutData {
  didMount: boolean
}

export default Vue.extend({
  name: 'DefaultLayout',
  components: { AppHeader, AppFooter },
  data(): DefaultLayoutData {
    return {
      didMount: false,
    }
  },
  mounted() {
    this.didMount = true
  },
})
</script>

<style scoped></style>
