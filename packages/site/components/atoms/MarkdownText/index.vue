<template>
  <div class="markdown-text" v-html="$md.render(text)" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'MarkdownText',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="postcss" scoped>
.markdown-text {
  word-break: break-all;
}

.markdown-text >>> a {
  text-decoration: none;
  color: #0366d6;
}

.markdown-text >>> a:hover {
  text-decoration: underline;
}

.markdown-text >>> p {
  margin-bottom: 4px;
}

.markdown-text >>> ul {
  padding-left: 16px;
  padding-right: 16px;
}

.markdown-text >>> blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}
</style>
