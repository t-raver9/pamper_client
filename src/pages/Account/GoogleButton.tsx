import React from "react";
import styled from "styled-components";
import { Role } from ".";
import axios from "axios";

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #4285f4;
  color: white;
  width: 240px;
  height: 50px;
  border-radius: 5px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
  border: none;
  font-size: 16px;
  font-weight: bold;
  padding: 0 15px;
  transition: background-color 0.218s, border-color 0.218s, box-shadow 0.218s;
  cursor: pointer;

  &:hover {
    background-color: #357abd;
  }
`;

const GoogleIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 8px;
`;

interface GoogleLoginButtonProps {
  role: Role;
}

const GoogleLoginButton = ({ role }: GoogleLoginButtonProps) => {
  const handleGoogleLogin = async () => {
    window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/google?role=${role}`;
  };

  return (
    <GoogleButton onClick={handleGoogleLogin}>
      <GoogleIcon
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google Logo"
      />
      Log in with Google
    </GoogleButton>
  );
};

export default GoogleLoginButton;
