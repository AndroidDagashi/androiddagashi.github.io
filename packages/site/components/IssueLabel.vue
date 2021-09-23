<template>
  <v-chip :key="index" :style="chipColorStyle" class="text-caption" small>
    <a :href="githubLabelLink" target="_blank">{{ labelInfo.name }}</a>
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { GHLabel } from 'site-types/GitHubApi'
import { mapState } from 'vuex'
import { RootState } from '../store'

export default Vue.extend({
  name: 'IssueLabel',
  props: {
    index: {
      type: Number,
      required: true,
    },
    labelInfo: {
      type: Object as PropType<GHLabel>,
      required: true,
    },
  },
  computed: {
    ...mapState<RootState>(['issueRepository']),
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
