import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const BusinessNavbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#c398b9" }}>
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <Button color="inherit" component={Link} to="/appointments">
            Appointments
          </Button>
          <Button color="inherit" component={Link} to="/services-offered">
            Services Offered
          </Button>
          <Button color="inherit" component={Link} to="/hours">
            Business Hours
          </Button>
        </Box>

        <Button color="inherit" component={Link} to="/account">
          My Account
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default BusinessNavbar;
