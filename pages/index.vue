<template>
<div>
  <v-layout row justify-center align-center>
    <v-flex xs12 sm12 md8>
      <div class="text-xs-center">
        <img src="~/assets/image/logo.jpg" width="200" alt="Android Dagashi" class="mb-5" />
      </div>
      <v-card>
        <v-card-title class="headline">Android Dagashi</v-card-title>
        <v-card-text>
          <p><a href="https://twitter.com/hydrakecat" target="_blank">@hydrakecat</a>と<a href="https://twitter.com/_yshrsmz" target="_blank">@_yshrsmz</a>が、一週間の間に気になったAndroid関連のニュースをざっくりまとめます。</p>
          <p>おおよそ毎週日曜日の夜に更新してします。</p>
          <div class="text-xs-right">
            <em><small>&mdash; <a href="https://twitter.com/AndroidDagashi" target="_blank">@AndroidDagashi</a></small></em>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
    </v-layout>
    <v-layout row justify-center align-center>
    <v-flex xs12 sm12 md8 class="mt-2">
      <v-card>
        <v-list three-line>
          <v-subheader>Issues</v-subheader>
          <v-divider/>
          <issue-link
          v-for="(milestone, index) in nodes"
          :key="milestone.id"
          :milestone="milestone"
          :index="index"/>
        </v-list>
      </v-card>
    </v-flex>
    <!-- <section>
    <ol>
      <li
      v-for="node in nodes"
      :key="node.id"
      >
      <nuxt-link
      :to="{name: 'issue-id', params: {id:node.id}}">
      {{ node.title }}
      </nuxt-link>
      </li>
    </ol>
  </section> -->
  </v-layout>
</div>
</template>

<script lang="ts">
import { mapState, mapMutations, mapGetters } from "vuex";
import { Component, Prop, Provide, Vue } from "nuxt-property-decorator";
import getMilestones from "~/apollo/queries/getMilestones.gql";
import IssueLink from "~/components/IssueLink.vue";
import { GHMilestone } from "store";

@Component({
  name: "index",
  components: {
    IssueLink
  },
  computed: mapState(["repoOwner", "repoName", "totalCount", "nodes"])
})
export default class Index extends Vue {
  get milestonesWithDivider() {
    return ((this as any).nodes as GHMilestone[]).map;
  }

  async fetchMilestones() {
    // this.$apollo.getClient().query({
    //   query: getMilestones,
    //   variables: {
    //     repoOwner:
    //   }
    // })
  }
}
</script>

<style>

</style>
