import React, { useEffect, useState } from "react";

import axios from "axios";
import { isBusinessRole, useAuth } from "./contexts/authContext";
import { useBusinessView } from "./contexts/viewContext";
import { getCurrentUser } from "./api/queries";

function App() {
  const baseUrl = process.env.REACT_APP_SERVER_URL;

  // User from auth context
  const { user, login } = useAuth();
  const { setBusinessView } = useBusinessView();

  useEffect(() => {
    handleAuthRedirect();
  }, []);

  const handleAuthRedirect = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const authResult = urlParams.get("auth");

    if (authResult == "success") {
      console.log("Login successful.");
      const { user, venue } = await getCurrentUser();

      login(user);
      if (isBusinessRole(user.role)) {
        setBusinessView(true);
      } else {
        setBusinessView(false);
      }
    } else if (authResult === "failed") {
      console.log("Login failed.");
    }
  };

  return <div>User: {JSON.stringify(user)}</div>;
}

export default App;
