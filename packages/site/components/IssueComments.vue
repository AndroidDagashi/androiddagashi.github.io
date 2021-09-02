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
import Vue from 'vue'
import type { PropType } from 'vue'
import { GHIssue } from 'site-types/GitHubApi'
import IssueCommentsItem from './IssueCommentsItem.vue'

export default Vue.extend({
  name: 'IssueComments',
  components: { IssueCommentsItem },
  props: {
    issue: {
      type: Object as PropType<GHIssue>,
      required: true,
    },
  },
})
</script>

<style lang="postcss" scoped>
.IssueComments {
  width: 100%;
}
</style>
