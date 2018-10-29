<template>
  <v-toolbar
    color="indigo"
    dark
    fixed
    app
  >
    <v-toolbar-title>
      <nuxt-link
        class="title white--text"
        style="text-decoration:none;"
        to="/"
      >
        {{ title }}
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <v-btn
        :href="rssUrl"
        flat
        target="_blank"
      >RSS</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import Component from 'nuxt-class-component';
import Vue from 'vue';

@Component({
  name: "app-header",
  computed: mapState(["title", "rssUrl"])
})
export default class AppHeader extends Vue {
  title!: string;
  rssUrl!: string;
}
</script>

<style scoped>
.title {
  padding-left: 20px;
}
</style>
