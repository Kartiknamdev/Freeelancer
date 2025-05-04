import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Router } from "./routes.jsx";
import App from "./App.jsx";
import "./index.css";
import LoadingScreen from './components/ui/LoadingScreen.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<LoadingScreen />}>
      <RouterProvider router={Router}/>
    </Suspense>
  </StrictMode>
);
