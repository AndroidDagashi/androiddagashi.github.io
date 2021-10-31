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
          <v-card-text
            style="white-space: pre-wrap; word-wrap: break-word"
            v-text="tweet"
          />
          <v-card-subtitle
            :class="{ 'red--text': !isValidTweet, 'green--text': isValidTweet }"
          >
            Tweet Length: {{ tweetLength }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters justify="center">
      <v-col cols="12" sm="8">
        <v-textarea
          v-model="summary"
          outlined
          label="Milestone Summary"
          @input="onInput"
        />
        <v-text-field
          v-model="milestoneNumber"
          type="number"
          outlined
          label="Milestone Number"
          @input="onInput"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import twitter from 'twitter-text'

export default Vue.extend({
  name: 'Tweetcomposer',
  data() {
    return {
      summary: '',
      milestoneNumber: 100,
      tweet: '',
      isValidTweet: false,
      tweetLength: 0,
    }
  },
  computed: { ...mapState(['baseUrl']) },
  mounted(): void {
    // initial calculation
    this.onInput()
  },
  methods: {
    generateTweet(milestoneNumber: number, summary: string): string {
      return (
        `一週間の #AndroidDev 開発関連ニュースをお届けする #AndroidDagashi、第${milestoneNumber}回を公開しました！ #Androidjp \n\n` +
        `${summary}\n\n` +
        `${this.baseUrl}/issue/${milestoneNumber}-9999-99-99`
      )
    },
    onInput(): void {
      this.tweet = this.generateTweet(this.milestoneNumber, this.summary)
      const parseResult = twitter.parseTweet(this.tweet)

      this.tweetLength = parseResult.weightedLength
      this.isValidTweet = parseResult.valid
    },
  },
})
</script>
