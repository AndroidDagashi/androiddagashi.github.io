<template>
  <main class="max-w-2xl mx-auto pt-10 pb-12 px-0 lg:pb-16">
    <h2 class="text-2xl font-semibold font-roboto px-3">ISSUES</h2>
    <IssueDigestList class="mt-3" :milestones="milestones">
      <template v-if="pageInfo.hasNextPage" #bottom>
        <button class="LoadNextButton" @click="onLoadNext">
          <span class="material-icons">expand_more</span>
        </button>
      </template>
    </IssueDigestList>
  </main>
</template>

<script lang="ts">
import { mapState, mapActions } from 'vuex'
import { GHDigestMilestone, GHPageInfo } from 'site-types/GitHubApi'
import { defineComponent } from '@vue/composition-api'
import { renderOGPMeta } from '~/utils/ogp'
import IssueDigestList from '~/components/organisms/IssueDigestList/index.vue'

import * as ActionTypes from '~/store/ActionTypes'

export default defineComponent({
  name: 'Index',
  components: {
    IssueDigestList,
  },
  head(): Record<string, unknown> {
    return {
      meta: [
        ...renderOGPMeta({
          title: this.title,
          description: this.description,
          url: `${this.baseUrl}${this.$route.fullPath}`,
        }),
      ],
    }
  },
  computed: {
    ...mapState(['baseUrl', 'digest']),
    milestones(): GHDigestMilestone[] {
      return this.digest.milestones.nodes
    },
    pageInfo(): GHPageInfo {
      return this.digest.milestones.pageInfo
    },
  },
  methods: {
    ...mapActions({ fetchDigest: ActionTypes.FETCH_DIGEST }),
    async onLoadNext(): Promise<void> {
      await this.fetchDigest({ cursor: this.pageInfo.endCursor })
    },
  },
})
</script>

<style lang="postcss" scoped>
.LoadNextButton {
  @apply relative flex flex-row items-center justify-center w-full h-12 hover:bg-green-50;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: calc(100% - 3rem);
    height: 1px;
    margin-right: 0.5em;
    margin-left: 0.5em;

    @apply bg-gray-200;
  }
}
</style>
