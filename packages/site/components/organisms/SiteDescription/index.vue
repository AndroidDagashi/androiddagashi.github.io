<template>
  <v-card>
    <v-card-title class="headline">
      {{ siteName }}
    </v-card-title>
    <v-card-text class="text--primary">
      <p>
        <template v-for="(author, index) in authors">
          <TwitterLink :key="index" :screen-name="author.name" />
          {{ getAuthorConnector(index) }}</template
        >が、一週間の間に気になったAndroid関連のニュースをざっくりまとめます。
      </p>
      <p>おおよそ毎週日曜日の夜に更新してします。</p>
      <div class="text-right">
        <em>
          <small
            >&mdash;
            <TwitterLink :screen-name="contact.name" />
          </small>
        </em>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { ContactInfo } from '~/../site-types/SiteConfig'
import TwitterLink from '~/components/atoms/TwitterLink/index.vue'

export default Vue.extend({
  name: 'SiteDescription',
  components: { TwitterLink },
  props: {
    siteName: {
      type: String,
      required: true,
    },
    authors: {
      type: Array as PropType<ContactInfo[]>,
      required: true,
    },
    contact: {
      type: Object as PropType<ContactInfo>,
      required: true,
    },
  },
  methods: {
    getAuthorConnector(index: number): string {
      switch (index) {
        case 0:
          return 'と'
        case this.authors.length - 1:
          return ''
        default:
          return '、'
      }
    },
  },
})
</script>
