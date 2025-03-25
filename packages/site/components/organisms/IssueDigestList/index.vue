<template>
  <div class="IssueDigestList border border-gray-200 bg-white sm:rounded-md">
    <ul>
      <template v-for="(item, index) in milestones" :key="index">
        <li class="IssueDigestList__item hover:bg-gray-100">
          <IssueDigest :milestone="item" :index="index" class="" />
        </li>
      </template>
    </ul>
    <slot name="bottom"></slot>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { GHDigestMilestone } from 'site-types/GitHubApi'
import { defineComponent } from 'vue'
import IssueDigest from '~/components/organisms/IssueDigest/index.vue'

export default defineComponent({
  name: 'IssueDigestList',
  components: { IssueDigest },
  props: {
    milestones: {
      type: Array as PropType<GHDigestMilestone[]>,
      required: true,
    },
  },
})
</script>

<style lang="postcss" scoped>
.IssueDigestList .IssueDigestList__item {
  @apply relative;

  &:not(:last-child):after {
    content: '';
    position: absolute;
    width: calc(100% - 3rem);
    height: 1px;
    margin-right: 0.5em;
    margin-left: 0.5em;

    @apply bg-gray-200;
  }
}
</style>
