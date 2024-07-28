<template>
  <nuxt-link class="IssueDigest flex p-4" :to="`issue/${milestone.path}/`">
    <div>
      <div class="flex flex-col items-baseline sm:flex-row">
        <p class="font-roboto text-xl font-medium">#{{ milestone.title }}</p>
        <p class="ml-0 text-sm text-gray-500 sm:ml-2">
          {{ milestone.issues.totalCount }}件のリンク
        </p>
      </div>
      <p
        class="IssueDigest__summary mt-1 line-clamp-2 text-gray-500"
        v-html="milestone.description"
      />
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { GHDigestMilestone } from 'site-types/GitHubApi'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IssueDigest',
  props: {
    milestone: {
      type: Object as PropType<GHDigestMilestone>,
      required: true,
    },
  },
})
</script>
