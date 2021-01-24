<template>
  <div>
    <v-layout justify-center align-center>
      <v-flex xs12 sm12 md8 xl6>
        <div class="text-center">
          <img :alt="title" src="/image/logo.jpg" width="200" class="mb-5" />
        </div>

        <!-- description -->
        <SiteDescription
          :authors="authors"
          :contact="contact"
          :site-name="title"
        />
      </v-flex>
    </v-layout>
    <v-layout justify-center align-center>
      <!-- Issue list -->
      <v-flex xs12 sm12 md8 xl6 class="mt-2">
        <v-card>
          <IssueDigestList :milestones="milestones" />
          <template v-if="pageInfo.hasNextPage">
            <v-divider />
            <LoadMoreListItem @click="onLoadNext" />
          </template>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import { GHDigestMilestone, GHPageInfo } from 'site-types/GitHubApi'
import { renderOGPMeta } from '../utils/ogp'
import IssueDigestList from '~/components/organisms/IssueDigestList/index.vue'
import LoadMoreListItem from '~/components/molecules/LoadMoreListItem/index.vue'
import SiteDescription from '~/components/organisms/SiteDescription/index.vue'

import * as ActionTypes from '~/store/ActionTypes'
import * as GetterTypes from '~/store/GetterTypes'

export default Vue.extend({
  name: 'Index',
  components: {
    IssueDigestList,
    LoadMoreListItem,
    SiteDescription,
  },
  head(): Record<string, unknown> {
    return {
      meta: [
        ...renderOGPMeta({
          title: this.title,
          description: this.description,
          url: `${this.baseUrl}${this.$route.fullPath}`,
        }),
      ],
    }
  },
  computed: {
    ...mapState(['title', 'description', 'baseUrl', 'contact', 'digest']),
    ...mapGetters({ authors: GetterTypes.GET_AUTHORS }),
    milestones(): GHDigestMilestone[] {
      return this.digest.milestones.nodes
    },
    pageInfo(): GHPageInfo {
      return this.digest.milestones.pageInfo
    },
  },
  methods: {
    ...mapActions({ fetchDigest: ActionTypes.FETCH_DIGEST }),
    async onLoadNext(): Promise<void> {
      await this.fetchDigest({ cursor: this.pageInfo.endCursor })
    },
  },
})
</script>
