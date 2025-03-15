'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Calendar from '@/components/Calendar';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home(): React.ReactElement {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: '80rem', margin: '0 auto' }}
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            style={{
              fontSize: '2.25rem',
              lineHeight: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              background: 'linear-gradient(to right, #4f46e5, #9333ea, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Our Memory Calendar
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ color: '#4B5563' }}
          >
            Cherishing our moments together, one photo at a time ✨
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Calendar />
          </Suspense>
        </motion.div>
      </motion.div>
      <Toaster position="bottom-right" />
    </main>
  );
}
