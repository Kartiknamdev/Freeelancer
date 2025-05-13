import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth.context";
import axios from "axios";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [done, setDone] = useState(false);
  const [shouldFetchTasks, setShouldFetchTasks] = useState(true);

  // Submit a new task
  const submitTask = async (taskDetails) => {
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
        setShouldFetchTasks(true); // trigger re-fetch if needed
      }

      return response;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  };

  // Fetch all tasks for the user
  const fetchBrowseTasks = async (userId) => {
    if (!shouldFetchTasks || !userId || !user?.accessToken) return tasks;

    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/browse-task?userId=${userId}`
      );

      const fetchedTasks = response.data?.data;
      console.log("Browse tasks response:", fetchedTasks);

      if (Array.isArray(fetchedTasks)) {
        setTasks(fetchedTasks);
        if (fetchedTasks.length === 0) {
          setShouldFetchTasks(false);
        }
        return fetchedTasks;
      } else {
        console.warn("Expected an array, got:", fetchedTasks);
        return [];
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  };

  // Optional: Auto-fetch tasks when component mounts
  useEffect(() => {
    if (shouldFetchTasks && user?.id) {
      fetchBrowseTasks(user.id);
    }
  }, [shouldFetchTasks, user]);

  const value = {
    submitTask,
    fetchBrowseTasks,
    tasks,
    setTasks,
    done,
    setDone,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook for accessing task context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
