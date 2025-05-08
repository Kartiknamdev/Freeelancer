import { createContext, useContext, useState } from "react";

const taskContext = createContext();

const tasks = [
  {
    id: "task1",
    title: "Proofread a 10-page document",
    description: "Need someone to proofread and edit a 10-page document.",
    category: "Proofreading",
    budget: 100,
    deadline: "2025-05-10",
    createdAt: "2025-05-01",
    status: "open",
    createdBy: "user456",
    tags: ["proofreading", "editing", "grammar"],
  },
  {
    id: "task2",
    title: "Research on climate change",
    description: "Looking for a detailed research report on climate change.",
    category: "Research",
    budget: 200,
    deadline: "2025-05-15",
    createdAt: "2025-05-02",
    status: "open",
    createdBy: "user789",
    tags: ["research", "climate", "environment"],
  },
  {
    id: "task3",
    title: "Edit a blog post",
    description: "Need help editing a blog post for clarity and grammar.",
    category: "assigned",
    budget: 50,
    deadline: "2025-05-20",
    createdAt: "2025-04-30",
    status: "open",
    createdBy: "user122", // Created by the current user
    tags: ["editing", "blog", "content"],
  },
  {
    id: 'task4',
    title: 'Proofread a 10-page document',
    category: 'Proofreading',
    status: 'open',
    budget: 100,
    createdAt: '2025-05-01',
    deadline: '2025-05-10',
    createdBy: 'user123',
    assignedTo: 'user456',
    tags: ["editing", "blog", "content"],
  },
  {
    id: 'task5',
    title: 'Research on climate change',
    category: 'Research',
    status: 'open',
    budget: 200,
    createdAt: '2025-05-02',
    deadline: '2025-05-15',
    createdBy: 'user789',
    assignedTo: 'user124',
    tags: ["editing", "blog", "content"],
  },
  {
    id: 'task6',
    title: 'Edit a blog post',
    category: 'Editing',
    status: 'open',
    budget: 50,
    createdAt: '2025-04-30',
    deadline: '2025-05-15',
    createdBy: 'user233',
    assignedTo: null,
    tags: ["editing", "blog", "content"],
  },
];
// TaskProvider component to provide tasks to the app
export const TaskProvider = ({ children }) => {
  const [renderTask, setRenderTask] = useState({}); // Move useState inside TaskProvider
// alert(renderTask.id)
  return (
    <taskContext.Provider value={{ tasks, renderTask, setRenderTask }}>
      {children}
    </taskContext.Provider>
  );
};

// Custom hook to use the task context
export const useTasks = () => {
  return useContext(taskContext);
};