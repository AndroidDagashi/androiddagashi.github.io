<template>
  <v-card class="IssueCommentsItem mb-2">
    <v-card-title class="pb-0">
      <v-avatar class="mr-2" size="20px">
        <img :src="comment.author.avatarUrl" />
      </v-avatar>
      <strong class="IssueCommentsItem__username body-2">
        <a :href="comment.author.url" target="_blank">{{
          comment.author.login
        }}</a>
      </strong>
    </v-card-title>
    <v-card-text class="pt-3">
      <div
        class="comment-body md-body text--primary"
        v-html="$md.render(comment.body)"
      />
      <client-only>
        <p :title="comment.publishedAt" class="text-right mb-0">
          {{ publishedAt }}
        </p>
      </client-only>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { GHComment } from 'site-types/GitHubApi'
import { DateTime } from 'luxon'

export default Vue.extend({
  name: 'IssueCommentsItem',
  props: {
    comment: {
      type: Object,
      required: true,
    } as PropOptions<GHComment>,
  },
  computed: {
    publishedAt(): string {
      return (
        DateTime.fromISO(this.comment.publishedAt).toLocaleString(
          DateTime.DATETIME_SHORT_WITH_SECONDS
        ) || ''
      )
    },
  },
})
</script>

<style lang="scss" scoped>
.IssueCommentsItem {
  background-color: #fafbfc;

  &__username {
    font-weight: bolder;
    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
