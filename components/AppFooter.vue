<template>
  <v-footer
    height="auto">
    <v-flex
      xs12
      py-3
      text-xs-center>
      &copy;{{ (new Date()).getUTCFullYear() }} — <strong>{{ title }}</strong>
    </v-flex>
  </v-footer>
</template>
<script lang="ts">
import { mapState } from 'vuex';
import Component from 'nuxt-class-component';
import Vue from 'vue';

@Component({
  name: 'app-footer',
  computed: mapState(["title"])
})
export default class AppFooter extends Vue {
  title: string;
}
</script>


