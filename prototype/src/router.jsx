import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./assets/layouts/MainLayout.jsx";
import HomePage from "./assets/pages/home/HomePage.jsx";
import MyProfilePage from "./assets/pages/my-profile/MyProfile.jsx";
import CoursesPage from "./assets/pages/courses/CoursesPage.jsx";
import CourseDetailPage from "./assets/pages/courses/CourseDetailPage.jsx";
import LessonPage from "./assets/pages/lessons/LessonPage.jsx";
import QuizPage from "./assets/pages/quizzes/QuizPage.jsx";
import InvitesPage from "./assets/pages/invites/InvitesPage.jsx";
import NotificationsPage from "./assets/pages/notifications/NotificationsPage.jsx";
import CertificatesPage from "./assets/pages/certificates/CertificatesPage.jsx";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <h1>Admin Dashboard</h1>,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "courses", element: <CoursesPage /> },
      { path: "courses/:courseId", element: <CourseDetailPage /> },
      { path: "lessons/:lessonId", element: <LessonPage /> },
      { path: "quizzes/:quizId", element: <QuizPage /> },
      { path: "invites", element: <InvitesPage /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "certificates", element: <CertificatesPage /> },
      { path: "my-profile", element: <MyProfilePage /> },
      { path: "my-profile/edit", element: <MyProfilePage isEdit={true} /> },
    ],
  },
]);

export default router;
