import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Account from "./pages/Account";
import Business from "./pages/Business";
import { AuthProvider } from "./contexts/authContext";
import { BusinessViewProvider } from "./contexts/viewContext";
import Layout from "./components/Layout";
import { PricingPlans } from "./pages/BusinessInfo";
import Solutions from "./pages/BusinessInfo/Solutions";
import Features from "./pages/BusinessInfo/Features";
import WhyPamper from "./pages/BusinessInfo/WhyPamper";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },
  {
    path: "/account/",
    element: (
      <Layout>
        <Account />
      </Layout>
    ),
  },
  {
    path: "/account/:role",
    element: (
      <Layout>
        <Account />
      </Layout>
    ),
  },
  {
    path: "/pricing-plans",
    element: (
      <Layout>
        <PricingPlans />
      </Layout>
    ),
  },
  {
    path: "/solutions",
    element: (
      <Layout>
        <Solutions />
      </Layout>
    ),
  },
  {
    path: "/features",
    element: (
      <Layout>
        <Features />
      </Layout>
    ),
  },
  {
    path: "/why-pamper",
    element: (
      <Layout>
        <WhyPamper />
      </Layout>
    ),
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BusinessViewProvider>
        <RouterProvider router={router} />
      </BusinessViewProvider>
    </AuthProvider>
  </React.StrictMode>
);
