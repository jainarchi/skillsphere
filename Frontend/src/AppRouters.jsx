import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile";
import QuizPage from "./pages/Quiz/ShowQuiz";
import AnalyzeWrongAns from "./pages/Quiz/AnalyzeWrongAns";
import Notes from "./pages/Notes";
import Protected from "./protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <Protected />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/analyze/wrong-ans",
        element: <AnalyzeWrongAns />,
      },
      {
        path: "/notes",
        element: <Notes />,
      },
      {
        path: "/quiz/:tech/:level",
        element: <QuizPage />,
      },
    ],
  },
]);
