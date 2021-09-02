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
      <MarkdownText class="comment-body text--primary" :text="comment.body" />
      <client-only>
        <p :title="comment.publishedAt" class="text-right mb-0">
          {{ publishedAt }}
        </p>
      </client-only>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { GHComment } from 'site-types/GitHubApi'
import { parseISO, format } from 'date-fns'
import MarkdownText from '~/components/atoms/MarkdownText/index.vue'

export default Vue.extend({
  name: 'IssueCommentsItem',
  components: { MarkdownText },
  props: {
    comment: {
      type: Object as PropType<GHComment>,
      required: true,
    },
  },
  computed: {
    publishedAt(): string {
      return (
        format(parseISO(this.comment.publishedAt), 'yyyy/MM/dd hh:mm:ss') || ''
      )
    },
  },
})
</script>

<style lang="postcss" scoped>
.IssueCommentsItem {
  background-color: #fafbfc;
}

.IssueCommentsItem__username {
  font-weight: bolder;
}

.IssueCommentsItem__username a {
  text-decoration: none;
}

.IssueCommentsItem__username:hover {
  text-decoration: underline;
}
</style>
