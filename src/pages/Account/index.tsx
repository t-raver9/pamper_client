import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Role, isBusinessRole, useAuth } from "../../contexts/authContext";
import { Button } from "@mui/material";
import SignUp from "./Signup";
import Login from "./Login";
import { useBusinessView } from "../../contexts/viewContext";
import { PricingPlans } from "../BusinessInfo";

const Account = () => {
  const { isBusinessView } = useBusinessView();
  const { user, login, logout } = useAuth();

  console.log(user);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [isSigningUp, setIsSigningUp] = useState(
    queryParams.get("signingUp") === "true" || false
  );

  const [role, setRole] = useState(queryParams.get("role"));
  console.log(queryParams.get("role"));
  console.log(role);

  // re-render component when query params change
  useEffect(() => {
    setIsSigningUp(queryParams.get("signingUp") === "true" || false);
    setRole(queryParams.get("role"));
  }, [search]);

  const handleSuccessfulAuth = (data: any) => {
    login(data);
  };

  const handleLogout = () => {
    logout();
  };

  if (!isSigningUp && role) {
    setRole(null);
  }

  if (user) {
    return (
      <div>
        <h2>Welcome to your account page!</h2>
        {/* Print user details below */}
        <p>Your name is: {`${user.firstName} ${user.lastName}`}</p>
        <p>Your role is: {user.role}</p>
        <p>Your email is: {user.email}</p>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    );
  }

  // If signing in, can show signin regardless of role
  if (!isSigningUp) {
    return (
      <div>
        <Login onSuccessfulLogin={handleSuccessfulAuth} />
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Button onClick={() => setIsSigningUp(!isSigningUp)}>
            {isSigningUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
        </div>
      </div>
    );
  }

  // If havent selected role yet, show role selection
  if (!role && isBusinessView) {
    return (
      <div>
        <PricingPlans />
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Button onClick={() => setIsSigningUp(!isSigningUp)}>
            Already have an account? Sign In
          </Button>
        </div>
      </div>
    );
  }

  // If signing up, need to know the role they're signing up for
  if (role && isSigningUp) {
    return (
      <div>
        <SignUp role={role as Role} onSuccessfulSignup={handleSuccessfulAuth} />
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Button onClick={() => setIsSigningUp(!isSigningUp)}>
            {isSigningUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
        </div>
      </div>
    );
  }
};

export default Account;
