<script lang="ts">
  import { dayOfWeekClass } from '$lib/utils';
  import Cell from './Cell.svelte';
  import { calendarStore } from '$lib/store/index';

  export let now: Date;

  const dayOfWeeks = ['日', '月', '火', '水', '木', '金', '土'];
</script>

<h2 class="text-3xl text-center">{now.getMonth() + 1}月</h2>

<div class="flex justify-center items-center mt-3">
  <div class="calendar">
    {#each dayOfWeeks as dayOfWeek}
      <div class="header {dayOfWeekClass(dayOfWeek)}">{dayOfWeek}</div>
    {/each}
    {#each $calendarStore as d}
      <Cell date={d} />
    {/each}
  </div>
</div>

<style>
  .calendar {
    max-width: 100vw;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    box-sizing: border-box;
    grid-gap: var(--border-size);
  }

  .header {
    height: 50px;
    box-shadow: 0 0 0 var(--border-size) var(--border-color);

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
