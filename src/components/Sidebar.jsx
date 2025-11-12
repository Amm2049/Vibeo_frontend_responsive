// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import {
  Home as HomeIcon,
  Person as ProfileIcon,
  Chat as ChatIcon,
  AddBox as AddIcon,
  Explore as ExploreIcon,
  Favorite as HeartIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import TagIcon from "@mui/icons-material/Tag";
import PeopleIcon from "@mui/icons-material/People";
import TextsmsIcon from "@mui/icons-material/Textsms";
import Logo from "../assets/6704508 Aung Myo Min.png"; // Adjust path based on your file structure
import LogoutIcon from "@mui/icons-material/Logout";
import { useApp } from "../useApp";

export default function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const { setIsAuthenticated, currentUser, setCurrentUser } = useApp();

  const navItems = [
    { id: 1, name: "Home", icon: <HomeIcon />, path: "/" },
    // { name: "Explore", icon: <ExploreIcon />, path: "/explore" },
    // { name: "Notifications", icon: <HeartIcon />, path: "/notifications" },
    // { name: "Messages", icon: <ChatIcon />, path: "/chat" },
    { id: 2, name: "Create", icon: <AddIcon />, path: "/create-post" },
    // { id: 3, name: "Message", icon: <TextsmsIcon />, path: "/chat" },
    { id: 4, name: "Follow", icon: <PeopleIcon />, path: "/follow" },
    { id: 5, name: "Profile", icon: <ProfileIcon />, path: "/profile" },
  ];

  return (
    <Box
      sx={{
        width: 80,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 2,
        pb: 3,
        borderRight: "1px solid rgba(255,255,255,0.08)",
        zIndex: 1200,
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
      }}
    >
      {/* Logo / Home */}
      <Link to="/" style={{ textDecoration: "none", marginBottom: "15px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={Logo}
            alt="Logo"
            sx={{
              width: 150, // or '10rem', '50%', etc.
              height: "auto", // keeps aspect ratio
            }}
          />
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", mt: -3 }}
          >
            Vibeo
          </Typography>
        </Box>
      </Link>

      <Divider
        sx={{ width: "60%", borderColor: "rgba(255,255,255,0.1)", mb: 2 }}
      />

      {/* Navigation Items */}
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem
            key={item.id}
            component={Link}
            to={item.path}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              borderRadius: "16px",
              mb: 1,
              color:
                location.pathname === item.path
                  ? "primary.main"
                  : "text.primary",
              bgcolor:
                location.pathname === item.path
                  ? "rgba(100, 100, 255, 0.1)"
                  : "transparent",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                color:
                  location.pathname === item.path
                    ? "primary.main"
                    : "text.primary",
                mb: 0.5,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.name}
              sx={{
                textAlign: "center",
                fontSize: "10px",
                "& .MuiListItemText-primary": {
                  fontSize: "10px",
                  whiteSpace: "nowrap",
                },
              }}
            />
          </ListItem>
        ))}
        {currentUser && (
          <ListItem
            onClick={() => {
              localStorage.clear();
              setIsAuthenticated(null);
              navigate("/signin");
              setCurrentUser(null);
            }}
            key="logout"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              borderRadius: "16px",
              mb: 1,
              color: "text.primary",
              bgcolor: "transparent",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "red",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                color: "text.primary",
                mb: 0.5,
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              sx={{
                textAlign: "center",
                fontSize: "10px",
                "& .MuiListItemText-primary": {
                  fontSize: "10px",
                  whiteSpace: "nowrap",
                },
              }}
            />
          </ListItem>
        )}
      </List>
    </Box>
  );
}
