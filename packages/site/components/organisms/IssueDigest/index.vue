<template>
  <nuxt-link class="IssueDigest flex p-4" :to="`issue/${milestone.path}/`">
    <div>
      <div class="flex sm:flex-row flex-col items-baseline">
        <p class="text-xl font-medium font-roboto" v-html="title" />
        <p class="sm:ml-2 ml-0 text-gray-500 text-sm" v-text="subtitle" />
      </div>
      <p
        class="IssueDigest__summary mt-1 line-clamp-2 text-gray-500"
        v-html="summary"
      />
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api'
import { GHDigestMilestone } from 'site-types/GitHubApi'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'IssueDigest',
  props: {
    milestone: {
      type: Object as PropType<GHDigestMilestone>,
      required: true,
    },
  },
  computed: {
    title(): string {
      return `#${this.milestone.title}`
    },
    subtitle(): string {
      return `${this.milestone.issues.totalCount}件のリンク`
    },
    summary(): string {
      const issues = this.milestone.issues
      return issues.nodes.map((issue) => issue.title).join(' / ')
    },
  },
})
</script>
