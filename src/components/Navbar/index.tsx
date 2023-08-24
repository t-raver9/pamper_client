import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Pamper
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

export default Navbar;
