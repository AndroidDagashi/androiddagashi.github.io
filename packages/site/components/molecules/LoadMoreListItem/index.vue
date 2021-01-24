<template>
  <v-list-item class="d-flex justify-center" @click="onClick">
    <v-list-item-content>
      <v-icon x-large>expand_more</v-icon>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'LoadMoreListItem',
  methods: {
    onClick(event: MouseEvent): void {
      this.$emit('click', event)
    },
  },
})
</script>
