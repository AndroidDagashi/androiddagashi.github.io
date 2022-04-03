<template>
  <span
    :style="chipColorStyle"
    class="text-white text-xs py-1 px-3 rounded-full font-bold"
  >
    <a :href="githubLabelLink" target="_blank">{{ labelInfo.name }}</a>
  </span>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api'
import { defineComponent } from '@vue/composition-api'
import { GHLabel } from 'site-types/GitHubApi'
import { RepositoryConfig } from 'site-types/SiteConfig'

export default defineComponent({
  name: 'IssueLabel',
  props: {
    labelInfo: {
      type: Object as PropType<GHLabel>,
      required: true,
    },
    issueRepository: {
      type: Object as PropType<RepositoryConfig>,
      required: true,
    },
  },
  computed: {
    chipColorStyle(): string {
      const color = `#${this.labelInfo.color}`
      return `background-color: ${color}; border-color: ${color};`
    },
    githubLabelLink(): string {
      return `https://github.com/${this.issueRepository.owner}/${this.issueRepository.name}/issues?q=label%3A"${this.labelInfo.name}"`
    },
  },
})
</script>

<style lang="postcss" scoped>
.text-caption {
  margin: 4px;
}

.text-caption .v-chip__content {
  color: white;
  font-weight: bold;
}

.text-caption .v-chip__content a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
</style>
