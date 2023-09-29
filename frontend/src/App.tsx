import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authorization from "./pages/Authorization";
import Course from "./pages/Course";
import Lesson from "./pages/Lesson";
import StudentMain from "./pages/StudentMain";
import Test from "./pages/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authorization />,
  },
  {
    path: "/courses",
    element: <StudentMain />,
  },
  {
    path: "/courses/:id",
    element: <Course />,
  },
  {
    path: "/courses/:id/lesson/:lessonId",
    element: <Lesson />,
  },
  {
    path: "/courses/:id/:testId",
    element: <Test />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
