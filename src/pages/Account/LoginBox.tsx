import React, { useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Role } from ".";
import { GoogleLogin } from "@react-oauth/google";
import GoogleLoginButton from "./GoogleButton";

interface LoginBoxProps {
  onFormSubmit: (email: string, password: string) => void;
  buttonText: string;
  role: Role;
}

const LoginBox: React.FC<LoginBoxProps> = ({
  onFormSubmit,
  buttonText,
  role,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onFormSubmit(email, password);
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          <GoogleLoginButton role={role} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginBox;
