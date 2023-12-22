import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  
import { LandingPage } from "@zocom/landing-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/kitchen",
    // element: <KitchenPage />
  },
  {
    path: "*",
    element: <p>Page Not Found</p>,
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};