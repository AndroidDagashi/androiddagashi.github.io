<template>
  <v-app>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-title>Android Dagashi</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <nuxt/>
      </v-container>
    </v-content>
    <v-footer app height="auto">
      <v-flex xs12 py-3 text-xs-center>
        &copy;2018 — <strong>Android Dagashi</strong>
      </v-flex>
    </v-footer>
    <span v-if="didMount">
      <script async defer src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
    </span>
  </v-app>
</template>

<script lang="ts">
import AppHeader from "~/components/AppHeader.vue";
import AppFooter from "~/components/AppFooter.vue";
import { Component, Prop, Provide, Vue } from "nuxt-property-decorator";

@Component({
  name: "default-layout",
  components: {
    AppHeader,
    AppFooter
  }
})
export default class DefaultLayout extends Vue {
  message = "this is message2";
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
