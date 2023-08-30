import React, { useEffect, useState } from "react";

import axios from "axios";
import Navbar from "./components/Navbar";
import { isBusinessRole, useAuth } from "./contexts/authContext";
import { useBusinessView } from "./contexts/viewContext";

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
      const user = await getCurrentUser();
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

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/current/?role=CUSTOMER`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting auth test: ", error);
    }
  };

  return <div>User: {JSON.stringify(user)}</div>;
}

export default App;
