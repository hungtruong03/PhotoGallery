import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Gallery from "./Gallery";
import Detail from "./Detail";

const Router: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: '/', 
          element: <Gallery />,
        },
        {
          path: '/detail',
          element: <Detail />,
        },
        {
          path: '*',
          element: <Gallery />,
        }
      ],
    },
  ]);
  
  return <RouterProvider router={router} />;
};

export default Router;