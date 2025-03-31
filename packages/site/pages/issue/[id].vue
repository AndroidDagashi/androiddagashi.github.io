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
        <template v-for="(item, index) in issues" :key="index">
          <LinkItem
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
import { renderOGPMeta } from '../../utils/ogp'
import { useNuxtApp } from '#imports'
import ShareWidgets from '~/components/organisms/ShareWidgets/index.vue'
import MarkdownText from '~/components/atoms/MarkdownText/index.vue'
import { loadScripts } from '~/utils/sharewidget-scripts'
import LinkItem from '~/components/organisms/LinkItem/index.vue'
import { useIssueStore } from '~/store/issue'

export default defineComponent({
  name: 'Issue',
  components: { ShareWidgets, MarkdownText, LinkItem },
  async setup() {
    const app = useNuxtApp()
    const route = useRoute()

    const issueStore = useIssueStore()

    onMounted(() => loadScripts(document))

    await callOnce(
      async () => issueStore.fetchById(route.params.id as string),
      { mode: 'navigation' }
    )

    const currentMilestone = computed(() => issueStore.currentMilestone)

    const milestoneTitle = computed(() => currentMilestone.value?.title ?? '')
    const milestoneDescription = computed(
      () => currentMilestone.value?.description ?? ''
    )
    const issues = computed(() => currentMilestone.value?.issues?.nodes ?? [])

    useHead(
      computed(() => {
        const newTitle = `${milestoneTitle.value}: ${milestoneDescription.value} - ${app.$config.public.title}`

        return {
          title: newTitle,
          meta: [
            ...renderOGPMeta({
              title: newTitle,
              description:
                milestoneDescription.value || app.$config.public.description,
              url: `${app.$config.public.baseUrl}${route.fullPath}`,
            }),
          ],
        }
      })
    )

    return {
      currentMilestone,
      milestoneTitle,
      milestoneDescription,
      issues,
      siteTitle: app.$config.public.title,
      issueRepository: app.$config.public.issueRepository,
      siteDescription: app.$config.public.description,
    }
  },
})
</script>
