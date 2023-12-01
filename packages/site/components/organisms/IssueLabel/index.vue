<template>
  <span
    :style="chipColorStyle"
    class="IssueLabel rounded-full px-3 py-1 text-xs font-bold text-white"
  >
    <a :href="githubLabelLink" target="_blank">{{ labelInfo.name }}</a>
  </span>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { GitHubApi, SiteConfig } from 'site-types'

export default defineComponent({
  name: 'IssueLabel',
  props: {
    labelInfo: {
      type: Object as PropType<GitHubApi.GHLabel>,
      required: true,
    },
    issueRepository: {
      type: Object as PropType<SiteConfig.RepositoryConfig>,
      required: true,
    },
  },
  setup(props) {
    const chipColorStyle = computed(() => {
      const color = `#${props.labelInfo.color}`
      return `background-color: ${color}; border-color: ${color};`
    })

    const githubLabelLink = computed(() => {
      return `https://github.com/${props.issueRepository.owner}/${props.issueRepository.name}/issues?q=label%3A"${props.labelInfo.name}"`
    })

    return {
      chipColorStyle,
      githubLabelLink,
    }
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
