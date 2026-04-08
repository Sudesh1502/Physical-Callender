import React, { useState, useEffect } from 'react';
import { addMonths, subMonths, isSameDay, format, startOfDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from './HeroSection';
import DateGrid from './DateGrid';
import NotesArea from './NotesArea';
import NoteDialog from './NoteDialog';
import TagDialog from './TagDialog';
import { getTasks, saveTasks, getTags, saveTags } from '../utils/calendar';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectionEnd, setSelectionEnd] = useState(null);
  const [activeDate, setActiveDate] = useState(startOfDay(new Date()));
  
  // Data States
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState({});

  // Modal States
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  useEffect(() => {
    setTasks(getTasks());
    setTags(getTags());
  }, []);

  const handlePrevMonth = () => setCurrentMonth(prev => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentMonth(prev => addMonths(prev, 1));

  const handleDateSelect = (date) => {
    setActiveDate(date);
    
    if (!selectionStart || (selectionStart && selectionEnd)) {
      setSelectionStart(date);
      setSelectionEnd(null);
    } else {
      if (isSameDay(date, selectionStart)) {
        setSelectionStart(null);
      } else {
        const start = date < selectionStart ? date : selectionStart;
        const end = date < selectionStart ? selectionStart : date;
        setSelectionStart(start);
        setSelectionEnd(end);
        // Range completed -> Open Task Modal
        setIsTaskModalOpen(true);
      }
    }
  };

  const handleDoubleSelect = (date) => {
    setActiveDate(date);
    setIsTagModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    const newTasks = [...tasks, taskData];
    setTasks(newTasks);
    saveTasks(newTasks);
    setIsTaskModalOpen(false);
    // Reset selection after saving
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  const handleResetRange = () => {
    setSelectionStart(null);
    setSelectionEnd(null);
    setIsTaskModalOpen(false);
  };

  const handleSaveTag = (date, tagType) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const newTags = { ...tags };
    if (tagType) {
      newTags[dateKey] = tagType;
    } else {
      delete newTags[dateKey];
    }
    setTags(newTags);
    saveTags(newTags);
    setIsTagModalOpen(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto md:my-4 shadow-premium bg-white rounded-3xl flex flex-col relative" style={{ perspective: '1200px' }}>
        
      <div className="absolute -top-3 md:-top-4 left-0 w-full z-40 pointer-events-none flex justify-center">
        <img src="/spiral-binding.svg" alt="" className="w-[95%] max-w-3xl drop-shadow-md" />
      </div>

      <div className="relative">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentMonth.toString()}
            initial={{ rotateX: 90, opacity: 0, transformOrigin: 'top' }}
            animate={{ rotateX: 0, opacity: 1, transformOrigin: 'top' }}
            exit={{ rotateX: -90, opacity: 0, transformOrigin: 'top' }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
            className="w-full flex flex-col bg-[#fbfbfb] rounded-3xl overflow-hidden shadow-inner"
          >
            <HeroSection currentMonth={currentMonth} activeDate={activeDate} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 h-auto min-h-[20rem]">
              <div className="col-span-1 border-r border-gray-100/50 flex flex-col p-4 md:p-6 gap-2 md:-mt-8 z-20">
                <div className="w-full h-28 md:h-36 shadow-sm rounded-xl overflow-hidden bg-white mt-4 md:mt-0">
                  <NotesArea currentMonth={currentMonth} />
                </div>
                
                {/* Expanded Month Notes or Filler */}
                <div className="flex-grow w-full bg-white/40 p-4 rounded-xl border border-blue-50/50 shadow-inner">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center mt-4">
                    Select a range to add tasks
                  </p>
                </div>
                
                <div className="flex justify-between items-center bg-white p-2 rounded-xl shadow-sm border border-gray-100 mt-2">
                  <button 
                    onClick={handlePrevMonth}
                    className="flex text-sm items-center gap-1 font-bold tracking-widest px-4 py-2 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors uppercase"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <button 
                    onClick={handleNextMonth}
                    className="flex text-sm items-center gap-1 font-bold tracking-widest px-4 py-2 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors uppercase"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="col-span-1 md:col-span-2 flex flex-col p-2 md:p-6 bg-white z-20">
                <div className="h-full w-full">
                  <DateGrid 
                    currentMonth={currentMonth}
                    selectionStart={selectionStart}
                    selectionEnd={selectionEnd}
                    activeDate={activeDate}
                    onDateSelect={handleDateSelect}
                    onDateDoubleSelect={handleDoubleSelect}
                    tasks={tasks}
                    tags={tags}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Task Dialog */}
      <NoteDialog 
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        startDate={selectionStart}
        endDate={selectionEnd}
        onSave={handleSaveTask}
        onReset={handleResetRange}
      />

      {/* Tag Dialog */}
      <TagDialog
        isOpen={isTagModalOpen}
        onClose={() => setIsTagModalOpen(false)}
        date={activeDate}
        currentTag={tags[format(activeDate, 'yyyy-MM-dd')]}
        onSaveTag={handleSaveTag}
      />
    </div>
  );
}
