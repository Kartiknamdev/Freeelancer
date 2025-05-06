import { createContext, useContext } from "react";

const taskContext = createContext();

export const tasks = [
  {
    id: 'task1',
    title: 'Proofread a 10-page document',
    description: 'Need someone to proofread and edit a 10-page document.',
    category: 'Proofreading',
    budget: 100,
    deadline: '2025-05-10',
    createdAt: '2025-05-01',
    status: 'open',
    createdBy: 'user456',
    tags: ['proofreading', 'editing', 'grammar'],
  },
  {
    id: 'task2',
    title: 'Research on climate change',
    description: 'Looking for a detailed research report on climate change.',
    category: 'Research',
    budget: 200,
    deadline: '2025-05-15',
    createdAt: '2025-05-02',
    status: 'open',
    createdBy: 'user789',
    tags: ['research', 'climate', 'environment'],
  },
  {
    id: 'task3',
    title: 'Edit a blog post',
    description: 'Need help editing a blog post for clarity and grammar.',
    category: 'Editing',
    budget: 50,
    deadline: '2025-05-05',
    createdAt: '2025-04-30',
    status: 'closed',
    createdBy: 'user123', // Created by the current user
    tags: ['editing', 'blog', 'content'],
  },
];

// TaskProvider component to provide tasks to the app
export const TaskProvider = ({ children }) => {
  return (
    <taskContext.Provider value={tasks}>
      {children}
    </taskContext.Provider>
  );
};

// Custom hook to use the task context
export const useTasks = () => {
  return useContext(taskContext);
};

