import { createContext, useContext, useState } from "react";
import { useAuth } from "./auth.context";
import axios from "axios";

const TaskContext = createContext();
const demoTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Description for Task 1",
    budget: 100,
    createdAt: "2023-10-01T12:00:00Z",
    deadline: "2023-10-15T12:00:00Z",
    status: "completed",
    createdBy: "user123",
    category: "Web Development",
    tags: ["HTML", "CSS"],
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description for Task 2",
    budget: 200,
    createdAt: "2023-10-02T12:00:00Z",
    deadline: "2023-10-20T12:00:00Z",
    status: "completed",
    createdBy: "user456",
    category: "Mobile Development",
    tags: ["React Native", "JavaScript"],
  },
];
export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [done, setDone] = useState(false);

  const SubmitTask = async (taskDetails) => {
     try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/create-task",
        taskDetails,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      if (response.status === 201) {
        console.log("Task created successfully:", response.data);
        setDone(true);
      }
      return response;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  };
  const fetchBrowseTasks = async (userId) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/v1/users/browse-task?userId=${userId}`);
    return res.data; // array of tasks
  } catch (err) {
    console.error("Browse tasks error:", err);
    return [];
  }
};
  
  return (
    <TaskContext.Provider value={{ SubmitTask, done, setDone , demoTasks,fetchBrowseTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the task context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
