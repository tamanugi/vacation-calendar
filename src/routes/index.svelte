<script>
  import Calendar from '$lib/componets/Calendar/Calendar.svelte';
  import { calendarStore, changeHolidayNum } from '$lib/store/index';

  const now = new Date();
</script>

<div class="mt-4">
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    on:click={() => calendarStore.randomHoliday(now)}>祝日を移動させる</button
  >
</div>

<div class="mt-4">
  <Calendar {now} />
</div>

<div class="mt-1">
  {#if $changeHolidayNum > 0}
    <span class="text-lg mt-1">
      {$changeHolidayNum}日の祝日が今月に移動になりました🏝
    </span>
  {/if}
</div>

<style>
</style>
