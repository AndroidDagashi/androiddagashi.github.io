<template>
  <v-layout row justify-center align-center>
    <v-flex xs12 sm12 md8>
      <v-card>
        <v-card-title class="headline">{{ milestone.title }}</v-card-title>
        <!-- <v-card-text v-if="milestone.description" v-html="milestone.description"/> -->
        <v-card-text>
          <div>
            <template v-for="(item, index) in issuesWithDivider">
              <v-divider v-if="item.isDivider" :key="index"/>
              <article class="mt-3" v-else :key="item.id">
                <div>
                  <h1 v-html="item.title" class="mb-1"/>
                  <div class="text-xs-left mb-2">
                    <issue-label
                    v-for="(label, index) in item.labels.nodes"
                    :key="index"
                    :labelInfo="label"
                    :index="index"/>
                  </div>
                  <vue-markdown
                    class="px-3 issue-body"
                    :anchorAttributes="{ target: '_blank' }"
                    >{{ item.body }}</vue-markdown>
                </div>
              </article>
            </template>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { mapState } from "vuex";
import { GHMilestone, GHLabel } from "store";
import flatmap from "lodash.flatmap";
import VueMarkdown from "vue-markdown"
import IssueLabel from "~/components/IssueLabel.vue"

@Component({
  name: "issue",
  computed: mapState(["milestones"]),
  components: {
    VueMarkdown,
    IssueLabel
  }
})
export default class Issue extends Vue {
  milestones: GHMilestone[];

  get milestoneId(): string {
    return this.$route.params.id;
  }

  get milestone(): GHMilestone {
    return this.milestones.filter(
      (value, index, array) => value.id == this.milestoneId
    )[0];
  }

  get issuesWithDivider() {
    return flatmap(this.milestone.issues.nodes, (value, index, array) => [
      { isDivider: true },
      value
    ]);
  }
}
</script>

<style scoped>
  .issue-body {
    word-break: break-all;
  }
</style>
