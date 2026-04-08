import React, { useState, useRef } from 'react';
import { format, isSameMonth, isSameDay, isToday, isWithinInterval } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { getCalendarDays, isDateSelected, isDateInRange } from '../utils/calendar';

export default function DateGrid({ 
  currentMonth, 
  selectionStart, 
  selectionEnd, 
  activeDate,
  onDateSelect,
  onDateDoubleSelect,
  tasks = [],
  tags = {}
}) {
  const days = getCalendarDays(currentMonth);
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  
  const [hoverDate, setHoverDate] = useState(null);
  const lastClickRef = useRef({ time: 0, day: null });

  const handleDayClick = (day) => {
    const now = Date.now();
    const isDoubleTap = now - lastClickRef.current.time < 300 && isSameDay(day, lastClickRef.current.day);
    
    if (isDoubleTap) {
      onDateDoubleSelect(day);
    } else {
      onDateSelect(day);
    }
    
    lastClickRef.current = { time: now, day };
  };

  const isDayInRange = (day) => {
    if (selectionStart && selectionEnd) {
      return isDateInRange(day, selectionStart, selectionEnd);
    }
    if (selectionStart && !selectionEnd && hoverDate) {
      return isDateInRange(day, selectionStart, hoverDate);
    }
    return false;
  };

  return (
    <div className="w-full h-full flex flex-col px-4 pb-6 bg-white/80 backdrop-blur rounded-bl-3xl">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-4 border-b border-slate-100/50 pb-2">
        {weekDays.map((w, i) => (
          <div 
            key={w} 
            className={twMerge(
              "text-center text-[10px] md:text-xs font-black tracking-[0.2em] pt-2",
              i >= 5 ? "text-blue-500/60" : "text-slate-400"
            )}
          >
            {w}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-y-1 md:gap-y-2 gap-x-1 flex-grow items-start">
        {days.map((day, idx) => {
          const isSelected = isDateSelected(day, selectionStart, selectionEnd);
          const inRange = isDayInRange(day);
          const sameMonth = isSameMonth(day, currentMonth);
          const today = isToday(day);
          const isActive = isSameDay(day, activeDate);
          
          const dateKey = format(day, 'yyyy-MM-dd');
          const tagType = tags[dateKey];
          const hasNote = tasks.find(t => isWithinInterval(day, { start: t.start, end: t.end }));
          
          let roundedClasses = "";
          if ((selectionStart && isSameDay(day, selectionStart)) || 
             (selectionStart && !selectionEnd && hoverDate && isSameDay(day, selectionStart < hoverDate ? selectionStart : hoverDate))) {
            roundedClasses += " rounded-l-full";
          }
          if ((selectionEnd && isSameDay(day, selectionEnd)) || 
             (selectionStart && !selectionEnd && hoverDate && isSameDay(day, selectionStart < hoverDate ? hoverDate : selectionStart))) {
            roundedClasses += " rounded-r-full";
          }
          if (isSelected) roundedClasses = "rounded-full"; 

          return (
            <div 
              key={day.toISOString()} 
              className="relative flex items-center justify-center p-0.5 cursor-pointer select-none group"
              onMouseEnter={() => setHoverDate(day)}
              onMouseLeave={() => setHoverDate(null)}
              onClick={() => handleDayClick(day)}
              onDoubleClick={() => onDateDoubleSelect(day)}
            >
              {/* Range background */}
              {inRange && (
                <div className={twMerge(
                  "absolute inset-y-0.5 left-0 right-0 bg-blue-100/70", 
                  roundedClasses
                )} />
              )}
              
              {/* Active selection focus */}
              {isActive && !isSelected && (
                <div className="absolute inset-0.5 rounded-full bg-slate-100 animate-pulse" />
              )}

              
              <button
                className={twMerge(
                  "relative w-7 h-7 md:w-8 md:h-8 flex text-xs md:text-sm items-center justify-center font-bold rounded-full transition-all z-10 pointer-events-none",
                  isSelected ? "bg-blue-600 text-white shadow-lg scale-110" : "group-hover:bg-slate-200/50",
                  tagType === 'holiday' && !isSelected ? "bg-red-500 text-white shadow-md" : "",
                  tagType === 'custom' && !isSelected ? "bg-blue-500 text-white shadow-md" : "",
                  !sameMonth && !isSelected && !tagType ? "text-slate-300 font-normal" : "",
                  sameMonth && !isSelected && !today && !tagType ? "text-slate-700" : "",
                  today && !isSelected && !tagType ? "text-blue-600 ring-2 ring-blue-100" : ""
                )}
              >
                {format(day, 'd')}
              </button>
              
              
              {hasNote && !isSelected && (
                <div 
                   className={twMerge(
                     "absolute -bottom-0.5 z-20 w-1.5 h-1.5 rounded-full",
                     hasNote.completed ? "bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.5)]" : "bg-blue-400"
                   )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
