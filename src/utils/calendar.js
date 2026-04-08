import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';

export function getCalendarDays(month) {
  // Calendar standard: Monday start
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

const STORAGE_KEY = 'calendar_daily_notes';

export function getDateNotes() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
}

export function saveDateNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}
