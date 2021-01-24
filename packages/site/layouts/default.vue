<template>
  <v-app>
    <AppHeader />
    <v-main class="primary--text">
      <v-container fluid fill-height justify-center>
        <nuxt />
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'

export default Vue.extend({
  name: 'DefaultLayout',
  components: { AppHeader, AppFooter },
})
</script>

<style scoped></style>
