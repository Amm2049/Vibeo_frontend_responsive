// src/pages/Post.jsx
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Divider,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import {
  FavoriteBorder as LikeIcon,
  Favorite as LikedIcon,
  ChatBubbleOutline as CommentIcon,
  Share as ShareIcon,
  ArrowBack as BackIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { apiUrl } from "../useApp";
import { useEffect } from "react";

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // ✅ default
  const [comments, setComments] = useState([]); // ✅ default
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    const newCommentText = newComment.trim();

    // Optimistic UI update
    const tempComment = {
      id: `temp-${Date.now()}`, // temporary ID
      user: "you", // or use actual username from auth context
      text: newCommentText,
      timestamp: "now",
    };

    try {
      const res = await fetch(`${apiUrl}/comment/posts/${id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ text: newCommentText }),
      });

      if (res.ok) {
        setComments((prev) => [...prev, tempComment]);
        setNewComment("");
      } else {
        // Remove temp comment on failure
        setComments((prev) => prev.filter((cmt) => cmt.id !== tempComment.id));
        alert("Failed to post comment");
      }
    } catch (err) {
      setComments((prev) => prev.filter((cmt) => cmt.id !== tempComment.id));
      alert("Network error");
    }
  };

  // Fetching a Post
  useEffect(() => {
    fetch(`${apiUrl}/content/posts/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLikeCount(data.likes || 0); // ✅ update after fetch
        setComments(data.comments || []); // ✅
        setLiked(false); // or check if user already liked (if backend supports)
      });
  }, [id]);

  if (!post)
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 6,
          color: "text.secondary",
        }}
      >
        <Typography variant="body1">Loading</Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        py: 3,
        px: 2,
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <BackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight="bold">
          Post
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 3 }} />

      {/* Post Content */}
      <Box sx={{ mb: 3 }}>
        {/* User Info */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            src={post.user.avatar}
            alt={post.user.name}
            sx={{ width: 40, height: 40 }}
          />
          <Box sx={{ ml: 1.5 }}>
            <Typography
              style={{
                textDecoration: "none",
                color: theme.palette.text.primary,
                fontWeight: 600,
              }}
            >
              {post.user.name}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block" }}
            >
              {post.timestamp}
            </Typography>
          </Box>
        </Box>

        {/* Image */}
        <Box
          component="img"
          src={post.image}
          alt="Post"
          sx={{
            width: "100%",
            maxHeight: 700,
            objectFit: "cover",
            borderRadius: 1,
            mb: 2,
          }}
        />

        {/* Caption */}
        <Typography variant="body1" sx={{ mb: 1, wordBreak: "break-word" }}>
          <strong>{post.user.username}</strong> {post.caption}
        </Typography>

        {/* Likes  Comments */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {likeCount} likes
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {comments.length} comments
          </Typography>
        </Box>

        {/* Action Buttons */}
        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <IconButton onClick={handleLike} color={liked ? "error" : "default"}>
            {liked ? <LikedIcon /> : <LikeIcon />}
          </IconButton>
          <IconButton>
            <CommentIcon />
          </IconButton>
          <IconButton sx={{ ml: "auto" }}>
            <ShareIcon />
          </IconButton>
        </Box> */}
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 2 }} />

      {/* Comments */}
      <Box sx={{ mb: 3 }}>
        {comments.length > 0 ? (
          comments.map((cmt) => (
            <Box key={cmt.id} sx={{ mb: 3, mt: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                <Typography variant="body2" fontWeight="bold">
                  {cmt.user}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  {cmt.timestamp}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ ml: 0.5 }}
              >
                {cmt.text}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", py: 2 }}
          >
            No comments yet. Be the first!
          </Typography>
        )}
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 2 }} />

      {/* Add Comment */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          InputProps={{
            sx: {
              color: "text.primary",
              "&::before": { borderBottom: "1px solid rgba(255,255,255,0.2)" },
              "&:hover::before": {
                borderBottom: "1px solid rgba(255,255,255,0.4)",
              },
            },
          }}
        />
        <IconButton
          onClick={handleAddComment}
          disabled={!newComment.trim()}
          sx={{
            color: newComment.trim() ? "primary.main" : "text.disabled",
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
