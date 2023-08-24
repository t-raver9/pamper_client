import React, { useEffect, useState } from "react";

import axios from "axios";
import Navbar from "./components/Navbar";
import { useAuth } from "./contexts/authContext";

function App() {
  const baseUrl = process.env.REACT_APP_SERVER_URL;

  // User from auth context
  const { user, login } = useAuth();

  useEffect(() => {
    handleAuthRedirect();
  }, []);

  const handleAuthRedirect = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const authResult = urlParams.get("auth");

    if (authResult == "success") {
      const user = await getCurrentUser();
      login(user);
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

  return (
    <div>
      <Navbar />
      User: {JSON.stringify(user)}
    </div>
  );
}

export default App;
