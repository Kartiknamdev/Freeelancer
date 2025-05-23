import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Router } from "./routes.jsx";
import "./index.css";
import LoadingScreen from "./components/ui/LoadingScreen.jsx";
import { TaskProvider } from "./contextStore/task.context.jsx";
import { AuthProvider } from "./contextStore/auth.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <TaskProvider>
        <Suspense fallback={<LoadingScreen />}>
          <RouterProvider router={Router} />
        </Suspense>
      </TaskProvider>
    </AuthProvider>
  </StrictMode>
);
