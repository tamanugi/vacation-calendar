<script lang="ts">
  import type { CalendarDate } from '$lib/types';

  import { dayOfWeekClass } from '$lib/utils';
  export let date: CalendarDate;
</script>

{#if date.date}
  <div class="cell p-2 {dayOfWeekClass(date.dow)}" class:sunday={date.dow == 0 || date.holiday}>
    <div class="">{date.date.getDate()}</div>
    {#if date.holiday}
      <div class="mt-1 text-sm font-bold">{date.holiday}</div>
      {#if date.before}
        <div class="text-sm">{date.before}</div>
      {/if}
    {/if}
  </div>
{:else}
  <div class="cell nullday" />
{/if}

<style>
  .cell {
    width: 120px;
    height: 90px;
    box-shadow: 0 0 0 var(--border-size) var(--border-color);

    font-size: 1.2rem;
  }
</style>
