<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="markdown-text" v-html="md.render(text)" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MarkdownText',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  setup() {
    const app = useNuxtApp()
    const md = app.$md

    return {
      md,
    }
  },
})
</script>

<style lang="postcss" scoped>
.markdown-text {
  word-break: break-all;
}

.markdown-text :deep(a) {
  text-decoration: none;
  color: #0366d6;
}

.markdown-text :deep(a:hover) {
  text-decoration: underline;
}

.markdown-text :deep(p) {
  margin-bottom: 4px;
}

.markdown-text :deep(ul) {
  list-style: disc;
  padding-left: 16px;
  padding-right: 16px;
}

.markdown-text :deep(blockquote) {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}
</style>
