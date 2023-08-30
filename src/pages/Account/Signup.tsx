import React from "react";
import { Role } from "../../contexts/authContext";
import axios from "axios";
import SignupBox from "./SignupBox";

interface SignUpProps {
  role: Role;
  onSuccessfulSignup: (data: any) => void;
}

const SignUp = ({ role, onSuccessfulSignup }: SignUpProps) => {
  const handleSignup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    businessName?: string
  ) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/signup`,
        { email, password, firstName, lastName, businessName, role },
        { withCredentials: true }
      );
      onSuccessfulSignup(response.data);
    } catch (error) {
      console.error("Error signing up user: ", error);
    }
  };

  const headerText = `Sign Up (as ${role})`;

  return (
    <SignupBox
      role={role}
      onFormSubmit={handleSignup}
      buttonText={headerText}
    />
  );
};

export default SignUp;
