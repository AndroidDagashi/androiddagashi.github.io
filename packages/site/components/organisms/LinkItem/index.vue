<template>
  <ADCard :tag="tag" class="LinkItem mt-3 border border-gray-200">
    <h3 class="text-lg font-semibold text-gray-600">{{ issue.title }}</h3>
    <div v-if="hasLabels" class="py-2">
      <IssueLabel
        v-for="(label, index2) in labels"
        :key="index2"
        class="mr-1"
        :label-info="label"
        :issue-repository="issueRepository"
      />
    </div>
    <MarkdownText class="mt-3 pb-3" :text="issue.body" />
    <div v-if="hasComments" class="LinkItem__comments border-t border-gray-300">
      <ul class="mt-3">
        <template v-for="(item, index) in comments">
          <LinkItemComment :key="index" :comment="item" />
        </template>
      </ul>
    </div>
    <a :href="issue.url" target="_blank" class="LinkItem__GitHubLink">
      <span>GitHubで見る</span>
    </a>
  </ADCard>
</template>
<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, computed } from 'vue'
import type { GitHubApi, SiteConfig } from 'site-types'
import LinkItemComment from './LinkItemComment.vue'
import MarkdownText from '~/components/atoms/MarkdownText/index.vue'
import IssueLabel from '~/components/organisms/IssueLabel/index.vue'
import ADCard from '~/components/molecules/ADCard/index.vue'

export default defineComponent({
  name: 'LinkItem',
  components: { IssueLabel, MarkdownText, LinkItemComment, ADCard },
  props: {
    issue: {
      type: Object as PropType<GitHubApi.GHIssue>,
      required: true,
    },
    tag: {
      type: String,
      required: false,
      default: 'li',
    },
    issueRepository: {
      type: Object as PropType<SiteConfig.RepositoryConfig>,
      required: true,
    },
  },
  setup(props) {
    const hasLabels = computed(() => props.issue.labels.nodes.length > 0)
    const labels = computed(() => props.issue.labels.nodes)
    const hasComments = computed(() => props.issue.comments.totalCount > 0)
    const comments = computed(() => props.issue.comments.nodes)

    return {
      hasLabels,
      labels,
      hasComments,
      comments,
    }
  },
})
</script>

<style lang="postcss" scoped>
.LinkItem__GitHubLink {
  @apply mt-1 inline-flex h-8 items-center rounded-full border border-solid border-gray-300 px-5 text-sm font-semibold text-gray-400;
  @apply hover:bg-gray-100;
}
</style>
