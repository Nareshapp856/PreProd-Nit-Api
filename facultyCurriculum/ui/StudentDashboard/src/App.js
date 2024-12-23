import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Pages
import Home from "./pages/home/HomePage";
import MyPerformance from "./pages/home/MyPerformancePage";
import Results from "./pages/results/Results";
import Login from "./components/auth/Login";
import NotFound from "./shared/NotFound";
import Unauthorized from "./shared/Unauthorized";

// Week Calender
import WeekCalendar from "./components/home/weekCalender/WeekCalender";

// Context
import { MenuContextProvider } from "./context/menuContext";

// Components
import PrivateRoute from "./components/PrivateRoute";

// Feature flagging is used to control visibility of features across different environments.
// This is important for quickly adapting to changing requirements.
import { FeatureFlagProvider } from "./context/FeatureFlagContext";

// Auth-related components
import ForgotPassword from "./components/auth/ForgotPassword";
import InitialPasswordUpdate from "./components/auth/InitialPasswordUpdate";

// Attendance and curriculum-related components (may no longer be in use, but left here for reference)
import AttendanceTracker from "./components/faculty/AttendanceTracker";
import ViewCourseCurriculum from "./components/faculty/ViewCourseCurriculum";
import CreateCourseCurriculum from "./components/faculty/CreateCourseCurriculum";
import MyBatches from "./components/faculty/MyBatches";
import CourseCurriculum from "./pages/admin/main/ViewCurriculum";
import AssignBatches from "./pages/admin/main/AssignBatches";
import PendingApproval from "./components/faculty/PendingApproval";
import AssignCurriculum from "./components/faculty/AssignCurriculum";
//
import StudentPage from "./pages/home/StudentPage";

// Flags for feature toggling related to course curriculum
import { CourseCurriculumFlagProvider } from "./context/courseCurriculumFlagContext";

// Lazy-loaded components to improve initial load times.
const Faculty = lazy(() => import("./pages/Faculty/Home"));
const Admin = lazy(() => import("./pages/admin/HomePage"));
const McqExamPage = lazy(() => import("./pages/home/McqExamPage"));
const MyCourses = lazy(() => import("./pages/home/MyCourses"));

/**
 * Main application component. This sets up routing, themes, and context providers for the app.
 *
 * @param {string} userName - The username of the currently logged-in user.
 * @returns {JSX.Element} The main app structure.
 */
function AppComponent({ userName }) {
  // TODO: Improve security around routes once Role-Based Access Control (RBAC) is finalized.
  // Ensure better protection against potential vulnerabilities.

  const router = createBrowserRouter([
    // { path: "/program-results", element: <Results /> },
    {
      path: "/login",
      children: [
        { index: true, element: <Login /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "reset-initial-password", element: <InitialPasswordUpdate /> },
      ],
    },
    {
      path: "/student/mcqexampage",
      element: (
        <PrivateRoute
          allowedRoles={["student", "faculty", "admin"]}
          element={McqExamPage}
        />
      ),
    },
    {
      path: "/faculty",
      element: (
        <PrivateRoute
          element={Faculty}
          allowedRoles={["faculty", "admin"]}
          exceptions={["satyanarayanakrv111@gmail.com"]} // TODO: Remove exceptions once RBAC is fully implemented.
        />
      ),
      children: [
        { path: "attendance-tracker", element: <AttendanceTracker /> },
        { path: "pending-approval", element: <PendingApproval /> },
        { path: "view-course-curriculum", element: <ViewCourseCurriculum /> },
        {
          path: "create-course-curriculum",
          element: <CreateCourseCurriculum />,
        },
        { path: "mybatches", element: <MyBatches /> },
        { path: "assign-curriculum", element: <AssignCurriculum /> },
      ],
    },
    {
      path: "/admin",
      element: (
        <PrivateRoute
          element={Admin}
          allowedRoles={["faculty", "admin"]}
          exceptions={["satyanarayanakrv111@gmail.com"]} // TODO: Strengthen security once RBAC is in place.
        />
      ),
      children: [
        { path: "course-curriculum", element: <CourseCurriculum /> },
        { path: "assign-batches", element: <AssignBatches /> },
      ],
    },
    {
      path: "/",
      element: <StudentPage />, // Default route for students
      children: [
        { index: true, element: <Home /> },
        { path: "my-performance", element: <MyPerformance /> },
        { path: "week-calender", element: <WeekCalendar /> },
      ],
    },
    { path: "/unauthorized", element: <Unauthorized /> },
    { path: "*", element: <NotFound /> },
  ]);

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <FeatureFlagProvider userName={userName} allowUsers={[]}>
        <CourseCurriculumFlagProvider>
          <CssBaseline />
          <MenuContextProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <RouterProvider router={router} />
            </Suspense>
          </MenuContextProvider>
        </CourseCurriculumFlagProvider>
      </FeatureFlagProvider>
    </ThemeProvider>
  );
}

/**
 * Maps Redux state to component props.
 *
 * @param {object} state - The Redux state.
 * @returns {object} Props with the current userName.
 */
const mapState = (state) => ({
  userName: state.user.userName,
});

const App = connect(mapState, null)(AppComponent);

export default App;
