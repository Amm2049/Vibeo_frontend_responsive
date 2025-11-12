// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Divider,
  IconButton,
  CircularProgress,
  // useTheme,
} from "@mui/material";
import {
  AccountCircle as AccountIcon,
  PhotoCamera as CameraIcon,
} from "@mui/icons-material";

export default function Signup() {
  const navigate = useNavigate();
  // const theme = useTheme();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const api = import.meta.env.VITE_API;
      const formData = new FormData();
      formData.append("username", username);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("bio", bio);
      if (profileImage) {
        formData.append("profile_picture", profileImage); // file field
      }

      const res = await fetch(`${api}/users/signup`, {
        method: "POST",
        body: formData, // do NOT set Content-Type — browser will add the boundary
      });

      const data = await res.json();
      if (data.token) {
        // localStorage.setItem("jwt", data.token);
        setIsLoading(false);
        navigate("/signin");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 480,
          p: 4,
          borderRadius: 3,
          bgcolor: "rgba(20, 20, 20, 0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box sx={{ position: "relative", mb: 2 }}>
            <Avatar
              src={imagePreview || ""}
              sx={{
                width: 80,
                height: 80,
                background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                border: "2px solid rgba(255,255,255,0.2)",
              }}
            >
              {!imagePreview && <AccountIcon sx={{ fontSize: 40 }} />}
            </Avatar>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="profile-image-upload"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="profile-image-upload">
              <IconButton
                component="span"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "primary.main",
                  width: 28,
                  height: 28,
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                <CameraIcon sx={{ fontSize: 16, color: "white" }} />
              </IconButton>
            </label>
          </Box>
          <Typography variant="h5" fontWeight="bold" sx={{ color: "white" }}>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Join the community
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
            required
            InputLabelProps={{ sx: { color: "text.secondary" } }}
            InputProps={{
              sx: {
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.2)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
            required
            InputLabelProps={{ sx: { color: "text.secondary" } }}
            InputProps={{
              sx: {
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.2)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            required
            InputLabelProps={{ sx: { color: "text.secondary" } }}
            InputProps={{
              sx: {
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.2)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            required
            InputLabelProps={{ sx: { color: "text.secondary" } }}
            InputProps={{
              sx: {
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.2)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Bio (Optional)"
            multiline
            rows={2}
            variant="outlined"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            sx={{ mb: 3 }}
            InputLabelProps={{ sx: { color: "text.secondary" } }}
            InputProps={{
              sx: {
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.2)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "1rem",
              background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
              "&:hover": {
                opacity: 0.9,
                transform: "scale(1.02)",
              },
              transition: "all 0.2s ease",
            }}
          >
            {isLoading ? <CircularProgress /> : "Sign In"}
          </Button>
        </form>

        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <Typography
              component="span"
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => navigate("/signin")}
            >
              Sign in
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
