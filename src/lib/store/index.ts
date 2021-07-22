import type { CalendarDate } from '$lib/types';
import { derived, writable } from 'svelte/store';
import { format } from 'date-fns';
import { createCalendar, random } from '$lib/utils';
import { holidays } from '$lib/syukujitu';

function createCalendarStore() {
  const initValue = createCalendar(new Date());
  const { subscribe, set, update } = writable<CalendarDate[]>(initValue);

  return {
    subscribe,
    set,
    update,
    randomHoliday: (now) => {
      const nk = format(now, 'yyyy/MM/');
      let holidayKeys = Object.keys(holidays).filter((key) => !key.startsWith(nk));

      const newCalendar = createCalendar(now);
      newCalendar
        .filter((c) => c.date)
        .filter((c) => !c.holiday)
        .forEach((c) => {
          const holiday = random(0, 100) % 2 === 0;

          if (holiday && holidayKeys.length > 0) {
            const randomKey = holidayKeys[random(0, holidayKeys.length)];
            const randomHoliday = holidays[randomKey];
            c.holiday = randomHoliday;
            c.before = randomKey;
            holidayKeys = holidayKeys.filter((v) => v !== randomKey);
          }
        });

      set(newCalendar);
    }
  };
}

export const calendarStore = createCalendarStore();

export const changeHolidayNum = derived(
  calendarStore,
  ($state) => $state.filter((v) => v.before).length
);
