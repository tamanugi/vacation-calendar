<script>
  import Calendar from '$lib/componets/Calendar/Calendar.svelte';
  import TweetButton from '$lib/componets/Twitter/TweetButton.svelte';
  import { calendarStore, changeHolidayNum } from '$lib/store/index';
  import { toPng } from 'html-to-image';
  import { onDestroy } from 'svelte';

  async function handleImageDownload() {
    const node = document.getElementById('calendar');
    toPng(node, { backgroundColor: 'white' })
      .then((dataurl) => {
        const a = document.createElement('a');
        a.href = dataurl;
        a.setAttribute('download', 'calendar');
        a.click();
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

  let tweetText;
  const unsubscriber = calendarStore.subscribe((cal) => {
    const count = cal.filter((c) => c.before).length;

    let max = 1;
    let consecutive = 1;
    let prev = -1;
    for (let cc of cal.filter((c) => c.holiday || c.dow === 0 || c.dow === 6)) {
      if (cc.date.getDate() - prev == 1) {
        consecutive++;
      } else {
        max = Math.max(max, consecutive);
        consecutive = 1;
      }
      prev = cc.date.getDate();
    }

    tweetText = `${count}日の祝日が今月に移動しました♪\n最長で${max}連休🏝`;
  });

  const now = new Date();

  onDestroy(unsubscriber);
</script>

<div class="mt-4">
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    on:click={() => calendarStore.randomHoliday(now)}>祝日を移動させる</button
  >
</div>

<div id="calendar" class="p-4">
  <Calendar {now} />
</div>

{#if $changeHolidayNum > 0}
  <div class="mt-1">
    <span class="text-lg mt-1">
      {$changeHolidayNum}日の祝日が今月に移動になりました🏝
    </span>
  </div>

  <div class="mt-1 flex gap-4">
    <TweetButton
      text={tweetText}
      url={'https://vacation-calendar.vercel.app/'}
      hashtags={['web1week', '祝日移動ガチャカレンダー']}
    />

    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      on:click={handleImageDownload}>画像DL</button
    >
  </div>
{/if}

<style>
</style>
