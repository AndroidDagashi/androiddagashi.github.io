<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm12 md8>
      <v-card>
        <v-card-title class="headline"> #{{ milestone.title }} </v-card-title>
        <v-card-text
          v-if="milestone.description"
          class="md-body text--primary"
          v-html="$md.render(milestone.description)"
        />
        <v-card-text>
          <share-widgets />
          <div>
            <template v-for="(item, index) in issuesWithDivider">
              <v-divider v-if="item.isDivider" :key="index" />
              <article v-else :key="item.id" class="mt-3">
                <div>
                  <h1 class="mb-1" v-html="item.title" />
                  <div class="text-left mb-2">
                    <issue-label
                      v-for="(label, index2) in item.labels.nodes"
                      :key="index2"
                      :label-info="label"
                      :index="index2"
                    />
                  </div>
                  <div
                    class="issue-body md-body text--primary"
                    v-html="$md.render(item.body)"
                  />
                  <v-container class="px-0">
                    <v-layout v-if="item.comments.totalCount">
                      <issue-comments :issue="item" />
                    </v-layout>
                    <v-layout justify-end>
                      <v-btn :href="item.url" class="mr-0" text target="_blank">
                        GitHubで見る
                      </v-btn>
                    </v-layout>
                  </v-container>
                </div>
              </article>
            </template>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import { GHMilestone, GHIssue } from 'site-types/GitHubApi'
import flatmap from 'lodash.flatmap'
import { Component, Vue } from 'vue-property-decorator'
import { Divider } from '../../store'
import IssueLabel from '~/components/IssueLabel.vue'
import ShareWidgets from '~/components/ShareWidgets.vue'
import IssueComments from '~/components/IssueComments.vue'

@Component({
  name: 'issue',
  components: {
    IssueLabel,
    IssueComments,
    ShareWidgets,
  },
  computed: mapState({
    siteTitle: 'title',
    description: 'description',
    baseUrl: 'baseUrl',
  }),
  async asyncData({ route, $api }) {
    const data = await $api.get<GHMilestone>(
      `/api/issue/${route.params.id}.json`
    )
    return {
      milestone: data,
      title: `#${data.title}`,
    }
  },
})
export default class Issue extends Vue {
  milestone!: GHMilestone
  title = ''

  siteTitle!: string
  description!: string
  baseUrl!: string

  head(): Record<string, unknown> {
    let titleDescription = ''
    if (this.milestone.description) {
      titleDescription = `: ${this.milestone.description}`
    }
    const title = `${this.title}${titleDescription} - ${this.siteTitle}`

    return {
      title,
      meta: [
        { property: 'og:title', content: title },
        {
          property: 'og:description',
          content: this.milestone.description || this.description,
        },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:url',
          content: `${this.baseUrl}${this.$route.fullPath}`,
        },
        { property: 'og:image', content: `${this.baseUrl}/image/logo.jpg` },
        {
          name: 'description',
          hid: 'description',
          content: this.milestone.description || this.description,
        },
      ],
    }
  }

  get milestoneId(): string {
    return this.$route.params.id
  }

  get issuesWithDivider(): GHIssue | Divider {
    return flatmap(this.milestone.issues.nodes, (value) => [
      { isDivider: true },
      value,
    ])
  }
}
</script>

<style lang="scss" scoped></style>
