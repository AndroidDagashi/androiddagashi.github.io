<template functional>
  <a
    class="twitter-link"
    :href="`https://twitter.com/${props.screenName}`"
    target="_blank"
    >@{{ props.screenName }}</a
  >
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TwitterLink',
  props: {
    screenName: {
      type: String,
      required: true,
    },
  },
})
</script>
