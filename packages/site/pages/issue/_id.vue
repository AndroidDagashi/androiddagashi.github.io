<template>
  <main class="mx-auto max-w-2xl px-0 pb-12 pt-10 lg:pb-16">
    <div class="px-3">
      <h2 class="font-roboto text-2xl font-semibold">#{{ milestoneTitle }}</h2>
      <div v-if="milestoneDescription" class="mt-3">
        <MarkdownText :text="milestoneDescription" />
      </div>

      <div class="mt-3">
        <ShareWidgets />
      </div>
    </div>
    <section class="">
      <ul class="LinkList">
        <template v-for="(item, index) in issues">
          <LinkItem
            :key="index"
            :issue="item"
            :issue-repository="issueRepository"
            class="LinkList__item"
          />
        </template>
      </ul>
    </section>
  </main>
</template>

<script lang="ts">
import { createNamespacedHelpers } from 'vuex'
import type { GHIssue } from 'site-types/GitHubApi'
import { defineComponent } from 'vue'
import { renderOGPMeta } from '../../utils/ogp'
import ShareWidgets from '~/components/organisms/ShareWidgets/index.vue'
import MarkdownText from '~/components/atoms/MarkdownText/index.vue'
import { loadScripts } from '~/utils/sharewidget-scripts'
import LinkItem from '~/components/organisms/LinkItem/index.vue'

const { mapGetters: mapIssueGetters } = createNamespacedHelpers('issue')

export default defineComponent({
  name: 'Issue',
  components: { ShareWidgets, MarkdownText, LinkItem },
  async asyncData({ route, store }) {
    await store.dispatch('issue/fetchById', { milestoneId: route.params.id })
  },
  data() {
    return {
      siteTitle: this.$config.title,
      issueRepository: this.$config.issueRepository,
      siteDescription: this.$config.description,
    }
  },
  head(): Record<string, unknown> {
    const { title, description } = this.currentMilestone ?? {}

    let titleDescription = ''
    if (this.description) {
      titleDescription = `: ${description}`
    }
    const newTitle = `${title}${titleDescription} - ${this.siteTitle}`

    return {
      title: newTitle,
      meta: [
        ...renderOGPMeta({
          title: newTitle,
          description: description || this.siteDescription,
          url: `${this.$config.baseUrl}${this.$route.fullPath}`,
        }),
      ],
    }
  },
  computed: {
    ...mapIssueGetters(['currentMilestone']),
    milestoneId(): string {
      return this.$route.params.id
    },
    milestoneTitle(): string {
      return this.currentMilestone?.title ?? ''
    },
    milestoneDescription(): string {
      return this.currentMilestone?.description ?? ''
    },
    issues(): GHIssue[] {
      return this.currentMilestone?.issues?.nodes ?? []
    },
  },
  mounted() {
    loadScripts(document)
  },
})
</script>
