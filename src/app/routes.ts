import { createBrowserRouter } from "react-router";
import LandingPage from "./components/LandingPage";
import { Home } from "./pages/Home";
import { CreateTask } from "./pages/CreateTask";
import { TaskDetails } from "./pages/TaskDetails";
import { ProviderDashboard } from "./pages/ProviderDashboard";
import { CustomerDashboard } from "./pages/CustomerDashboard";
import { ProviderProfile } from "./pages/ProviderProfile";
import { ProviderOnboarding } from "./pages/ProviderOnboarding";
import { BrowseTasks } from "./pages/BrowseTasks";
import { SubmitOffer } from "./pages/SubmitOffer";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/customer/new-task",
    Component: CreateTask,
  },
  {
    path: "/app",
    Component: Home,
  },
  {
    path: "/task/:id",
    Component: TaskDetails,
  },
  {
    path: "/customer/dashboard",
    Component: CustomerDashboard,
  },
  {
    path: "/provider/dashboard",
    Component: ProviderDashboard,
  },
  {
    path: "/provider/profile/:id",
    Component: ProviderProfile,
  },
  {
    path: "/provider/onboarding",
    Component: ProviderOnboarding,
  },
  {
    path: "/provider/browse",
    Component: BrowseTasks,
  },
  {
    path: "/provider/offer/:taskId",
    Component: SubmitOffer,
  },
]);