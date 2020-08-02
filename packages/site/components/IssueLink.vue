<template>
  <v-list-item :to="`issue/${milestone.path}/`" nuxt>
    <v-list-item-content>
      <v-list-item-title v-html="title" />
      <v-list-item-subtitle
        class="issue-summary"
        v-html="getSummary(milestone)"
      />
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { GHDigestMilestone } from 'site-types/GitHubApi'
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({
  name: 'IssueLink',
})
export default class IssueLink extends Vue {
  @Prop() milestone!: GHDigestMilestone

  @Prop() index!: number

  get title(): string {
    return `#${this.milestone.title} (${this.milestone.issues.totalCount}件のリンク)`
  }

  getSummary = (milestone: GHDigestMilestone): string => {
    const issues = milestone.issues

    return issues.nodes.map((issue) => issue.title).join(' / ')
  }
}
</script>

<style lang="scss" scoped>
.issue-summary {
  line-height: 1.5 !important;
}
</style>
