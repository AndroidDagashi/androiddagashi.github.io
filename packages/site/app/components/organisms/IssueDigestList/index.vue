<template>
  <div class="IssueDigestList border border-gray-200 bg-white sm:rounded-md">
    <ul>
      <template v-for="(item, index) in milestones" :key="index">
        <li
          class="IssueDigestList__item relative hover:bg-gray-100 after:absolute after:mx-[0.5em] after:h-px after:w-[calc(100%-3rem)] after:bg-gray-200 after:content-[''] last:after:hidden"
        >
          <IssueDigest :milestone="item" :index="index" class="" />
        </li>
      </template>
    </ul>
    <slot name="bottom"/>
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
