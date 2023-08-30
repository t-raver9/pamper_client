import React, { useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import GoogleLoginButton from "./GoogleButton";
import { Role, isBusinessRole } from "../../contexts/authContext";

interface SignupBoxProps {
  onFormSubmit: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    businessName?: string
  ) => void;
  buttonText: string;
  role: Role;
}

const SignupBox = ({ onFormSubmit, buttonText, role }: SignupBoxProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");

  const handleSubmit = () => {
    onFormSubmit(email, password, firstName, lastName, businessName);
  };

  return (
    <Grid container justifyContent="center" style={{ marginTop: "2rem" }}>
      <Grid item xs={12} md={6} lg={4}>
        <Paper style={{ padding: "2rem" }}>
          <Typography variant="h5" style={{ marginBottom: "1rem" }}>
            {buttonText}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isBusinessRole(role) && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="businessName"
              label="Business Name"
              name="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
            onClick={handleSubmit}
          >
            {buttonText}
          </Button>
          <GoogleLoginButton
            existingUser={false}
            disableButton={businessName.length == 0}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignupBox;
