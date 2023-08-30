import React from "react";
import { useBusinessView } from "../../contexts/viewContext";
import { isBusinessRole, useAuth } from "../../contexts/authContext";

import DefaultNavbar from "./DefaultNavbar";
import BusinessNavbar from "./BusinessNavbar";
import BusinessInfoNavbar from "./BusinessInfoNavbar";

const Navbar = () => {
  const { isBusinessView } = useBusinessView();
  const { user } = useAuth();

  if (user?.role && isBusinessRole(user.role)) {
    return <BusinessNavbar />;
  }

  if (isBusinessView) {
    return <BusinessInfoNavbar />;
  }

  return <DefaultNavbar />;
};

export default Navbar;
