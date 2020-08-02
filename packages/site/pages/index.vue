<template>
  <div>
    <v-layout justify-center align-center>
      <v-flex xs12 sm12 md8 xl6>
        <div class="text-center">
          <img :alt="title" src="/image/logo.jpg" width="200" class="mb-5" />
        </div>

        <!-- description -->
        <v-card>
          <v-card-title class="headline">
            {{ title }}
          </v-card-title>
          <v-card-text class="text--primary">
            <p>
              <template v-for="(author, index) in authors">
                <a :key="index" :href="author.link" target="_blank">{{
                  author.name
                }}</a
                >{{ getAuthorConnector(index) }}</template
              >が、一週間の間に気になったAndroid関連のニュースをざっくりまとめます。
            </p>
            <p>おおよそ毎週日曜日の夜に更新してします。</p>
            <div class="text-right">
              <em>
                <small
                  >&mdash;
                  <a :href="contact.link" target="_blank">{{ contact.name }}</a>
                </small>
              </em>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout justify-center align-center>
      <!-- Issue list -->
      <v-flex xs12 sm12 md8 xl6 class="mt-2">
        <v-card>
          <v-list three-line>
            <v-subheader>Issues</v-subheader>
            <template v-for="(item, index) in milestonesWithDivider">
              <v-divider v-if="item.isDivider" :key="index" />
              <IssueLink
                v-else
                :key="item.id"
                :milestone="item"
                :index="index"
              />
            </template>
            <template v-if="pageInfo.hasNextPage">
              <v-divider />
              <v-list-item
                class="load-next"
                @click="onLoadNext(pageInfo.endCursor)"
              >
                <v-list-item-content>
                  <v-icon x-large>
                    expand_more
                  </v-icon>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { mapState, mapGetters } from 'vuex'
import { GHDigestMilestone, GHDigest, GHPageInfo } from 'site-types/GitHubApi'
import flatmap from 'lodash.flatmap'
import { Action, Component, Vue } from 'nuxt-property-decorator'
import { ContactInfo } from 'site-types/SiteConfig'
import { Divider } from '../store'
import IssueLink from '~/components/IssueLink.vue'

import * as ActionTypes from '~/store/ActionTypes'
import * as GetterTypes from '~/store/GetterTypes'

@Component({
  name: 'index',
  components: {
    IssueLink,
  },
  computed: {
    ...mapState(['title', 'description', 'baseUrl', 'contact', 'digest']),
    ...mapGetters({ authors: GetterTypes.GET_AUTHORS }),
  },
})
export default class Index extends Vue {
  title!: string
  description!: string
  contact!: ContactInfo
  baseUrl!: string
  digest!: GHDigest
  authors!: ContactInfo[]

  @Action(ActionTypes.FETCH_DIGEST)
  fetchDigest

  // insert divider
  get milestonesWithDivider(): [GHDigestMilestone | Divider] {
    return flatmap(
      this.digest.milestones.nodes as GHDigestMilestone[],
      (milestone: GHDigestMilestone) => [{ isDivider: true }, milestone]
    )
  }

  get pageInfo(): GHPageInfo {
    return this.digest.milestones.pageInfo
  }

  async onLoadNext(endCursor: string): Promise<void> {
    await this.fetchDigest({ cursor: endCursor })
  }

  getAuthorConnector(index: number): string {
    switch (index) {
      case 0:
        return 'と'
      case this.authors.length - 1:
        return ''
      default:
        return '、'
    }
  }

  head(): Record<string, unknown> {
    return {
      meta: [
        { property: 'og:title', content: this.title },
        { property: 'og:description', content: this.description },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:url',
          content: `${this.baseUrl}${this.$route.fullPath}`,
        },
        { property: 'og:image', content: `${this.baseUrl}/image/logo.jpg` },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.load-next {
  >>> div {
    align-items: center;
  }
}
</style>
