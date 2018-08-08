/* eslint vue/no-v-html: "off"  */
<template>
  <v-layout
    row
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm12
      md8
    >
      <v-card>
        <v-card-title class="headline">#{{ milestone.title }}</v-card-title>
        <v-card-text
          v-if="milestone.description"
          class="md-body"
          v-html="$md.render(milestone.description)"
        />
        <v-card-text>
          <share-widgets />
          <div>
            <template v-for="(item, index) in issuesWithDivider">
              <v-divider
                v-if="item.isDivider"
                :key="index"
              />
              <article
                v-else
                :key="item.id"
                class="mt-3"
              >
                <div>
                  <h1
                    class="mb-1"
                    v-html="item.title"
                  />
                  <div class="text-xs-left mb-2">
                    <issue-label
                      v-for="(label, index2) in item.labels.nodes"
                      :key="index2"
                      :label-info="label"
                      :index="index2"
                    />
                  </div>
                  <div
                    class="issue-body md-body"
                    v-html="$md.render(item.body)"
                  />
                  <v-container class="px-0">
                    <v-layout
                      v-if="item.comments.totalCount"
                      row
                    >
                      <issue-comments :issue="item" />
                    </v-layout>
                    <v-layout
                      row
                      justify-end
                    >
                      <v-btn
                        :href="item.url"
                        class="mr-0"
                        flat
                        target="_blank"
                      >
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
import { mapState } from 'vuex';
import { GHMilestone, GHLabel } from 'types/GitHubApi';
import flatmap from 'lodash.flatmap';
import IssueLabel from '~/components/IssueLabel.vue';
import ShareWidgets from '~/components/ShareWidgets.vue';
import IssueComments from '~/components/IssueComments.vue';
import axios from '~/plugins/axios';
import Component from 'nuxt-class-component';
import Vue from 'vue';

@Component({
  name: "issue",
  components: {
    IssueLabel,
    IssueComments,
    ShareWidgets
  },
  computed: mapState({
    siteTitle: "title",
    description: "description",
    baseUrl: "baseUrl"
  })
})
export default class Issue extends Vue {

  milestone: GHMilestone;
  title: string;

  siteTitle: string;
  description: string;
  baseUrl: string;

  head() {
    const title = `${this.title} - ${this.siteTitle}`;

    return {
      title: title,
      meta: [
        { property: 'og:title', content: title },
        {
          property: 'og:description',
          content: this.description
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `${this.baseUrl}${this.$route.fullPath}` },
        { property: 'og:image', content: `${this.baseUrl}/image/logo.jpg` }
      ]
    };
  }

  get milestoneId(): string {
    return this.$route.params.id;
  }

  async asyncData({ app, params }) {
    let data;
    if (process.server){
      data = JSON.parse(
              require('fs').readFileSync(`./static/api/issue/${params.id}.json`, 'utf8')
            );
    } else {
      let res = await axios.get(`/api/issue/${params.id}.json`);
      data=res.data;
    }
    return {
      milestone: data,
      title: `#${data.title}`
    };
  }

  get issuesWithDivider() {
    return flatmap(this.milestone.issues.nodes, (value, index, array) => [
      { isDivider: true },
      value
    ]);
  }
}
</script>

<style lang="stylus" scoped>
</style>

