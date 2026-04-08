import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';

export function getCalendarDays(month) {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
  
  return eachDayOfInterval({ start, end });
}

export function isDateInRange(date, start, end) {
  if (!start || !end) return false;
  // If end is before start (user clicked inverted), swap logic internally or handle in component
  // Better to handle swapping in component and ensure start <= end here
  const actualStart = start > end ? end : start;
  const actualEnd = start > end ? start : end;
  
  return date > actualStart && date < actualEnd;
}

export function isDateSelected(date, selectionStart, selectionEnd) {
  if (selectionStart && isSameDay(date, selectionStart)) return true;
  if (selectionEnd && isSameDay(date, selectionEnd)) return true;
  return false;
}

const TASKS_KEY = 'calendar_range_tasks';
const TAGS_KEY = 'calendar_date_tags';

export function getTasks() {
  try {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function getTags() {
  try {
    const data = localStorage.getItem(TAGS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
}

export function saveTags(tags) {
  localStorage.setItem(TAGS_KEY, JSON.stringify(tags));
}
