<template>
  <v-list-tile nuxt :to="{ name: 'issue-id', params: { id:milestone.id } }">
    <v-list-tile-content>
      <v-list-tile-title v-html="title"/>
      <v-list-tile-sub-title v-html="getSummary(milestone)"></v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script lang="ts">
import { Component, Prop, Provide, Vue } from "nuxt-property-decorator";
import { GHMilestone } from "~/store";

@Component({
  name: "issue-link"
})
export default class IssueLink extends Vue {
  @Prop() milestone: GHMilestone;

  @Prop() index: number;

  get title(): string {
    return `${this.milestone.title} (${
      this.milestone.issues.totalCount
    }件のリンク)`;
  }

  getSummary = (milestone: GHMilestone): string => {
    console.log("milestone", milestone);
    const issues = milestone.issues;

    return issues.nodes.map(issue => issue.title).join(" / ");
  };
}
</script>

