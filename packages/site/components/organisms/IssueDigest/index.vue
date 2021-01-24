<template>
  <v-list-item class="issue-digest" :to="`issue/${milestone.path}/`" nuxt>
    <v-list-item-content>
      <v-list-item-title v-html="title" />
      <v-list-item-subtitle class="issue-summary" v-html="summary" />
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { GHDigestMilestone } from 'site-types/GitHubApi'

export default Vue.extend({
  name: 'IssueDigest',
  props: {
    milestone: {
      type: Object,
      required: true,
    } as PropOptions<GHDigestMilestone>,
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    title(): string {
      return `#${this.milestone.title} (${this.milestone.issues.totalCount}件のリンク)`
    },
    summary(): string {
      const issues = this.milestone.issues
      return issues.nodes.map((issue) => issue.title).join(' / ')
    },
  },
})
</script>

<style lang="postcss" scoped>
.issue-summary {
  line-height: 1.5 !important;
}
</style>
