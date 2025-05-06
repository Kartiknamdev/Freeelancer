import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Router } from "./routes.jsx";
import App from "./App.jsx";
import "./index.css";
import LoadingScreen from './components/ui/LoadingScreen.jsx'
import { TaskProvider } from "./contextStore/task.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TaskProvider>
    <Suspense fallback={<LoadingScreen />}>
      <RouterProvider router={Router}/>
    </Suspense>
    </TaskProvider>
  </StrictMode>
);
