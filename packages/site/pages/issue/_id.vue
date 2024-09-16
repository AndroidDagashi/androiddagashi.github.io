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
import { defineComponent, computed, onMounted } from 'vue'
import { useGetters } from 'vuex-composition-helpers'
import { renderOGPMeta } from '../../utils/ogp'
import { useNuxtApp } from '#imports'
import ShareWidgets from '~/components/organisms/ShareWidgets/index.vue'
import MarkdownText from '~/components/atoms/MarkdownText/index.vue'
import { loadScripts } from '~/utils/sharewidget-scripts'
import LinkItem from '~/components/organisms/LinkItem/index.vue'
import type { IssueGetters } from '~~/store/issue'

export default defineComponent({
  name: 'Issue',
  components: { ShareWidgets, MarkdownText, LinkItem },
  setup() {
    const app = useNuxtApp()

    const { currentMilestone } = useGetters<IssueGetters>('issue', [
      'currentMilestone',
    ])

    const milestoneTitle = computed(() => currentMilestone.value?.title ?? '')
    const milestoneDescription = computed(
      () => currentMilestone.value?.description ?? ''
    )
    const issues = computed(() => currentMilestone.value?.issues?.nodes ?? [])

    onMounted(() => {
      loadScripts(document)
    })

    return {
      currentMilestone,
      milestoneTitle,
      milestoneDescription,
      issues,
      siteTitle: app.$config.title,
      issueRepository: app.$config.issueRepository,
      siteDescription: app.$config.description,
    }
  },
  async asyncData({ route, store }) {
    await store.dispatch('issue/fetchById', { milestoneId: route.params.id })
  },
  head(): Record<string, unknown> {
    const { title, description } = this.currentMilestone ?? {}

    let titleDescription = ''
    if (description) {
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
})
</script>
