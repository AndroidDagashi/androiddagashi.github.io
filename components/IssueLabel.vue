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
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { GHLabel } from 'store';

@Component({
  name: 'issue-label'
})
export default class IssueLabel extends Vue {

  @Prop() index: number;

  @Prop() labelInfo: GHLabel;

  get chipColorStyle(): string {
    const color = `#${this.labelInfo.color}`;
    return `background-color: ${color}; border-color: ${color};`;
  }

  get githubLabelLink(): string {
    return `https://github.com/yshrsmz/androiddagashi/issues?q=label%3A${this.labelInfo.name}`;
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
