import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function TaskInfo() {
  
  // Find the task by ID
const location =useLocation();
const task = location.state?.task;

console.log("current tak is: ",task);
  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">Task not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-4xl w-full bg-white/10 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/20 p-10 transform hover:scale-[1.015] hover:shadow-[0_25px_70px_rgba(0,0,0,0.6)] transition duration-300"
      >
        <div className="absolute -top-5 -left-5">
          <Sparkles size={36} className="text-indigo-300 animate-pulse" />
        </div>
        <h2 className="text-4xl font-extrabold text-center text-white mb-10 tracking-wider drop-shadow-md">🚀 Task Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white text-base">
          <div>
            <p className="font-medium text-pink-300">Description:</p>
            <p className="mt-1 text-white/90">{task.description}</p>
          </div>
          <div>
            <p className="font-medium text-pink-300">Amount:</p>
            <p className="mt-1">${task.budget}</p>
          </div>
          <div>
            <p className="font-medium text-pink-300">State:</p>
            <p className="mt-1">{task.status}</p>
          </div>
          <div>
            <p className="font-medium text-pink-300">Deadline:</p>
            <p className="mt-1">{task.deadline}</p>
          </div>
          <div>
            <p className="font-medium text-pink-300">Category:</p>
            <p className="mt-1">{task.category}</p>
          </div>
          <div>
            <p className="font-medium text-pink-300">Tags:</p>
            <p className="mt-1">{task.tags.join(', ')}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}