<template>
  <v-chip
    :key="index"
    :style="chipColorStyle"
    class="caption">
    <a
      :href="githubLabelLink"
      target="_blank">{{ labelInfo.name }}</a>
  </v-chip>
</template>

<script lang="ts">
import { Prop } from 'vue-property-decorator';
import { GHLabel } from 'types/GitHubApi';
import { mapState } from 'vuex';
import Component from 'nuxt-class-component';
import Vue from 'vue';
import { SiteConfigRepository } from 'types/SiteConfig';

@Component({
  name: 'issue-label',
  computed: mapState(['issueRepository'])
})
export default class IssueLabel extends Vue {

  issueRepository: SiteConfigRepository;

  @Prop() index: number;

  @Prop() labelInfo: GHLabel;

  get chipColorStyle(): string {
    const color = `#${this.labelInfo.color}`;
    return `background-color: ${color}; border-color: ${color};`;
  }

  get githubLabelLink(): string {
    return `https://github.com/${this.issueRepository.owner}/${this.issueRepository.name}/issues?q=label%3A"${this.labelInfo.name}"`;
  }
}
</script>

<style lang="stylus">
  .caption .chip__content {
    height: 24px;
    color: white;
    font-weight: bold;
  }

  .caption .chip__content a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
</style>
