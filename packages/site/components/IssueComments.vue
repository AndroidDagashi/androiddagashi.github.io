<template>
  <section class="IssueComments text--primary">
    <h3>Comments</h3>
    <v-container>
      <v-layout class="shrink" justify-end>
        <v-flex class="shrink" md8 xs12>
          <IssueCommentsItem
            v-for="(item, index) in issue.comments.nodes"
            :key="index"
            :comment="item"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { GHIssue, GHComment } from 'site-types/GitHubApi'
import { DateTime } from 'luxon'
import IssueCommentsItem from './IssueCommentsItem.vue'

@Component({
  name: 'IssueComments',
  components: { IssueCommentsItem },
})
export default class IssueComments extends Vue {
  @Prop({ required: true }) issue!: GHIssue

  publishedAt(comment: GHComment): string {
    return (
      DateTime.fromISO(comment.publishedAt).toLocaleString(
        DateTime.DATETIME_SHORT_WITH_SECONDS
      ) || ''
    )
  }
}
</script>

<style lang="scss" scoped>
.IssueComments {
  width: 100%;
}
</style>
