<template>
  <ADCard class="text-gray-900">
    <p class="flex items-center text-2xl font-semibold">
      <ADAvatar
        size="s"
        image-url="/image/logo.jpg"
        class="border-2 border-gray-300"
      />
      <span class="ml-2">{{ title }}とは？</span>
    </p>
    <p class="mt-4 text-lg">
      <template v-for="(author, index) in authors">
        <TwitterLink :key="index" :screen-name="author.name" />
        {{ getAuthorConnector(index) }} </template
      >が、一週間の間に気になったAndroid関連のニュースをざっくりまとめています。
    </p>
    <p>おおよそ毎週日曜夜の更新です。</p>
    <div class="mt-6">
      <a class="FollowOnTwitter" :href="dagashiTwitterUrl" target="_blank">
        <iconify-icon icon="akar-icons:twitter-fill" width="24" />
        <span class="font-bold">Follow @{{ contact.name }}</span>
      </a>
    </div>
  </ADCard>
</template>

<script lang="ts">
import type { TwitterInfo } from 'site-types/SiteConfig'
import type { PropType } from '@vue/composition-api'
import { defineComponent, computed } from '@vue/composition-api'
import TwitterLink from '~/components/atoms/TwitterLink/index.vue'
import ADCard from '~/components/molecules/ADCard/index.vue'
import ADAvatar from '~/components/atoms/ADAvatar/index.vue'
import { twitterUrl } from '~/utils/urls'

export default defineComponent({
  name: 'SiteDescription',
  components: { ADCard, ADAvatar, TwitterLink },
  props: {
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: Array as PropType<TwitterInfo[]>,
      required: true,
    },
    contact: {
      type: Object as PropType<TwitterInfo>,
      required: true,
    },
  },
  setup(props) {
    const getAuthorConnector = (index: number): string => {
      switch (index) {
        case 0:
          return 'と'
        case props.authors.length - 1:
          return ''
        default:
          return '、'
      }
    }

    const dagashiTwitterUrl = computed(() => twitterUrl(props.contact.name))

    return {
      getAuthorConnector,
      dagashiTwitterUrl,
    }
  },
})
</script>

<style lang="postcss" scoped>
.FollowOnTwitter {
  @apply inline-flex h-12 items-center space-x-3 rounded-md px-6 text-white shadow-md;

  background-color: #1d9bf0;
}
</style>
