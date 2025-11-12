// src/components/BottomNav.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import {
  Home as HomeIcon,
  Person as ProfileIcon,
  AddBox as AddIcon,
  People as PeopleIcon,
  Chat as ChatIcon,
} from "@mui/icons-material";

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Map path to index
  const pathToIndex = {
    "/": 0,
    "/create-post": 1,
    // "/chat": 2,
    "/follow": 2,
    "/profile": 3,
  };

  const currentIndex = pathToIndex[location.pathname] ?? -1;

  const handleChange = (event, newValue) => {
    const paths = ["/", "/create-post", "/follow", "/profile"];
    navigate(paths[newValue]);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
      }}
    >
      <BottomNavigation
        showLabels
        value={currentIndex}
        onChange={handleChange}
        sx={{
          bgcolor: "background.default",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          height: 60,
          "& .MuiBottomNavigationAction-root": {
            pt: 1,
            fontSize: "10px",
          },
          "& .MuiBottomNavigationAction-label": {
            fontSize: "10px",
            mt: 0.5,
          },
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Create" icon={<AddIcon />} />
        {/* <BottomNavigationAction label="Messages" icon={<ChatIcon />} /> */}
        <BottomNavigationAction label="Follow" icon={<PeopleIcon />} />
        <BottomNavigationAction label="Profile" icon={<ProfileIcon />} />
      </BottomNavigation>
    </Box>
  );
}
