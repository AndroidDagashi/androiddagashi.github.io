<template>
  <div class="issue-comments">
    <h2>Comments</h2>
    <v-container>
      <v-layout class="shrink" justify-end>
        <v-flex class="shrink" md8 xs12>
          <template v-for="(item, index) in issue.comments.nodes">
            <v-card
              :key="index"
              class="issue-comments__comment mb-2">
              <v-card-title
                class="pb-0">
                <v-avatar
                  class="mr-2"
                  size="20px">
                  <img :src="item.author.avatarUrl"/>
                </v-avatar>
                <a :href="item.author.url">{{ item.author.login }}</a>
              </v-card-title>
              <v-card-text>
                <vue-markdown
                  :anchor-attributes="{ target: '_blank' }"
                  class="comment-body"
                  >{{ item.body }}</vue-markdown>
                  <p class="text-xs-right mb-0" :title="item.publishedAt">{{ publishedAt(item) }}</p>
              </v-card-text>
            </v-card>
          </template>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
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
    });
  }

  publishedAt(comment: GHComment) {
    return DateTime.fromISO(comment.publishedAt).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
  }
}

</script>

<style lang="stylus" scoped>
.issue-comments {
  width: 100%;

  >>> h2 {
    text-decoration: underline;
  }
}

.issue-comments__comment {
  background-color: #FAFBFC;
}

.comment-body {
  word-break: break-all;

  >>> p {
    margin-bottom: 4px;
  }
}
</style>
