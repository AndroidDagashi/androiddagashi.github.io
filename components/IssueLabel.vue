<template>
  <v-chip
    :style="chipColorStyle"
    :key="index"
    class="caption">
    <a
      :href="githubLabelLink"
      target="_blank">{{ labelInfo.name }}</a>
  </v-chip>
</template>

<script lang="ts">
import { Prop } from 'vue-property-decorator';
import { GHLabel } from 'store';
import { mapState } from 'vuex';
import Component from 'nuxt-class-component'
import Vue from 'vue';

@Component({
  name: 'issue-label',
  computed: mapState(['repoOwner', 'repoName'])
})
export default class IssueLabel extends Vue {

  repoOwner: string;
  repoName: string;

  @Prop() index: number;

  @Prop() labelInfo: GHLabel;

  get chipColorStyle(): string {
    const color = `#${this.labelInfo.color}`;
    return `background-color: ${color}; border-color: ${color};`;
  }

  get githubLabelLink(): string {
    return `https://github.com/${this.repoOwner}/${this.repoName}/issues?q=label%3A"${this.labelInfo.name}"`;
  }
}
</script>

<style>
  .caption .chip__content {
    height: 24px;
    color: white;
    font-weight: bold;
  }

  .caption .chip__content a {
    color: white;
  }
</style>
