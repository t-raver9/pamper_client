import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/authContext";
import axios from "axios";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import LoginBox from "./LoginBox";
import SignupBox from "./SignupBox";

export type Role =
  | "PROVIDER_ADMIN"
  | "VENUE_ADMIN"
  | "SOLE_TRADER"
  | "STAFF"
  | "CUSTOMER";

const Account = () => {
  const { user, login, logout } = useAuth();
  const { role: maybeRole } = useParams<{ role?: Role }>();
  const role: Role = maybeRole || "CUSTOMER";

  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        { email, password, role },
        { withCredentials: true }
      );
      console.log("RESPONSE: ", response);
      login(response.data);
    } catch (error) {
      console.error("Error logging in user: ", error);
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/signup`,
        { email, password, role },
        { withCredentials: true }
      );
      login(response.data);
    } catch (error) {
      console.error("Error logging in user: ", error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (user) {
    return (
      <div>
        <Navbar />
        <h2>Welcome to your account page!</h2>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {isSigningUp ? (
        <SignupBox
          role={role}
          onFormSubmit={handleSignup}
          buttonText="Sign Up"
        />
      ) : (
        <LoginBox role={role} onFormSubmit={handleLogin} buttonText="Sign In" />
      )}
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <Button onClick={() => setIsSigningUp(!isSigningUp)}>
          {isSigningUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Button>
      </div>
    </div>
  );
};

export default Account;
