<template>
  <v-list three-line>
    <v-subheader>Issues</v-subheader>
    <template v-for="(item, index) in items">
      <v-divider v-if="item.isDivider" :key="index" />
      <IssueDigest v-else :key="item.id" :milestone="item" :index="index" />
    </template>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import flatmap from 'lodash.flatmap'
import { GHDigestMilestone } from '~/../site-types/GitHubApi'
import IssueDigest from '~/components/organisms/IssueDigest/index.vue'
import { Divider } from '~/store'

export default Vue.extend({
  name: 'IssueDigestList',
  components: { IssueDigest },
  props: {
    milestones: {
      type: Array as PropType<GHDigestMilestone[]>,
      required: true,
    },
  },
  computed: {
    items(): [GHDigestMilestone | Divider] {
      return flatmap(this.milestones, (item) => [{ isDivider: true }, item])
    },
  },
})
</script>

<style lang="postcss" scoped></style>
