<template>
  <v-chip :key="index" :style="chipColorStyle" class="text-caption" small>
    <a :href="githubLabelLink" target="_blank">{{ labelInfo.name }}</a>
  </v-chip>
</template>

<script lang="ts">
import { GHLabel } from 'site-types/GitHubApi'
import { mapState } from 'vuex'
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { RepositoryConfig } from 'site-types/SiteConfig'

@Component({
  name: 'issue-label',
  computed: mapState(['issueRepository']),
})
export default class IssueLabel extends Vue {
  issueRepository!: RepositoryConfig

  @Prop() index!: number

  @Prop() labelInfo!: GHLabel

  get chipColorStyle(): string {
    const color = `#${this.labelInfo.color}`
    return `background-color: ${color}; border-color: ${color};`
  }

  get githubLabelLink(): string {
    return `https://github.com/${this.issueRepository.owner}/${this.issueRepository.name}/issues?q=label%3A"${this.labelInfo.name}"`
  }
}
</script>

<style lang="scss">
.text-caption {
  margin: 4px;
  .v-chip__content {
    color: white;
    font-weight: bold;

    a {
      color: white;
      text-decoration: none;
      font-weight: bold;
    }
  }
}
</style>
