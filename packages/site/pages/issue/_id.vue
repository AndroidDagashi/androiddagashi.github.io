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
            :issue-repository="$config.public.issueRepository"
            class="LinkList__item"
          />
        </template>
      </ul>
    </section>
  </main>
</template>

<script lang="ts">
import type { ReactiveHead } from '@unhead/vue'
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { defineComponent, computed, onMounted } from 'vue'
import { renderOGPMeta } from '../../utils/ogp'
import ShareWidgets from '~/components/organisms/ShareWidgets/index.vue'
import MarkdownText from '~/components/atoms/MarkdownText/index.vue'
import { loadScripts } from '~/utils/sharewidget-scripts'
import LinkItem from '~/components/organisms/LinkItem/index.vue'
import type { IssueState, IssueGetters } from '~~/store/issue'

const { useGetters: useIssueGetters } = createNamespacedHelpers<
  IssueState,
  IssueGetters
>('issue')

export default defineComponent({
  name: 'Issue',
  components: { ShareWidgets, MarkdownText, LinkItem },
  setup() {
    const route = useRoute()
    const { $config } = useNuxtApp()
    const { currentMilestone } = useIssueGetters(['currentMilestone'])

    const milestoneId = computed(() => route.params.id)
    const milestoneTitle = computed(() => currentMilestone.value?.title ?? '')
    const milestoneDescription = computed(
      () => currentMilestone.value?.description ?? ''
    )
    const issues = computed(() => currentMilestone.value?.issues?.nodes ?? [])

    useHead(
      computed<ReactiveHead>(() => {
        const title = `${milestoneTitle.value} - ${$config.public.title}`
        return {
          title,
          meta: [
            ...renderOGPMeta({
              title,
              description: milestoneDescription.value,
              url: `${$config.public.baseUrl}${route.fullPath}`,
            }),
          ],
        }
      })
    )

    onMounted(() => {
      loadScripts(document)
    })

    return {
      currentMilestone,
      milestoneId,
      milestoneTitle,
      milestoneDescription,
      issues,
    }
  },
  async asyncData({ route, store }) {
    await store.dispatch('issue/fetchById', { milestoneId: route.params.id })
  },
})
</script>
