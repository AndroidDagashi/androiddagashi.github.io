<template>
  <component :is="tag" class="card overflow-hidden bg-white sm:rounded-lg" :class="{ shadow: shadow }" v-bind="$attrs">
    <div class="px-4 py-5 sm:p-6">
      <slot />
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ADCard',
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      required: false,
      default: 'div',
    },
    shadow: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
</script>
