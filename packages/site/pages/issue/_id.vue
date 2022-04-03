<template>
  <main class="max-w-2xl mx-auto pt-10 pb-12 px-0 lg:pb-16">
    <div class="px-3">
      <h2 class="text-2xl font-semibold font-roboto">#{{ milestoneTitle }}</h2>
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
          <LinkItem :key="index" :issue="item" :issue-repository="issueRepository" class="LinkList__item" />
        </template>
      </ul>
    </section>
  </main>
</template>

<script lang="ts">
import { mapState, createNamespacedHelpers } from 'vuex'
import { GHIssue } from 'site-types/GitHubApi'
import { defineComponent } from '@vue/composition-api'
import { renderOGPMeta } from '../../utils/ogp'
import ShareWidgets from '~/components/ShareWidgets.vue'
import MarkdownText from '~/components/atoms/MarkdownText/index.vue'
import { loadScripts } from '~/utils/sharewidget-scripts'
import LinkItem from '~/components/organisms/LinkItem/index.vue'

const {mapGetters:mapIssueGetters, mapActions: mapIssueActions} = createNamespacedHelpers('issue')

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
          url: `${this.baseUrl}${this.$route.fullPath}`,
        }),
      ],
    }
  },
  computed: {
    ...mapState(['baseUrl']),
    ...mapIssueActions(['fetchById']),
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
