import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../../contextStore/task.context";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
export default function TaskInfo() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { tasks } = useTasks();

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">Task not found.</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
    <button
      onClick={() => navigate("/dashboardLayout/browse-tasks")}
      className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
    >
      ← Back to Browse Tasks
    </button>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8"
    >
      <div className="flex items-center gap-2 mb-6">
        <Sparkles size={24} className="text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">Task Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
        <div>
          <p className="font-semibold">Description:</p>
          <p className="mt-1">{task.description}</p>
        </div>

        <div>
          <p className="font-semibold">Amount:</p>
          <p className="mt-1">${task.budget}</p>
        </div>

        <div>
          <p className="font-semibold">State:</p>
          <p className="mt-1 capitalize">{task.status}</p>
        </div>

        <div>
          <p className="font-semibold">Deadline:</p>
          <p className="mt-1">{task.deadline}</p>
        </div>

        <div>
          <p className="font-semibold">Category:</p>
          <p className="mt-1">{task.category}</p>
        </div>

        <div>
          <p className="font-semibold">Tags:</p>
          <p className="mt-1">{task.tags.join(",")}</p>
        </div>
      </div>
    </motion.div>
  </div>
  );
}
