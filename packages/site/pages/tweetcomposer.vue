<template>
  <main class="max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16">
    <h2 class="text-xl font-semibold">Tweet Composer</h2>

    <div class="mt-4">
      <label class="block text-sm font-medium text-gray-700"
        >Tweet Preview</label
      >
      <ADCard class="mt-3" shadow>
        <p
          class="whitespace-pre-wrap"
          style="word-wrap: break-word"
          v-text="tweet"
        />
        <p
          class="mt-5"
          :class="{
            'text-red-500': !isValidTweet,
            'text-green-500': isValidTweet,
          }"
        >
          Tweet Length: {{ tweetLength }}
        </p>
      </ADCard>
    </div>

    <div class="mt-4">
      <label
        for="midlestone-summary"
        class="block text-sm font-medium text-gray-700"
        >Milestone Summary</label
      >
      <div class="mt-1">
        <textarea
          v-model="summary"
          rows="5"
          name="milestone-summary"
          class="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md bg-white"
          @input="onInput"
        />
      </div>
    </div>

    <div class="mt-4">
      <label
        for="midlestone-number"
        class="block text-sm font-medium text-gray-700"
        >Milestone Number</label
      >
      <div class="mt-1">
        <input
          v-model="milestoneNumber"
          type="number"
          name="milestone-number"
          class="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md bg-white"
          @input="onInput"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
// eslint-disable-next-line import/default
import twitter from 'twitter-text'
import { defineComponent } from '@vue/composition-api'
import ADCard from '~/components/molecules/ADCard/index.vue'

export default defineComponent({
  components: { ADCard },
  data() {
    return {
      summary: '',
      milestoneNumber: 100,
      tweet: '',
      isValidTweet: false,
      tweetLength: 0,
      baseUrl: this.$config.baseUrl,
    }
  },
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
