import React, { useContext } from "react";
import { Button, Box } from "@mui/material";
import { AppContext } from "../context/state";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const { loggedIn, setLoggedIn } = useContext(AppContext);

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    setLoggedIn(true);
  };

  return (
    <div className="header">
      <Box sx={{ width: "100%", height: 36.5, display: "flex", alignItems: "center" }}>
        <Link style={{ color: `${location.pathname === "/" ? "#1976d2" : "#808080"}`, textDecoration: "none" }} to="/">
          Home
        </Link>
        {loggedIn && (
          <Link
            style={{
              color: `${location.pathname === "/favorites" ? "#1976d2" : "#808080"}`,
              marginLeft: "1rem",
              textDecoration: "none",
            }}
            to="/favorites"
          >
            Favorites
          </Link>
        )}
      </Box>
      {!loggedIn && (
        <Button variant="contained" sx={{ minWidth: "100px" }} onClick={() => handleLogin()}>
          Log in
        </Button>
      )}
    </div>
  );
};

export default Header;
