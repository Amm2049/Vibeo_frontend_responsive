// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  useTheme,
  Divider,
} from "@mui/material";
import {
  FavoriteBorder as LikeIcon,
  Favorite as LikedIcon,
  ChatBubbleOutline as CommentIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import { apiUrl, useApp } from "../useApp";
import { formatDistanceToNow } from "date-fns";
import HomeSkeleton from "../components/HomeSkeleton";

export default function Home() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [likedPosts, setLikedPosts] = useState({}); // optimistic like state during requests
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, currentUser } = useApp();

  const handleLike = async (postId) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    const wasLiked =
      post.likesInfo?.some((like) => like.user_id === currentUser?.id) || false;
    const willBeLiked = !wasLiked;

    // Optimistically update likedPosts (for the icon)
    setLikedPosts((prev) => ({ ...prev, [postId]: willBeLiked }));

    // Optimistically update the post's likesInfo and likes count in posts state
    const updatedPost = {
      ...post,
      likes: willBeLiked ? (post.likes || 0) + 1 : (post.likes || 0) - 1,
      likesInfo: willBeLiked
        ? [...(post.likesInfo || []), { user_id: currentUser.id }]
        : (post.likesInfo || []).filter(
            (like) => like.user_id !== currentUser.id
          ),
    };

    setPosts((prev) => prev.map((p) => (p.id === postId ? updatedPost : p)));

    try {
      const res = await fetch(`${apiUrl}/reaction/toggle`, {
        method: wasLiked ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ content_id: postId, type: "love" }),
      });

      if (!res.ok) throw new Error("Failed to sync like");
      // Success: keep the optimistic update
    } catch (err) {
      console.error("Like toggle failed:", err);

      // ❌ Revert both likedPosts AND posts state on error
      setLikedPosts((prev) => ({ ...prev, [postId]: wasLiked }));

      const revertedPost = {
        ...post,
        likes: post.likes,
        likesInfo: post.likesInfo,
      };

      setPosts((prev) => prev.map((p) => (p.id === postId ? revertedPost : p)));
    }
  };

  // Fetching Posts
  const fetchPosts = async (pageNum) => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${apiUrl}/content/posts?page=${pageNum}&limit=10`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => {
          if (data.length === 0) {
            console.log("No new data received, reached the end.");
            return prev;
          }

          // Create a Set of existing post IDs for quick lookup
          const prevIds = new Set(prev.map((post) => post.id));

          // Filter out any new post that already exists in 'prev'
          const uniqueNewData = data.filter((post) => !prevIds.has(post.id));

          if (uniqueNewData.length === 0) {
            console.log("All new posts were duplicates.");
            return prev;
          }

          // Append only the unique new posts
          return [...prev, ...uniqueNewData];
        });

        // Update page number only if new unique data was found
        // Note: You might need to move the setPage logic inside the setPosts
        // callback or use an effect if you need perfect synchronization.
        setPage(pageNum);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchPosts(1);
  }, [isAuthenticated]);

  // Infinite scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      // Trigger load when user is 300px from bottom
      if (scrollHeight - scrollTop - clientHeight < 300) {
        fetchPosts(page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, page]);

  if (posts.length === 0 && !loading) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 6,
          color: "text.secondary",
        }}
      >
        <Typography variant="body1">
          Follow other users to see their posts.
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        py: 3,
        px: 2,
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      {posts.map((post) => {
        // Compute actual like state from server data
        const serverLiked =
          post.likesInfo?.some((like) => like.user_id === currentUser?.id) ||
          false;

        // Use optimistic state if available, otherwise use server state
        const isLiked =
          likedPosts[post.id] !== undefined ? likedPosts[post.id] : serverLiked;

        // Use server-provided like count (no optimistic adjustment for simplicity)
        const likeCount = post.likes;

        return (
          <Box
            key={post.id}
            sx={{
              mb: 4,
              p: 2,
              borderRadius: 2,
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(30, 30, 30, 0.1)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar
                src={post.user.avatar}
                alt={post.user.name}
                sx={{ width: 40, height: 40, mr: 1 }}
              />
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Link
                  to={`/post/${post.id}`}
                  style={{
                    textDecoration: "none",
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                  }}
                >
                  {post.user.name}
                </Link>
                <Typography variant="caption" color="text.secondary">
                  {formatDistanceToNow(new Date(post.timestamp))}
                </Typography>
              </Box>
            </Box>

            {/* Image */}
            {post.image && (
              <Link to={`/post/${post.id}`} style={{ display: "block", mb: 2 }}>
                <Box
                  sx={{
                    width: "100%",
                    maxHeight: 400,
                    overflow: "hidden",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={post.image}
                    alt="Post"
                    sx={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "100%",
                      maxHeight: 500,
                      objectFit: "cover", // keeps aspect ratio, crops if needed
                      display: "block",
                    }}
                  />
                </Box>
              </Link>
            )}

            {/* Caption */}
            <Typography variant="body1" sx={{ wordBreak: "break-word", my: 2 }}>
              <strong>{post.user.name}</strong> {post.caption}
            </Typography>

            <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.1)" }} />

            {/* Actions */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                aria-label={isLiked ? "unlike" : "like"}
                size="small"
                onClick={() => handleLike(post.id)}
              >
                {isLiked ? (
                  <LikedIcon sx={{ color: "error.main", fontSize: 28 }} />
                ) : (
                  <LikeIcon sx={{ color: "white", fontSize: 28 }} />
                )}
              </IconButton>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ ml: -0.5 }}
              >
                {post.likesInfo.length}
              </Typography>

              <IconButton
                onClick={() => navigate(`/post/${post.id}`)}
                aria-label="comment"
                size="small"
                sx={{ ml: 2 }}
              >
                <CommentIcon />
              </IconButton>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ ml: -0.5 }}
              >
                {post.comments}
              </Typography>
            </Box>
          </Box>
        );
      })}

      {/* End of posts message */}
      {!hasMore && posts.length > 0 && (
        <Box sx={{ textAlign: "center", py: 3 }}>
          <Typography variant="body2" color="text.secondary">
            You've reached the end!
          </Typography>
        </Box>
      )}
    </Box>
  );
}
