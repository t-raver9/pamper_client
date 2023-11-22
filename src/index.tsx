import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Account from "./pages/Account";
import { AuthProvider } from "./contexts/authContext";
import { BusinessViewProvider } from "./contexts/viewContext";
import Layout from "./components/Layout";
import { PricingPlans } from "./pages/BusinessInfo";
import Solutions from "./pages/BusinessInfo/Solutions";
import Features from "./pages/BusinessInfo/Features";
import WhyPamper from "./pages/BusinessInfo/WhyPamper";
import Appointments from "./pages/Business/Appointments";
import ServicesOffered from "./pages/Business/ServicesOffered";
import BusinessHours from "./pages/Business/BusinessHours";
import GlobalStyles from "./GlobalStyles";
import Services from "./pages/Services/";
import Venues from "./pages/Venues";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
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
  {
    path: "/appointments",
    element: (
      <Layout>
        <Appointments />
      </Layout>
    ),
  },
  {
    path: "/services",
    element: (
      <Layout>
        <Services />
      </Layout>
    ),
  },
  {
    path: "/services-offered",
    element: (
      <Layout>
        <ServicesOffered />
      </Layout>
    ),
  },
  {
    path: "/hours",
    element: (
      <Layout>
        <BusinessHours />
      </Layout>
    ),
  },
  {
    path: "/venues",
    element: (
      <Layout>
        <Venues />
      </Layout>
    ),
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <BusinessViewProvider>
          <RouterProvider router={router} />
        </BusinessViewProvider>
      </AuthProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
