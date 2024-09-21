<template>
  <main class="mx-auto max-w-2xl px-0 pb-12 pt-10 lg:pb-16">
    <h2 class="px-3 font-roboto text-2xl font-semibold">ISSUES</h2>
    <IssueDigestList class="mt-3" :milestones="milestones">
      <template v-if="pageInfo?.hasNextPage" #bottom>
        <button class="LoadNextButton" @click="onLoadNext">
          <iconify-icon icon="ic:baseline-expand-more" width="24" />
          <span class="sr-only"> 次の記事を読み込む </span>
        </button>
      </template>
    </IssueDigestList>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useActions, useGetters } from 'vuex-composition-helpers'
import { useHead } from '#imports'
import { renderOGPMeta } from '~/utils/ogp'
import IssueDigestList from '~/components/organisms/IssueDigestList/index.vue'
import type { RootGetters } from '~~/store'

export default defineComponent({
  name: 'Index',
  components: {
    IssueDigestList,
  },
  setup() {
    const app = useNuxtApp()

    const { digests: milestones, pageInfo } = useGetters<RootGetters>([
      'digests',
      'pageInfo',
    ])

    const { fetchNextDigests } = useActions(['fetchNextDigests'])

    const onLoadNext = async () => {
      await fetchNextDigests({ cursor: pageInfo.value?.endCursor })
    }

    useHead(
      computed(() => ({
        title: app.$config.public.title,
        meta: [
          ...renderOGPMeta({
            title: app.$config.public.title,
            description: app.$config.public.description,
            url: `${app.$config.public.baseUrl}${app.$route.fullPath}`,
          }),
        ],
      }))
    )

    return {
      baseUrl: app.$config.public.baseUrl,
      siteTitle: app.$config.public.title,
      siteDescription: app.$config.public.description,
      milestones,
      pageInfo,
      fetchNextDigests,
      onLoadNext,
    }
  },
})
</script>

<style lang="postcss" scoped>
.LoadNextButton {
  @apply relative flex h-12 w-full flex-row items-center justify-center;
  @apply hover:bg-gray-100;

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
