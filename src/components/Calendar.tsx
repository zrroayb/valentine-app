'use client';

import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import Image from 'next/image';
import MemoryModal from './MemoryModal';
import { Memory } from '@/types/memory';
import { motion, AnimatePresence } from 'framer-motion';
import { notify } from '@/utils/notifications';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const daysInCalendar = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const weeks = [];
  let week = [];

  daysInCalendar.forEach((day) => {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
    notify.success('Opening memories for ' + format(date, 'MMMM d, yyyy'));
  };

  const getMemoriesForDate = (date: Date) => {
    return memories.filter(memory => 
      format(new Date(memory.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="calendar-container">
      <motion.div
        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 rounded-t-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={previousMonth}
            className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
          >
            <ChevronLeftIcon className="w-6 h-6 text-white" />
          </motion.button>
          <motion.h2
            key={currentDate.toISOString()}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white tracking-wide"
          >
            {format(currentDate, 'MMMM yyyy')}
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextMonth}
            className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
          >
            <ChevronRightIcon className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </motion.div>

      <div className="p-6 bg-white rounded-b-xl">
        <div className="grid grid-cols-7 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="text-center font-semibold text-gray-600 text-sm py-2 border-b-2 border-gray-100"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {weeks.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map((day) => {
                const dayMemories = getMemoriesForDate(day);
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isCurrentDay = isToday(day);

                return (
                  <motion.div
                    key={day.toISOString()}
                    whileHover={{ scale: 0.98 }}
                    onClick={() => handleDayClick(day)}
                    className={`
                      relative bg-white p-2 min-h-[120px] transition-all duration-200
                      ${!isCurrentMonth ? 'bg-gray-50' : 'hover:bg-gray-50'}
                      ${isCurrentDay ? 'ring-2 ring-purple-500 ring-offset-2' : ''}
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`
                          inline-flex items-center justify-center w-7 h-7 rounded-full
                          ${isCurrentDay ? 'bg-purple-500 text-white' : ''}
                          ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-700'}
                        `}
                      >
                        {format(day, 'd')}
                      </span>
                      {dayMemories.length > 0 && (
                        <span className="text-xs font-medium text-purple-600">
                          {dayMemories.length} memories
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-1">
                      {dayMemories.slice(0, 4).map((memory, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className="relative aspect-square rounded-lg overflow-hidden shadow-sm"
                        >
                          <Image
                            src={memory.imageUrl}
                            alt={memory.caption}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 30px, 50px"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-200" />
                        </motion.div>
                      ))}
                    </div>

                    {dayMemories.length > 4 && (
                      <div className="absolute bottom-1 right-1 bg-purple-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
                        +{dayMemories.length - 4}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedDate && (
          <MemoryModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            date={selectedDate}
            memories={getMemoriesForDate(selectedDate)}
            onMemoryAdded={(newMemory) => {
              setMemories([...memories, newMemory]);
              setIsModalOpen(false);
              notify.success('Memory added successfully!');
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 