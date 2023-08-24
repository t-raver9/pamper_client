import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Account from "./pages/Account";
import Business from "./pages/Business";
import { AuthProvider } from "./contexts/authContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/account/",
    element: <Account />,
  },
  {
    path: "/account/:role",
    element: <Account />,
  },
  {
    path: "/business",
    element: <Business />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
