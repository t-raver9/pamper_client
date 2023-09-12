import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import styled from "styled-components";
import { useAuth } from "../../contexts/authContext";

const Container = styled.div`
  margin-bottom: 20px;
`;

const PersonalInfo = () => {
  const { user, getFormattedRole } = useAuth();
  const { venue } = useAuth();

  return (
    user && (
      <Container>
        <h2>Personal Information</h2>
        <p>
          <b>Name: </b>
          {`${user.firstName} ${user.lastName}`}
        </p>
        <p>
          <b>Email: </b>
          {user.email}
        </p>
        <p>
          <b>Role: </b>
          {getFormattedRole()}
        </p>
        {venue && (
          <p>
            <b>Venue: </b>
            {venue.businessName}
          </p>
        )}
      </Container>
    )
  );
};

export default PersonalInfo;
