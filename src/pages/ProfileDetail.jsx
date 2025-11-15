// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  ArrowBack as BackIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { apiUrl, useApp } from "../useApp";
import ProfileSkeleton from "../components/ProfileSkeleton";

const ProfileDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch(`${apiUrl}/users/profile/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        setUser(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        setIsError(true);
      });
  }, [id]);

  if (!user) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 6,
          color: "text.secondary",
        }}
      >
        <Typography variant="body1">Error fetching user's profile.</Typography>
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
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <BackIcon sx={{ color: "white" }} />
        </IconButton>
        <Typography variant="h6" fontWeight="bold" sx={{ color: "white" }}>
          {user.fullName}'s Profile
        </Typography>
      </Box>
      {/* Cover Photo */}
      <Box
        sx={{
          height: 180,
          borderRadius: 2,
          overflow: "hidden",
          mb: -7,
          position: "relative",
          backgroundImage: `url(${user.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.6)",
        }}
      ></Box>
      <Box sx={{ textAlign: "center", mb: 4, px: 2, pt: 4 }}>
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
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ whiteSpace: "pre-line", mb: 2 }}
        >
          {user.bio}
        </Typography>

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
      </Box>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 3 }} />
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Posts
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
        }}
      >
        {user.contentsInfo.map((content, index) => (
          <Link
            key={index}
            to={`/post/${content.id}`}
            style={{ display: "block" }}
          >
            <Box
              component="img"
              src={content.photo_url}
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
};

export default ProfileDetail;
