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

.markdown-text :deep(code) {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  font-family:
    ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas,
    'Liberation Mono', monospace;
  background-color: rgba(175, 184, 193, 0.2);
  border-radius: 6px;
}

.markdown-text :deep(pre) {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 6px;
}

.markdown-text :deep(pre code) {
  padding: 0;
  margin: 0;
  font-size: 100%;
  background-color: transparent;
  border-radius: 0;
}
</style>
