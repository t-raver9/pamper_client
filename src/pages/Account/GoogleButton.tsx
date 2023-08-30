import React, { useState } from "react";
import styled from "styled-components";
import { Role } from "../../contexts/authContext";

const GoogleButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.disabled ? "#b0b0b0" : "#4285f4")};
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
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.disabled ? "#b0b0b0" : "#357abd")};
  }
`;

const GoogleIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 8px;
`;

interface GoogleLoginButtonProps {
  existingUser: boolean;
  role?: Role;
  businessName?: string;
  disableButton?: boolean;
}

const GoogleLoginButton = ({
  role,
  existingUser,
  businessName,
  disableButton,
}: GoogleLoginButtonProps) => {
  const handleGoogleLogin = async () => {
    if (disableButton) return;

    if (!existingUser) {
      window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/google/signup?role=${role}&businessName=${businessName}`;
    }
    window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/google/login`;
  };

  return (
    <GoogleButton onClick={handleGoogleLogin} disabled={disableButton}>
      <GoogleIcon
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google Logo"
      />
      {existingUser ? "Log in with Google" : "Sign up with Google"}
    </GoogleButton>
  );
};

export default GoogleLoginButton;
