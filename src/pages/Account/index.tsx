import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Role, UserVenueDTO } from "../../api/queries";
import { useAuth } from "../../contexts/authContext";
import { Button } from "@mui/material";
import SignUp from "./Signup";
import Login from "./Login";
import { useBusinessView } from "../../contexts/viewContext";
import { PricingPlans } from "../BusinessInfo";
import BusinessInfo from "./BusinessInfo";
import PersonalInfo from "./PersonalInfo";

const Account = () => {
  const { isBusinessView } = useBusinessView();
  const { user, login, logout } = useAuth();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [isSigningUp, setIsSigningUp] = useState(
    queryParams.get("signingUp") === "true" || false
  );

  const [role, setRole] = useState(queryParams.get("role"));

  // re-render component when query params change
  useEffect(() => {
    setIsSigningUp(queryParams.get("signingUp") === "true" || false);
    setRole(queryParams.get("role"));
  }, [search]);

  const handleSuccessfulAuth = (data: UserVenueDTO) => {
    login(data.user, data.venue);
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
        <BusinessInfo />
        <PersonalInfo />
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

  // If signing up for a business, need to know the role they're signing up for
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

  // If signing up as a customer, no role required
  if (isSigningUp) {
    return (
      <div>
        <SignUp role={"CUSTOMER"} onSuccessfulSignup={handleSuccessfulAuth} />
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

  // Else, just return something, should never reach this state. Fix later.
  return <div>State error</div>;
};

export default Account;
