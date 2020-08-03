<template>
  <v-footer height="auto">
    <v-flex xs12 py-3 text-center>
      &copy;{{ new Date().getUTCFullYear() }} —
      <strong>{{ title }}</strong>
    </v-flex>
  </v-footer>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'AppFooter',
  computed: {
    ...mapState(['title']),
  },
})
</script>
