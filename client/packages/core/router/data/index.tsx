import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  
import { LandingPage } from "@zocom/landing-page";
import { ConfirmationPage } from "@zocom/confirmation-page";
import { KitchenPage } from "@zocom/kitchen-page";


const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/kitchen',
    element: <KitchenPage />
  },
  {
    path: '/order/:orderNr',
    element: <ConfirmationPage />
  },
  {
    path: '*',
    element: <p>Page Not Found</p>,
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};