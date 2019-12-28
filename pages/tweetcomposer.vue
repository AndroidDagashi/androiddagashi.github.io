<template>
  <v-container>
    <v-row justify="center" class="mb-8">
      <v-col cols="12" sm="8">
        <h2>Tweet Composer</h2>
      </v-col>
    </v-row>
    <v-row no-gutters justify="center" class="mb-8">
      <v-col cols="12" sm="8">
        <v-card class="mx-auto" raised>
          <v-card-text v-text="tweet" style="white-space: pre-wrap; word-wrap:break-word;"/>
          <v-card-subtitle :class="{'red--text': !isValidTweet, 'green--text': isValidTweet}">Tweet Length: {{ tweetLength }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters justify="center">
      <v-col cols="12" sm="8">
          <v-textarea outlined label="Milestone Summary" v-model="summary" @input="onInput"/>
          <v-text-field type="number" outlined label="Milestone Number" v-model="milestoneNumber" @input="onInput" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { GHDigestMilestone, GHDigest, GHPageInfo } from "types/GitHubApi";
import flatmap from "lodash.flatmap";
import { Action, Component, Vue } from "nuxt-property-decorator";
import { SiteConfigContact } from "types/SiteConfig";
import twitter, { parseTweet } from 'twitter-text'

@Component({
  name: "tweetcompser",
  computed: {
    ...mapState(["baseUrl"])
  }
})
export default class TweetComposer extends Vue {
  baseUrl!: string;

  summary: string = "";

  milestoneNumber: number = 100;

  tweet: string = ""

  isValidTweet: boolean = false

  tweetLength: number = 0

  // get tweet(): string {
  //   return this.generateTweet(this.milestoneNumber, this.summary)
  // }

  // get tweetLength(): number {
  //   let result = twitter.parseTweet(this.tweet)
  //   return result.weightedLength
  // }

  generateTweet(milestoneNumber: number, summary: string): string {
    return (
      `一週間の #AndroidDev 開発関連ニュースをお届けする #AndroidDagashi、第${milestoneNumber}回を公開しました！ #Androidjp \n\n` +
      `${summary}\n\n` +
      `${this.baseUrl}/issue/${milestoneNumber}-9999-99-99`
    );
  }

  onInput(value: string) {
    this.tweet = this.generateTweet(this.milestoneNumber, this.summary)
    let parseResult = twitter.parseTweet(this.tweet)

    this.tweetLength = parseResult.weightedLength
    this.isValidTweet = parseResult.valid
  }

  mounted() {
    // initial calculation
    this.onInput("")
  }
}
</script>
