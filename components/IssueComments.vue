<template>
  <div class="issue-comments">
    <v-btn
      flat
      @click.stop="isDialogActive=true">
      <v-avatar
        v-for="(author, index) in distinctAuthors"
        :key="index"
        size="20px">
        <img
          :src="author.avatarUrl">
      </v-avatar>
      ({{ issue.comments.totalCount }})
      <v-icon>mdi-comment</v-icon>
    </v-btn>
    <v-dialog
      v-model="isDialogActive"
      max-width="500px"
      scrollable>
      <v-card>
        <v-card-text>
          <template v-for="(item, index) in commentsWithDivider">
            <v-divider
              v-if="item.isDivider"
              :key="index"/>
            <article
              v-else
              :key="index">
              <v-container px-0>
                <v-layout
                  d-inline-flex
                  justify-start
                  row>
                  <v-flex mr-2>
                    <v-avatar
                      size="40px">
                      <img :src="item.author.avatarUrl">
                    </v-avatar>
                  </v-flex>
                  <v-flex justify-start>
                    <v-layout
                      row
                      wrap>
                      <v-flex xs12>
                        <a
                          :href="item.author.url"
                          target="_blank">
                          <span>{{ item.author.login }}</span>
                        </a>
                      </v-flex>
                      <v-flex xs12>
                        <no-ssr>
                          <span>{{ publishedAt(item) }}</span>
                        </no-ssr>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-container>
              <vue-markdown
                :anchor-attributes="{ target: '_blank' }"
                class="comment-body"
              >{{ item.body }}</vue-markdown>
            </article>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            flat
            @click.stop="isDialogActive=false">Close</v-btn>
          <v-btn
            :href="issue.url"
            color="primary"
            flat
            target="_blank">コメントする</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Component from 'nuxt-class-component';
import { Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { GHIssue, GHComment } from 'types/GitHubApi';
import flatmap from 'lodash.flatmap';
import uniqBy from 'lodash.uniqby';
import VueMarkdown from 'vue-markdown';
import { DateTime } from 'luxon';

@Component({
  name: 'issue-comment',
  components: {
    VueMarkdown
  }
})
export default class IssueComents extends Vue {
  @Prop() issue: GHIssue

  isDialogActive: boolean = false

  get commentsWithDivider() {
    return flatmap(this.issue.comments.nodes, (value, index, array) => {
      if (index == 0) {
        return [value];
      } else {
        return [
            { isDivider: true },
            value
          ];
      }
    });
  }

  get distinctAuthors() {
    return uniqBy(this.issue.comments.nodes, (comment) => comment.author.login)
      .map((comment) => comment.author);
  }

  publishedAt(comment: GHComment) {
    return DateTime.fromISO(comment.publishedAt).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
  }
}
</script>

<style lang="stylus" scoped>
.issue-comments {
  display: inline-block;
}

.comment-body {
  word-break: break-all;

  >>> ul {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
