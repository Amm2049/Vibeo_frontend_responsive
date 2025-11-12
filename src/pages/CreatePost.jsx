// src/pages/CreatePost.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  IconButton,
  CircularProgress,
  //   useTheme,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  AddPhotoAlternate as ImageIcon,
  Tag as TagIcon,
  Public as PublicIcon,
} from "@mui/icons-material";
import { apiUrl } from "../useApp";

export default function CreatePost() {
  //   const theme = useTheme();
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("caption", caption);

    if (image) {
      formData.append("cover", image); // file field
    }

    setIsLoading(true);
    const res = await fetch(`${apiUrl}/content/posts/create`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: "POST",
      body: formData, // do NOT set Content-Type — browser will add the boundary
    });

    if (res.ok) {
      const data = await res.json();
      navigate("/");
      setIsLoading(false);
    }
  };

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
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <BackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight="bold">
          Create New Post
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 3 }} />

      {/* Image Upload */}
      {!imagePreview ? (
        <Box
          sx={{
            height: 300,
            border: "2px dashed rgba(255,255,255,0.2)",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            cursor: "pointer",
            transition: "border 0.2s",
            "&:hover": { borderColor: "primary.main" },
          }}
          onClick={() => document.getElementById("image-upload").click()}
        >
          <ImageIcon sx={{ fontSize: 40, color: "text.secondary", mb: 1 }} />
          <Typography color="text.secondary">Click to upload photo</Typography>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="image-upload"
            type="file"
            onChange={handleImageChange}
          />
        </Box>
      ) : (
        <Box sx={{ mb: 3, position: "relative" }}>
          <Box
            component="img"
            src={imagePreview}
            alt="Preview"
            sx={{
              width: "100%",
              maxHeight: 300,
              objectFit: "cover",
              borderRadius: 1,
            }}
          />
          <Button
            size="small"
            onClick={() => {
              setImage(null);
              setImagePreview(null);
            }}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
            }}
          >
            Remove
          </Button>
        </Box>
      )}

      {/* Caption Input */}
      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        InputProps={{
          sx: {
            color: "text.primary",
            "&::before": { borderBottom: "1px solid rgba(255,255,255,0.2)" },
            "&:hover::before": {
              borderBottom: "1px solid rgba(255,255,255,0.4)",
            },
          },
        }}
        InputLabelProps={{ sx: { color: "text.secondary" } }}
      />

      {/* Post Options */}
      <Box sx={{ display: "flex", gap: 2, mt: 2, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          <TagIcon fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="body2">Add location</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
            ml: "auto",
          }}
        >
          <PublicIcon fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="body2">Public</Typography>
        </Box>
      </Box>

      {/* Submit Button */}
      <Button
        fullWidth
        variant="contained"
        disabled={!image}
        onClick={handleSubmit}
        sx={{
          py: 1.5,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: "bold",
          bgcolor: "primary.main",
          "&:disabled": {
            bgcolor: "rgba(100,100,255,0.3)",
            color: "rgba(255,255,255,0.5)",
          },
        }}
      >
        {isLoading ? (
          <CircularProgress size={24} sx={{ color: "white" }} />
        ) : (
          "Share Post"
        )}
      </Button>
    </Box>
  );
}
