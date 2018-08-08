<template>
  <div>
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
        <div class="text-xs-center">
          <img
            :alt="title"
            src="/image/logo.jpg"
            width="200"
            class="mb-5"
          >
        </div>

        <!-- description -->
        <v-card>
          <v-card-title class="headline">{{ title }}</v-card-title>
          <v-card-text>
            <p><a
              href="https://twitter.com/hydrakecat"
              target="_blank"
            >@hydrakecat</a>と<a
              href="https://twitter.com/_yshrsmz"
              target="_blank"
            >@_yshrsmz</a>が、一週間の間に気になったAndroid関連のニュースをざっくりまとめます。</p>
            <p>おおよそ毎週日曜日の夜に更新してします。</p>
            <div class="text-xs-right">
              <em><small>&mdash; <a
                :href="contact.link"
                target="_blank"
              >{{ contact.name }}</a></small></em>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout
      row
      justify-center
      align-center
    >

      <!-- Issue list -->
      <v-flex
        xs12
        sm12
        md8
        class="mt-2"
      >
        <v-card>
          <v-list three-line>
            <v-subheader>Issues</v-subheader>
            <template v-for="(item, index) in milestonesWithDivider">
              <v-divider
                v-if="item.isDivider"
                :key="index"
              />
              <issue-link
                v-else
                :key="item.id"
                :milestone="item"
                :index="index"
              />
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { mapState, mapMutations, mapGetters } from 'vuex';
import IssueLink from '~/components/IssueLink.vue';
import { GHDigestMilestone, GHDigest } from 'types/GitHubApi';
import flatmap from 'lodash.flatmap';
import axios from '~/plugins/axios';
import Component from 'nuxt-class-component';
import Vue from 'vue';
import { SiteConfigContact } from 'types/SiteConfig';

type VDividerItem = {
  isDivider: boolean;
};

@Component({
  name: "index",
  components: {
    IssueLink
  },
  computed: mapState(["title", "description", "baseUrl", "contact"])
})
export default class Index extends Vue {

  title: string;
  description: string;
  contact: SiteConfigContact;
  baseUrl: string;
  digest: GHDigest;

  // insert divider
  get milestonesWithDivider() {
    return flatmap(
      this.digest.milestones.nodes as GHDigestMilestone[],
      (milestone: GHDigestMilestone) => [{ isDivider: true }, milestone]
    );
  }

  async asyncData({ app, params, isStatic }) {
    let data;
    if (process.server) {
      data = JSON.parse(
        require('fs').readFileSync('./static/api/index.json', 'utf8')
      );
    } else {
      let res = await axios.get('/api/index.json');
      data = res.data;
    }

    return {
      digest: data
    };
  }

  head() {
    return {
      meta: [
        { property: 'og:title', content: this.title },
        { property: 'og:description', content: this.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `${this.baseUrl}${this.$route.fullPath}` },
        { property: 'og:image', content: `${this.baseUrl}/image/logo.jpg` }
      ]
    };
  }
}
</script>

<style>

</style>
