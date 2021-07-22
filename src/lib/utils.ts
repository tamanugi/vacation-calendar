import { endOfMonth, format } from 'date-fns';
import type { CalendarDate } from './types';
import { holidays } from './syukujitu';

export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function createCalendar(now: Date): CalendarDate[] {
  const calendar: CalendarDate[] = [];
  const first = new Date(now.getFullYear(), now.getMonth(), 1);

  // 最初の曜日
  const firstDay = first.getDay();
  // 最初の分だけ埋める
  for (let i = 0; i < firstDay; i++) {
    calendar.push({ date: null });
  }

  // 最後の日
  const endDay = endOfMonth(now);
  for (let i = 1; i <= endDay.getDate(); i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), i);
    const calendaDay: CalendarDate = {
      date: d,
      dow: d.getDay(),
      holiday: holidays[format(d, 'yyyy/MM/dd')]
    };
    calendar.push(calendaDay);
  }

  // 最後足りない分を埋める
  for (let i = 0; i < 6 - endDay.getDay(); i++) {
    calendar.push({ date: null });
  }

  return calendar;
}

export function dayOfWeekClass(value: string | number): string {
  if (value == null) return 'nullday';

  const _dayOfWeekClass = { 日: 'sunday', 土: 'saturday', 0: 'sunday', 6: 'saturday' };
  return _dayOfWeekClass[value];
}
