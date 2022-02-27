<template>
  <a class="twitter-link underline" :href="url" target="_blank"
    >@{{ screenName }}</a
  >
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { twitterUrl } from '~/utils/urls'

export default defineComponent({
  name: 'TwitterLink',
  props: {
    screenName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const url = computed(() => twitterUrl(props.screenName))

    return {
      url,
    }
  },
})
</script>
