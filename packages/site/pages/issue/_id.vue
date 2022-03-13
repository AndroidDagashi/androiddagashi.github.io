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
import { mapState } from 'vuex'
import { GHMilestone, GHIssue } from 'site-types/GitHubApi'
import { defineComponent } from '@vue/composition-api'
import { renderOGPMeta } from '../../utils/ogp'
import ShareWidgets from '~/components/ShareWidgets.vue'
import MarkdownText from '~/components/atoms/MarkdownText/index.vue'
import { loadScripts } from '~/utils/sharewidget-scripts'
import LinkItem from '~/components/organisms/LinkItem/index.vue'


export default defineComponent({
  name: 'Issue',
  components: { ShareWidgets, MarkdownText, LinkItem },
  async asyncData({ route, $api }) {
    const data = await $api.get<GHMilestone>(
      `/api/issue/${route.params.id}.json`
    )
    return {
      milestone: data,
      title: `#${data.title}`,
    }
  },
  data() {
    return {
      siteTitle: this.$config.title,
      milestone: null,
      issueRepository: this.$config.issueRepository,
      siteDescription: this.$config.description,
      title: '',
    }
  },
  head(): Record<string, unknown> {
    let titleDescription = ''
    if (this.milestone.description) {
      titleDescription = `: ${this.milestone.description}`
    }
    const title = `${this.title}${titleDescription} - ${this.siteTitle}`

    return {
      title,
      meta: [
        ...renderOGPMeta({
          title,
          description: this.milestone.description || this.siteDescription,
          url: `${this.baseUrl}${this.$route.fullPath}`,
        }),
      ],
    }
  },
  computed: {
    ...mapState({
      baseUrl: 'baseUrl',
    }),
    milestoneId(): string {
      return this.$route.params.id
    },
    milestoneTitle(): string {
      return this.milestone?.title ?? ''
    },
    milestoneDescription(): string {
      return this.milestone?.description ?? ''
    },
    issues(): GHIssue[] {
      return this.milestone?.issues?.nodes ?? []
    },
  },
  mounted() {
    loadScripts(document)
  },
})
</script>
