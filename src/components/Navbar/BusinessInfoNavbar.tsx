import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useBusinessView } from "../../contexts/viewContext";

const BusinessInfoNavbar = () => {
  const { setBusinessView } = useBusinessView();

  return (
    <AppBar position="static" style={{ background: "purple" }}>
      <Toolbar>
        <Typography variant="h6">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Pamper for Business
          </Link>
        </Typography>

        <Box display="flex" flexGrow={1}>
          <Button color="inherit" component={Link} to="/solutions">
            Solutions
          </Button>
          <Button color="inherit" component={Link} to="/features">
            Features
          </Button>
          <Button color="inherit" component={Link} to="/why-pamper">
            Why Pamper
          </Button>
          <Button color="inherit" component={Link} to="/pricing-plans">
            Pricing Plans
          </Button>
        </Box>

        <Button color="inherit" component={Link} to="/account">
          My Account
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/"
          onClick={() => setBusinessView(false)}
        >
          For Customers
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default BusinessInfoNavbar;
