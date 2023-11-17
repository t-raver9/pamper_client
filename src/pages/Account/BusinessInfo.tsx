import React from "react";
import { TextField, Button } from "@mui/material";
import styled from "styled-components";
import { useAuth } from "../../contexts/authContext";

const Container = styled.div`
  margin-bottom: 20px;
`;

const BusinessInfo = () => {
  const { venue } = useAuth();

  return (
    <Container>
      <h2>Business Information</h2>
      <p>
        <b>Business Name: </b>
        {venue?.businessName}
      </p>
    </Container>
  );
};

export default BusinessInfo;
