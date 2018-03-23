<template>
  <div>
    <v-layout
      row
      justify-center
      align-center>
      <v-flex
        xs12
        sm12
        md8>
        <div class="text-xs-center">
          <img
            src="~/assets/image/logo.jpg"
            width="200"
            alt="Android Dagashi"
            class="mb-5" >
        </div>

        <!-- description -->
        <v-card>
          <v-card-title class="headline">Android Dagashi</v-card-title>
          <v-card-text>
            <p><a
              href="https://twitter.com/hydrakecat"
              target="_blank">@hydrakecat</a>と<a
                href="https://twitter.com/_yshrsmz"
                target="_blank">@_yshrsmz</a>が、一週間の間に気になったAndroid関連のニュースをざっくりまとめます。</p>
            <p>おおよそ毎週日曜日の夜に更新してします。</p>
            <div class="text-xs-right">
              <em><small>&mdash; <a
                href="https://twitter.com/AndroidDagashi"
                target="_blank">@AndroidDagashi</a></small></em>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout
      row
      justify-center
      align-center>

      <!-- Issue list -->
      <v-flex
        xs12
        sm12
        md8
        class="mt-2">
        <v-card>
          <v-list three-line>
            <v-subheader>Issues</v-subheader>
            <template v-for="(item, index) in milestonesWithDivider">
              <v-divider
                v-if="item.isDivider"
                :key="index"/>
              <issue-link
                v-else
                :key="item.id"
                :milestone="item"
                :index="index"/>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { mapState, mapMutations, mapGetters } from 'vuex';
import { Component, Prop, Provide, Vue } from 'nuxt-property-decorator';
import getMilestones from '~/apollo/queries/getMilestones.gql';
import IssueLink from '~/components/IssueLink.vue';
import { GHDigestMilestone } from '~/store';
import flatmap from 'lodash.flatmap';

type VDividerItem = {
  isDivider: boolean;
};

@Component({
  name: "index",
  components: {
    IssueLink
  },
  computed: mapState(["repoOwner", "repoName"])
})
export default class Index extends Vue {
  // insert divider
  get milestonesWithDivider() {
    return flatmap(
      (this as any).digest.milestones.nodes as GHDigestMilestone[],
      (milestone: GHDigestMilestone) => [{ isDivider: true }, milestone]
    );
  }

  async asyncData({ app, params }) {
    const { data } = await app.$dagashiApi.get('/index.json');
    return {
      digest: data
    };
  }
}
</script>

<style>

</style>
