<template>
  <v-app>
    <app-header/>
    <v-content>
      <v-container fluid fill-height justify-center>
        <nuxt/>
      </v-container>
    </v-content>
    <app-footer/>
    <span v-if="didMount">
      <script async defer src="//platform.twitter.com/widgets.js" charset="utf-8"/>
    </span>
  </v-app>
</template>

<script lang="ts">
import AppHeader from "~/components/AppHeader.vue";
import AppFooter from "~/components/AppFooter.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "default-layout",
  components: {
    AppHeader,
    AppFooter
  }
})
export default class DefaultLayout extends Vue {
  didMount = false;

  async mounted() {
    this.didMount = true;
  }
}
</script>

<style scoped>
</style>

