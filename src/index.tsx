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

{
  /* <Button color="inherit" component={Link} to="/solutions">
            Solutions
          </Button>
          <Button color="inherit" component={Link} to="/features">
            Features
          </Button>
          <Button color="inherit" component={Link} to="/why-pamper">
            Why Pamper
          </Button>
          <Button color="inherit" component={Link} to="/pricing-plans">
            Pricing Plans
          </Button> */
}

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
  // {
  //   path: "/solutions",
  //   element: <Solutions />,
  // },
  // {
  //   path: "/features",
  //   element: <Features />,
  // },
  // {
  //   path: "/why-pamper",
  //   element: <WhyPamper />,
  // },
  // {
  //   path: "/pricing-plans",
  //   element: <PricingPlans />,
  // },
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
