import React from "react";
import styled from "styled-components";

const LogoContainer = styled.img`
  width: 100px;
  margin: 20px;
`;

const Logo = () => {
  return <LogoContainer src="/assets/logo.png" alt="logo" />;
};

export default Logo;
