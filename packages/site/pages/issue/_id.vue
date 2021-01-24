<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm12 md8 xl6>
      <v-card>
        <v-card-title class="headline"> #{{ milestone.title }} </v-card-title>
        <v-card-text
          v-if="milestone.description"
          class="md-body text--primary"
          v-html="$md.render(milestone.description)"
        />
        <v-card-text>
          <ShareWidgets />
          <div>
            <template v-for="(item, index) in issuesWithDivider">
              <v-divider v-if="item.isDivider" :key="index" />
              <article v-else :key="item.id" class="mt-3">
                <div>
                  <h1 class="mb-1" v-html="item.title" />
                  <div class="text-left mb-2">
                    <IssueLabel
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
                      <IssueComments :issue="item" />
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
import Vue from 'vue'
import { mapState } from 'vuex'
import { GHMilestone, GHIssue } from 'site-types/GitHubApi'
import flatmap from 'lodash.flatmap'
import { Divider } from '../../store'
import { renderOGPMeta } from '../../utils/ogp'
import IssueLabel from '~/components/IssueLabel.vue'
import ShareWidgets from '~/components/ShareWidgets.vue'
import IssueComments from '~/components/IssueComments.vue'
import { loadScripts } from '~/utils/sharewidget-scripts'

interface IssueData {
  milestone: GHMilestone | null
  title: string
}

export default Vue.extend({
  name: 'Issue',
  components: { IssueLabel, IssueComments, ShareWidgets },
  async asyncData({ route, $api }): Promise<IssueData> {
    const data = await $api.get<GHMilestone>(
      `/api/issue/${route.params.id}.json`
    )
    return {
      milestone: data,
      title: `#${data.title}`,
    }
  },
  data(): IssueData {
    return {
      milestone: null,
      title: '',
    }
  },
  head(): Record<string, unknown> {
    let titleDescription = ''
    if (this.milestone.description) {
      titleDescription = `: ${this.milestone.description}`
    }
    const title = `${this.title}${titleDescription} - ${this.siteTitle}`

    return {
      title,
      meta: [
        ...renderOGPMeta({
          title,
          description: this.milestone.description || this.description,
          url: `${this.baseUrl}${this.$route.fullPath}`,
        }),
      ],
    }
  },
  computed: {
    ...mapState({
      siteTitle: 'title',
      description: 'description',
      baseUrl: 'baseUrl',
    }),
    milestoneId(): string {
      return this.$route.params.id
    },
    issuesWithDivider(): (GHIssue | Divider)[] {
      return flatmap(this.milestone.issues.nodes, (value) => [
        { isDivider: true },
        value,
      ])
    },
  },
  mounted() {
    loadScripts(document)
  },
})
</script>

<style lang="scss" scoped></style>
