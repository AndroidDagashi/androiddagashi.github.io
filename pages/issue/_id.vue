<template>
  <v-layout
    row
    justify-center
    align-center>
    <v-flex
      xs12
      sm12
      md8>
      <v-card>
        <v-card-title class="headline">#{{ milestone.title }}</v-card-title>
        <!-- <v-card-text v-if="milestone.description" v-html="milestone.description"/> -->
        <v-card-text>
          <div>
            <template v-for="(item, index) in issuesWithDivider">
              <v-divider
                v-if="item.isDivider"
                :key="index"/>
              <article
                v-else
                :key="item.id"
                class="mt-3">
                <div>
                  <h1
                    class="mb-1"
                    v-html="item.title"/>
                  <div class="text-xs-left mb-2">
                    <issue-label
                      v-for="(label, index) in item.labels.nodes"
                      :key="index"
                      :label-info="label"
                      :index="index"/>
                  </div>
                  <vue-markdown
                    :anchor-attributes="{ target: '_blank' }"
                    class="px-3 issue-body"
                  >{{ item.body }}</vue-markdown>
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
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { mapState } from 'vuex';
import { GHMilestone, GHLabel } from 'store';
import flatmap from 'lodash.flatmap';
import VueMarkdown from 'vue-markdown';
import IssueLabel from '~/components/IssueLabel.vue';
import axios from '~/plugins/axios';

@Component({
  name: "issue",
  components: {
    VueMarkdown,
    IssueLabel
  },
  computed: mapState(['baseUrl'])
})
export default class Issue extends Vue {
  milestone: GHMilestone;
  title: string;
  baseUrl: string;

  head() {
    const title = `${this.title} - Android Dagashi`;

    return {
      title: title,
      meta: [
        { property: 'og:title', content: title },
        {
          property: 'og:description',
          content: 'Weekly Android developer news digest in Japanese'
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `${this.baseUrl}${this.$route.fullPath}` },
        { property: 'og:image', content: '/image/logo.jpg' }
      ]
    };
  }

  get milestoneId(): string {
    return this.$route.params.id;
  }

  async asyncData({ app, params }) {
    const { data } = await axios.get(`/api/issue/${params.id}.json`);
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

<style scoped>
.issue-body {
  word-break: break-all;
}
</style>
