<template>
  <img
    class="inline-block rounded-full"
    :class="avatarSizeClasses"
    :src="imageUrl"
    :alt="alt"
  >
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, toRefs, computed } from 'vue'

type AvatarSize = 'ss' | 's' | 'm' | 'l' | 'll'

export default defineComponent({
  name: 'ADAvatar',
  props: {
    size: {
      type: String as PropType<AvatarSize>,
      required: false,
      default: 'm',
    },
    imageUrl: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props) {
    const { size: sizeRef } = toRefs(props)
    const avatarSizeClasses = computed(() => {
      const sizeValue = sizeRef.value
      return {
        'h-6': sizeValue === 'ss',
        'w-6': sizeValue === 'ss',
        'h-8': sizeValue === 's',
        'w-8': sizeValue === 's',
        'h-10': sizeValue === 'm',
        'w-10': sizeValue === 'm',
        'h-12': sizeValue === 'l',
        'w-12': sizeValue === 'l',
        'h-14': sizeValue === 'll',
        'w-14': sizeValue === 'll',
      }
    })

    return {
      avatarSizeClasses,
    }
  },
})
</script>
