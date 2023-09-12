import React from "react";
import { Role } from "../../api/queries";
import axios from "axios";
import LoginBox from "./LoginBox";

interface LoginProps {
  onSuccessfulLogin: (data: any) => void;
}

const Login = ({ onSuccessfulLogin }: LoginProps) => {
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      onSuccessfulLogin(response.data);
    } catch (error) {
      console.error("Error logging in user: ", error);
    }
  };

  return <LoginBox onFormSubmit={handleLogin} buttonText="Sign In" />;
};

export default Login;
