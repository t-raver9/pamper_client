import React, { useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import GoogleLoginButton from "./GoogleButton";
import { Role } from "../../api/queries";

interface LoginBoxProps {
  onFormSubmit: (email: string, password: string) => void;
  buttonText: string;
}

const LoginBox: React.FC<LoginBoxProps> = ({ onFormSubmit, buttonText }) => {
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
          <GoogleLoginButton existingUser={true} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginBox;
