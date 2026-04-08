import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Tag } from 'lucide-react';

export default function TagDialog({ isOpen, onClose, date, currentTag, onSaveTag }) {
  if (!isOpen) return null;

  const options = [
    { id: 'holiday', label: 'Mark as Holiday', color: 'bg-red-500', icon: CalendarIcon },
    { id: 'custom', label: 'Custom Tag', color: 'bg-blue-500', icon: Tag },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-sm bg-white rounded-3xl shadow-premium overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Assign Tag</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-3">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => onSaveTag(date, option.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                    currentTag === option.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-100 hover:border-blue-200 bg-white'
                  }`}
                >
                  <div className={`p-2 rounded-xl text-white ${option.color}`}>
                    <option.icon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-gray-700">{option.label}</span>
                </button>
              ))}

              <button
                onClick={() => onSaveTag(date, null)}
                className="w-full mt-4 p-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all uppercase tracking-wider"
              >
                Reset Tag
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
