// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Divider,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { apiUrl, useApp } from "../useApp";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { setCurrentUser, setIsAuthenticated } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [newFullName, setNewFullName] = useState("");
  const [newBio, setNewBio] = useState("");
  const [profileUrl, setProfileUrl] = useState(null);
  const [coverUrl, setCoverUrl] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("fullName", newFullName);
    formData.append("bio", newBio);
    if (avatarFile) {
      formData.append("updated_pic", avatarFile);
    }
    if (coverFile) {
      formData.append("updated_cover", coverFile);
    }

    try {
      const res = await fetch(`${apiUrl}/users/profile/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: formData,
      });

      if (res.ok) {
        const updatedUser = await res.json();

        setUser({
          ...user,
          fullName: updatedUser.name,
          bio: updatedUser.bio,
          avatar: updatedUser.profile_url,
          cover: updatedUser.cover_url,
        });
        setIsEditing(false);
        setProfileUrl(null);
        setCoverUrl(null);
        setAvatarFile(null);
        setCoverFile(null);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setNewFullName(user.fullName);
    setNewBio(user.bio);
    setProfileUrl(user.avatar);
    setCoverUrl(user.cover);
    setIsEditing(false);
    setAvatarFile(null);
    setCoverFile(null);
  };

  // Fetch Profile
  useEffect(() => {
    fetch(`${apiUrl}/users/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        setUser(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Initialize edit fields
  useEffect(() => {
    if (user) {
      setNewFullName(user.fullName);
      setNewBio(user.bio);
      setProfileUrl(user.avatar);
      setCoverUrl(user.cover);
    }
  }, [user]);

  if (!user) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        py: 3,
        px: 2,
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* Cover Photo */}
      <Box
        sx={{
          height: 180,
          borderRadius: 2,
          overflow: "hidden",
          mb: -7,
          position: "relative",
          backgroundImage: `url(${isEditing ? coverUrl : user.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.6)",
        }}
      >
        {isEditing && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(0,0,0,0.5)",
              cursor: "pointer",
            }}
            onClick={() => document.getElementById("cover-upload").click()}
          >
            <Typography color="white" sx={{ textAlign: "center" }}>
              Click to change cover
            </Typography>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="cover-upload"
              type="file"
              onChange={(e) => {
                if (e.target.files[0]) {
                  const url = URL.createObjectURL(e.target.files[0]);
                  setCoverUrl(url);
                  setCoverFile(e.target.files[0]);
                }
              }}
            />
          </Box>
        )}
      </Box>

      <Box sx={{ textAlign: "center", mb: 4, px: 2, pt: 4 }}>
        {isEditing ? (
          <Box sx={{ mb: 2, textAlign: "center" }}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="avatar-upload"
              type="file"
              onChange={(e) => {
                if (e.target.files[0]) {
                  const url = URL.createObjectURL(e.target.files[0]);
                  setProfileUrl(url);
                  setAvatarFile(e.target.files[0]);
                }
              }}
            />
            <label htmlFor="avatar-upload">
              <Avatar
                src={profileUrl}
                alt="Preview"
                sx={{
                  width: 120,
                  height: 120,
                  border: "2px dashed rgba(255,255,255,0.5)",
                  mx: "auto",
                  cursor: "pointer",
                  transition: "border 0.2s",
                  "&:hover": { borderColor: "primary.main" },
                }}
              />
            </label>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: "block" }}
            >
              Click avatar to change
            </Typography>
          </Box>
        ) : (
          <Avatar
            src={user?.avatar}
            sx={{
              width: 120,
              height: 120,
              border: "4px solid rgba(30,30,30,0.8)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              mb: 2,
              mx: "auto",
            }}
          />
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            mb: 1,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            {user.fullName}
          </Typography>
          {!isEditing ? (
            <IconButton
              size="small"
              onClick={() => setIsEditing(true)}
              sx={{ color: "text.secondary" }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton size="small" onClick={handleSave} color="success">
                {loading ? (
                  <CircularProgress size={20} sx={{ color: "white" }} />
                ) : (
                  <SaveIcon fontSize="small" />
                )}
              </IconButton>
              <IconButton size="small" onClick={handleCancel} color="error">
                <CancelIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>

        {isEditing ? (
          <Box
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: 400,
              mx: "auto",
            }}
          >
            <TextField
              fullWidth
              size="small"
              label="Full Name"
              value={newFullName}
              onChange={(e) => setNewFullName(e.target.value)}
              InputProps={{
                sx: {
                  color: "text.primary",
                  borderColor: "rgba(255,255,255,0.3)",
                },
              }}
              InputLabelProps={{ sx: { color: "text.secondary" } }}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              size="small"
              label="Bio"
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
              InputProps={{
                sx: {
                  color: "text.primary",
                  borderColor: "rgba(255,255,255,0.3)",
                },
              }}
              InputLabelProps={{ sx: { color: "text.secondary" } }}
            />
          </Box>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line", mb: 2 }}
          >
            {user.bio}
          </Typography>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mb: 3 }}>
          <Box textAlign="center">
            <Typography variant="body1" fontWeight="bold">
              {user.stats.contents}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Posts
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body1" fontWeight="bold">
              {user.stats.followers}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Followers
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body1" fontWeight="bold">
              {user.stats.following}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Following
            </Typography>
          </Box>
        </Box>

        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate("/create-post")}
          sx={{
            borderColor: "rgba(255,255,255,0.2)",
            color: "text.primary",
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "rgba(100, 100, 255, 0.1)",
            },
          }}
        >
          New Post
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            localStorage.clear();
            setIsAuthenticated(null);
            navigate("/signin");
            setCurrentUser(null);
          }}
          sx={{
            borderColor: "rgba(255,255,255,0.2)",
            color: "text.primary",
            "&:hover": {
              borderColor: "red",
              backgroundColor: "red",
            },
            ml: 1,
          }}
        >
          Logout
        </Button>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 3 }} />

      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Images
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
        }}
      >
        {user.stats.images.map((image, index) => (
          <Link key={index} style={{ display: "block" }}>
            <Box
              component="img"
              src={image}
              alt="Post"
              sx={{
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: 1,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            />
          </Link>
        ))}
      </Box>
    </Box>
  );
}
