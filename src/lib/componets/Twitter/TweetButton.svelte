<script lang="ts">
  import Icon from 'mdi-svelte';
  import { mdiTwitter } from '@mdi/js';
  import qeuryString from 'query-string';

  export let text: string;
  export let url: string;
  export let hashtags: string[];

  const tweetBaseUrl = 'https://twitter.com/share?ref_src=twsrc%5Etfw';

  $: tweetUrl = qeuryString.stringifyUrl({
    url: tweetBaseUrl,
    query: { text, url, hashtags: hashtags.join(',') }
  });
</script>

<a
  class="flex justify-center items-center gap-2 bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded s-Uap-jPRb-uiE"
  href={tweetUrl}
  data-text="祝日"
  data-hashtags="web1week,祝日移動ガチャカレンダー"
  data-size="large"
  data-url="https://coco-gacha.memory-lovers.com/"
  data-show-count="false"
  target="_blank"
>
  <Icon path={mdiTwitter} />
  シェア
</a>
