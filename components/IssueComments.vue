<template>
  <section class="issue-comments">
    <h3>Comments</h3>
    <v-container>
      <v-layout class="shrink" justify-end>
        <v-flex class="shrink" md8 xs12>
          <template v-for="(item, index) in issue.comments.nodes">
            <v-card :key="index" class="issue-comments__comment mb-2">
              <v-card-title class="pb-0">
                <v-avatar class="mr-2" size="20px">
                  <img :src="item.author.avatarUrl">
                </v-avatar>
                <strong class="issue-comments__username">
                  <a :href="item.author.url" target="_blank">{{ item.author.login }}</a>
                </strong>
              </v-card-title>
              <v-card-text>
                <div class="comment-body md-body" v-html="$md.render(item.body)"/>
                <no-ssr>
                  <p :title="item.publishedAt" class="text-xs-right mb-0">{{ publishedAt(item) }}</p>
                </no-ssr>
              </v-card-text>
            </v-card>
          </template>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { GHIssue, GHComment } from "types/GitHubApi";
import flatmap from "lodash.flatmap";
import { DateTime } from "luxon";

@Component({
  name: "issue-comments"
})
export default class IssueComments extends Vue {
  @Prop({ required: true }) issue!: GHIssue;

  get commentsWithDivider() {
    return flatmap(
      this.issue.comments.nodes,
      (comment: GHComment, index: number) => {
        if (index === 0) {
          return [comment];
        } else {
          return [{ isDivider: true }, comment];
        }
      }
    );
  }

  publishedAt(comment: GHComment) {
    return DateTime.fromISO(comment.publishedAt).toLocaleString(
      DateTime.DATETIME_SHORT_WITH_SECONDS
    );
  }
}
</script>

<style lang="stylus" scoped>
.issue-comments {
  width: 100%;
}

.issue-comments__comment {
  background-color: #FAFBFC;
}

.issue-comments__username {
  >>> a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
