<template>
  <main class="max-w-2xl mx-auto pt-10 pb-12 px-0 lg:pb-16">
    <h2 class="text-2xl font-semibold font-roboto px-3">ISSUES</h2>
    <IssueDigestList class="mt-3" :milestones="milestones">
      <template v-if="pageInfo.hasNextPage" #bottom>
        <button class="LoadNextButton" @click="onLoadNext">
          <client-only>
            <Icon icon="ic:baseline-expand-more" width="24" />
            <template #placeholder>
              <span class="inline-block w-6 h-6"></span>
            </template>
          </client-only>
          <span class="sr-only">次の記事を読み込む</span>
        </button>
      </template>
    </IssueDigestList>
  </main>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import { defineComponent } from '@vue/composition-api'
import { Icon } from '@iconify/vue2'
import { renderOGPMeta } from '~/utils/ogp'
import IssueDigestList from '~/components/organisms/IssueDigestList/index.vue'

export default defineComponent({
  name: 'Index',
  components: {
    IssueDigestList,
    Icon,
  },
  data() {
    return {
      baseUrl: this.$config.baseUrl,
    }
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
    ...mapGetters({ milestones: 'digests', pageInfo: 'pageInfo' }),
  },
  methods: {
    ...mapActions(['fetchNextDigests']),
    async onLoadNext(): Promise<void> {
      await this.fetchNextDigests({ cursor: this.pageInfo.endCursor })
    },
  },
})
</script>

<style lang="postcss" scoped>
.LoadNextButton {
  @apply relative flex flex-row items-center justify-center w-full h-12;
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
