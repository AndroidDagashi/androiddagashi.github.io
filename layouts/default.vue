<template>
  <v-app>
    <v-toolbar
      color="indigo"
      dark
      fixed
      app>
      <v-toolbar-title>
        <nuxt-link
          class="title white--text"
          style="text-decoration:none;"
          to="/">
          Android Dagashi
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <v-btn
          :href="rss"
          flat
          target="_blank">RSS(仮)</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container
        fluid
        fill-height
        justify-center>
        <nuxt/>
      </v-container>
    </v-content>
    <v-footer
      height="auto">
      <v-flex
        xs12
        py-3
        text-xs-center>
        &copy;2018 — <strong>Android Dagashi</strong>
      </v-flex>
    </v-footer>
    <span v-if="didMount">
      <script
        async
        defer
        src="//platform.twitter.com/widgets.js"
        charset="utf-8"/>
    </span>
  </v-app>
</template>

<script lang="ts">
import AppHeader from '~/components/AppHeader.vue';
import AppFooter from '~/components/AppFooter.vue';
import { mapState } from 'vuex';
import Component from 'nuxt-class-component';
import Vue from 'vue';

@Component({
  name: "default-layout",
  computed: mapState(["rss"]),
  components: {
    AppHeader,
    AppFooter
  }
})
export default class DefaultLayout extends Vue {
  rss: string;
  didMount = false;

  async mounted() {
    this.didMount = true;
  }
}
</script>

<style scoped>
.title {
  padding-left: 20px;
}
</style>
