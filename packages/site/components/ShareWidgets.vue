<template>
  <div class="h-5">
    <client-only placeholder="loading share widgets...">
      <div class="flex flex-row">
        <span>
          <a
            href="https://twitter.com/share?ref_src=twsrc%5Etfw"
            class="twitter-share-button"
            data-hashtags="AndroidDagashi"
            data-show-count="false"
            >Tweet</a
          >
        </span>
        <span class="ml-2">
          <a
            href="http://b.hatena.ne.jp/entry/"
            class="hatena-bookmark-button"
            data-hatena-bookmark-layout="basic-label-counter"
            data-hatena-bookmark-lang="ja"
            title="このエントリーをはてなブックマークに追加"
          >
            <img
              src="https://b.st-hatena.com/images/entry-button/button-only@2x.png"
              alt="このエントリーをはてなブックマークに追加"
              width="20"
              height="20"
              style="border: none"
            />
          </a>
        </span>
      </div>
    </client-only>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ShareWidgets',
})
</script>
