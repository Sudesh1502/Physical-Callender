import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function NotesArea({ currentMonth }) {
  const [notes, setNotes] = useState('');
  
  const monthKey = `calendar_notes_${format(currentMonth, 'yyyy_MM')}`;

  useEffect(() => {
    const savedNotes = localStorage.getItem(monthKey);
    if (savedNotes) {
      setNotes(savedNotes);
    } else {
      setNotes('');
    }
  }, [monthKey]);

  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    localStorage.setItem(monthKey, newNotes);
  };

  return (
    <div className="flex flex-col h-full p-6 md:border-r border-gray-100 bg-white/60">
      <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4 mt-2">Notes</h3>
      
      <div className="relative flex-grow">
         <textarea
          value={notes}
          onChange={handleNotesChange}
          placeholder="Add memo..."
          className="absolute inset-0 w-full h-full resize-none bg-transparent outline-none text-gray-600 text-sm font-medium pt-[0.6rem] leading-[2rem]"
          style={{
            backgroundImage: "linear-gradient(#f1f5f9 1px, transparent 1px)",
            backgroundSize: "100% 2rem"
          }}
          spellCheck="false"
        />
      </div>
    </div>
  );
}
