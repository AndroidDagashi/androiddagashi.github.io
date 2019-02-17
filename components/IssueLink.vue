<template>
  <v-list-tile :to="`issue/${milestone.path}/`" nuxt>
    <v-list-tile-content>
      <v-list-tile-title v-html="title"/>
      <v-list-tile-sub-title v-html="getSummary(milestone)"/>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script lang="ts">
import { GHDigestMilestone } from "types/GitHubApi";
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({
  name: "issue-link"
})
export default class IssueLink extends Vue {
  @Prop() milestone!: GHDigestMilestone;

  @Prop() index!: number;

  get title(): string {
    return `#${this.milestone.title} (${
      this.milestone.issues.totalCount
    }件のリンク)`;
  }

  getSummary = (milestone: GHDigestMilestone): string => {
    const issues = milestone.issues;

    return issues.nodes.map(issue => issue.title).join(" / ");
  };
}
</script>

