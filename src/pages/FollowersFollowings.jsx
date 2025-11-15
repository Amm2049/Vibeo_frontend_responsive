// src/pages/FollowersFollowing.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Avatar,
  Typography,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  PersonAdd as FollowIcon,
  Check as FollowingIcon,
} from "@mui/icons-material";
import { apiUrl } from "../useApp";
import FollowersFollowingSkeleton from "../components/FollowersFollowingSkeleton";

export default function FollowersFollowings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all relationship data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [followersRes, followingRes, allRes] = await Promise.all([
          fetch(`${apiUrl}/relationship/followers`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
          }),
          fetch(`${apiUrl}/relationship/followings`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
          }),
          fetch(`${apiUrl}/relationship/all`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
          }),
        ]);

        const followersData = await followersRes.json();
        const followingData = await followingRes.json();
        const allData = await allRes.json();

        setFollowers(Array.isArray(followersData) ? followersData : []);
        setFollowing(Array.isArray(followingData) ? followingData : []);
        setAllUsers(Array.isArray(allData) ? allData : []);
      } catch (err) {
        console.error("Failed to load followers/following/all", err);
        setFollowers([]);
        setFollowing([]);
        setAllUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ✅ Derive suggested users: all users NOT in following
  const suggestedUsers = allUsers.filter(
    (user) => !following.some((f) => f.id === user.id)
  );

  const handleFollow = async (user) => {
    try {
      const res = await fetch(`${apiUrl}/relationship/follow`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ follower: { id: user.id } }),
      });

      if (res.ok) {
        const updatedUser = { ...user, isFollowing: true };

        // Add to following if not already there
        if (!following.some((u) => u.id === user.id)) {
          setFollowing((prev) => [...prev, updatedUser]);
        }

        // Update followers if present
        if (followers.some((u) => u.id === user.id)) {
          setFollowers((prev) =>
            prev.map((u) => (u.id === user.id ? updatedUser : u))
          );
        }
        // ✅ No need to update allUsers or suggested — it's derived!
      }
    } catch (err) {
      console.error("Follow failed", err);
    }
  };

  const handleUnfollow = async (user) => {
    try {
      const res = await fetch(`${apiUrl}/relationship/unfollow`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ follower: { id: user.id } }),
      });

      if (res.ok) {
        const updatedUser = { ...user, isFollowing: false };

        // Remove from following
        setFollowing((prev) => prev.filter((u) => u.id !== user.id));

        // Update followers if present
        if (followers.some((u) => u.id === user.id)) {
          setFollowers((prev) =>
            prev.map((u) => (u.id === user.id ? updatedUser : u))
          );
        }
        // ✅ User will automatically reappear in suggestedUsers (no action needed)
      }
    } catch (err) {
      console.error("Unfollow failed", err);
    }
  };

  const renderUserList = (users, mode) => {
    if (users.length === 0) {
      return (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: "center", mt: 4 }}
        >
          {mode === "followers"
            ? "No followers yet"
            : mode === "following"
            ? "Not following anyone"
            : "No suggested users"}
        </Typography>
      );
    }

    return (
      <List sx={{ p: 0, mt: 1 }}>
        {users.map((user) => (
          <ListItem
            onClick={() => navigate(`/users/profile/${user.id}`)}
            key={user.id}
            sx={{
              px: 0,
              py: 1.5,
              mb: 1,
              borderRadius: 2,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.03)",
              },
              cursor: "pointer",
            }}
          >
            <ListItemAvatar>
              <Avatar
                src={user.avatar}
                alt={user.name}
                sx={{ width: 44, height: 44 }}
              />
            </ListItemAvatar>

            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ color: "white" }}
                  >
                    {user.name}
                  </Typography>
                </Box>
              }
              secondary={
                <Typography variant="body2" color="text.secondary">
                  @{user.username}
                </Typography>
              }
            />

            {mode === "suggested" ? (
              <Button
                variant="outlined"
                size="small"
                startIcon={<FollowIcon />}
                onClick={() => handleFollow(user)}
                sx={{
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "text.primary",
                  minWidth: 90,
                  "&:hover": {
                    borderColor: "primary.main",
                    bgcolor: "rgba(100, 100, 255, 0.1)",
                  },
                }}
              >
                Follow
              </Button>
            ) : (
              (mode === "following" || mode === "followers") && (
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={
                    user.isFollowing ? <FollowingIcon /> : <FollowIcon />
                  }
                  onClick={() => {
                    if (user.isFollowing) {
                      handleUnfollow(user);
                    } else {
                      handleFollow(user);
                    }
                  }}
                  sx={{
                    borderColor: user.isFollowing
                      ? "success.main"
                      : "rgba(255,255,255,0.2)",
                    color: user.isFollowing ? "success.main" : "text.primary",
                    minWidth: 90,
                    "&:hover": {
                      borderColor: user.isFollowing
                        ? "success.dark"
                        : "primary.main",
                      bgcolor: user.isFollowing
                        ? "rgba(76, 175, 80, 0.08)"
                        : "rgba(100, 100, 255, 0.1)",
                    },
                  }}
                >
                  {user.isFollowing ? "Following" : "Follow"}
                </Button>
              )
            )}
          </ListItem>
        ))}
      </List>
    );
  };

  if (loading) {
    return <FollowersFollowingSkeleton />;
  }

  return (
    <>
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          py: 2,
          bgcolor: "background.default",
          minHeight: "60vh",
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
            <BackIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography variant="h6" fontWeight="bold" sx={{ color: "white" }}>
            Followers & Following
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            mb: 2,
            "& .MuiTabs-indicator": { bgcolor: "primary.main" },
            "& .MuiTab-textColorPrimary": { color: "text.secondary" },
          }}
        >
          <Tab
            label={`Followers (${followers.length})`}
            sx={{ textTransform: "none", fontWeight: "bold" }}
          />
          <Tab
            label={`Following (${following.length})`}
            sx={{ textTransform: "none", fontWeight: "bold" }}
          />
          <Tab
            label={`Suggested (${suggestedUsers.length})`}
            sx={{ textTransform: "none", fontWeight: "bold" }}
          />
        </Tabs>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 2 }} />

        {/* Content per tab */}
        {activeTab === 0
          ? renderUserList(followers, "followers")
          : activeTab === 1
          ? renderUserList(following, "following")
          : renderUserList(suggestedUsers, "suggested")}
      </Box>
    </>
  );
}
