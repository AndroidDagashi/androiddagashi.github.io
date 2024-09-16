<template>
  <main class="mx-auto max-w-lg px-4 pb-12 pt-10 lg:pb-16">
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
          class="block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
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
          class="block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
          @input="onInput"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import twitter from 'twitter-text'
import { defineComponent, ref } from 'vue'
import { useNuxtApp } from '#imports'
import ADCard from '~/components/molecules/ADCard/index.vue'

export default defineComponent({
  components: { ADCard },
  setup() {
    const app = useNuxtApp()

    const summary = ref('')
    const tweet = ref('')
    const milestoneNumber = ref(100)
    const tweetLength = ref(0)
    const isValidTweet = ref(false)

    const generateTweet = (
      milestoneNumber: number,
      summary: string
    ): string => {
      return (
        `一週間の #AndroidDev 開発関連ニュースをお届けする #AndroidDagashi、第${milestoneNumber}回を公開しました！ #Androidjp \n\n` +
        `${summary}\n\n` +
        `${app.$config.baseUrl}/issue/${milestoneNumber}-9999-99-99`
      )
    }

    const onInput = () => {
      tweet.value = generateTweet(milestoneNumber.value, summary.value)
      const parseResult = twitter.parseTweet(tweet.value)

      tweetLength.value = parseResult.weightedLength
      isValidTweet.value = parseResult.valid
    }

    onMounted(() => {
      // initial calculation
      onInput()
    })

    return {
      summary,
      milestoneNumber,
      tweet,
      isValidTweet,
      tweetLength,
      baseUrl: app.$config.baseUrl,
      generateTweet,
      onInput,
    }
  },
})
</script>
