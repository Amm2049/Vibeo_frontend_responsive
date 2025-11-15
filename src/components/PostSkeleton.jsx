// src/pages/PostSkeleton.jsx
import React from "react";
import { Box, Avatar, Skeleton, Divider } from "@mui/material";

export default function PostSkeleton() {
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
      {/* Header Skeleton */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Skeleton variant="circular" width={32} height={32} sx={{ mr: 1 }} />
        <Skeleton width={80} height={28} />
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 3 }} />

      {/* Post Content Skeleton */}
      <Box sx={{ mb: 3 }}>
        {/* User Info Skeleton */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ ml: 1.5 }}>
            <Skeleton width={120} height={20} />
            <Skeleton width={100} height={16} sx={{ mt: 0.5 }} />
          </Box>
        </Box>

        {/* Image Skeleton */}
        <Skeleton
          variant="rectangular"
          width="100%"
          height={400}
          sx={{ borderRadius: 1, mb: 2 }}
        />

        {/* Caption Skeleton */}
        <Skeleton width="60%" height={20} sx={{ mb: 1 }} />
        <Skeleton width="100%" height={20} sx={{ mb: 2 }} />

        {/* Likes & Comments Count Skeleton */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Skeleton width={80} height={16} />
          <Skeleton width={100} height={16} />
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 2 }} />

      {/* Comments Section Skeleton */}
      <Box sx={{ mb: 3 }}>
        {[...Array(2)].map((_, i) => (
          <Box key={i} sx={{ mb: 3, mt: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <Skeleton width={100} height={18} />
              <Skeleton width={60} height={14} sx={{ ml: 1 }} />
            </Box>
            <Skeleton width="90%" height={16} sx={{ ml: 0.5 }} />
          </Box>
        ))}
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 2 }} />

      {/* Add Comment Input Skeleton */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Skeleton variant="rounded" width="100%" height={40} sx={{ flex: 1 }} />
        <Skeleton variant="circular" width={40} height={40} />
      </Box>
    </Box>
  );
}
