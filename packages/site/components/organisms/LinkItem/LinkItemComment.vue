<template>
  <component :is="tag" class="LinkItemComment py-1">
    <aside>
      <a :href="comment.author.url" target="_blank">
        <ADAvatar
          :image-url="comment.author.avatarUrl"
          size="m"
          class="border-2 border-solid border-gray-300"
          :alt="comment.author.login"
        />
        <span class="ml-2 font-medium">{{ comment.author.login }}</span>
      </a>
      <span class="ml-2 text-sm text-gray-500">at {{ publishedAt }}</span>
    </aside>
    <MarkdownText class="mt-3 pl-12" :text="comment.body" />
  </component>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, computed } from 'vue'
import { format, parseISO } from 'date-fns'
import type { GHComment } from 'site-types/GitHubApi'
import ADAvatar from '~/components/atoms/ADAvatar/index.vue'
import MarkdownText from '~/components/atoms/MarkdownText/index.vue'

export default defineComponent({
  name: 'LinkItemComponent',
  components: { ADAvatar, MarkdownText },
  props: {
    comment: {
      type: Object as PropType<GHComment>,
      required: true,
    },
    tag: {
      type: String,
      required: false,
      default: 'li',
    },
  },
  setup(props) {
    const publishedAt = computed(
      () =>
        format(parseISO(props.comment.publishedAt), 'yyyy/MM/dd hh:mm') || ''
    )

    return {
      publishedAt,
    }
  },
})
</script>

<style lang="postcss" scoped>
.LinkItemComment {
  @apply relative;

  &::before {
    @apply absolute bg-gray-300;

    content: '';
    top: 48px;
    bottom: 0px;
    left: 18px;
    width: 2px;
  }
}
</style>
