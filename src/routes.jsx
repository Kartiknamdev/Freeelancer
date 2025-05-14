import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import DashboardLayout from "./layouts/DashboardLayout";
import App from "./App";
import LoadingScreen from "./components/ui/LoadingScreen";
import { useAuth } from "./contextStore/auth.context";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const CreateTask = lazy(() => import("./pages/dashboard/CreateTask"));
const BrowseTasks = lazy(() => import("./pages/dashboard/BrowseTasks"));
const TaskDetails = lazy(() => import("./pages/dashboard/TaskDetails"));
const Profile = lazy(() => import("./pages/dashboard/Profile"));
const Messages = lazy(() => import("./pages/dashboard/Messages"));
const TaskHistory = lazy(() => import("./pages/dashboard/TaskHistory"));
const Settings = lazy(() => import("./pages/dashboard/Settings"));
const TaskInfo = lazy(() => import("./pages/dashboard/TaskInfo"));
const Cookies = lazy(() => import("./pages/Cookies"));
const APIDOCS = lazy(() => import("./pages/APIDOCS"));
const withSuspense = (Component) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component />
  </Suspense>
);
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const Router = createBrowserRouter([
  {
    path: "/dashboardLayout",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", index: true, element: withSuspense(Dashboard) },
      { path: "create-task", element: withSuspense(CreateTask) },
      {
        path: "browse-tasks",
        element: withSuspense(BrowseTasks),
      },
      {
        path: "browse-tasks/:taskId",
        element: withSuspense(TaskInfo),
      },
      { path: "tasks", element: withSuspense(TaskDetails) },
      { path: "profile", element: withSuspense(Profile) },
      { path: "messages", element: withSuspense(Messages) },
      { path: "history", element: withSuspense(TaskHistory) },
      { path: "settings", element: withSuspense(Settings) },
    ],
  },

  { path: "/login", element: withSuspense(Login) },
  { path: "/signup", element: withSuspense(Register) },
  { path: "/forgot-password", element: withSuspense(ForgotPassword) },
  { path: "/cookies", element: withSuspense(Cookies) },
  { path: "/api-docs", element: withSuspense(APIDOCS) },
  { path: "/", element: <App /> },
]);
