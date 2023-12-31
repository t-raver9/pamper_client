import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useBusinessView } from "../../contexts/viewContext";
import { useAuth } from "../../contexts/authContext";
import CategoryMenu from "./CategoryMenu";

const DefaultNavbar = () => {
  const { setBusinessView } = useBusinessView();
  const { logout } = useAuth();

  return (
    <AppBar position="static" style={{ backgroundColor: "#8FBC8B" }}>
      <Toolbar>
        <Button color="inherit" component={Link} to="/venues">
          All Venues
        </Button>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <CategoryMenu />
        </Typography>
        <Button color="inherit" component={Link} to="/account">
          My Account
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/"
          onClick={(_e) => {
            setBusinessView(true);
            logout();
          }}
        >
          For Business
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default DefaultNavbar;
