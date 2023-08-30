import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const BusinessNavbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "black" }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Pamper (Business View)
          </Link>
        </Typography>
        <Button color="inherit" component={Link} to="/account/CUSTOMER">
          My Account
        </Button>
        <Button color="inherit" component={Link} to="/business">
          For Business
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default BusinessNavbar;
