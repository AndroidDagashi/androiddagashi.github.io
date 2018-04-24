<template>

</template>

<script lang="ts">
import Component from 'nuxt-class-component';
import Vue from 'vue';
import VueMarkdown from 'vue-markdown';
import { Prop } from 'vue-property-decorator';
import { GHIssue, GHComment } from 'types/GitHubApi';
import flatmap from 'lodash.flatmap';
import { DateTime } from 'luxon';

@Component({
  name: "issue-comments",
  components: {
    VueMarkdown
  }
})
export default class IssueComments extends Vue {
  @Prop() issue: GHIssue

  get commentsWithDivider() {
    return flatmap(this.issue.comments.nodes, (comment: GHComment, index: number, array) => {
      if (index == 0){
        return [ comment ];
      } else {
        return [
          { isDivider: true },
          comment
        ];
      }
    })
  }

  publishedAt(comment: GHComment) {
    return DateTime.fromISO(comment.publishedAt).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
  }
}

</script>

<style scoped>

</style>
