// src/pages/HomeSkeleton.jsx
import React from "react";
import { Box, Avatar, Skeleton, Divider } from "@mui/material";

export default function HomeSkeleton() {
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
      {[...Array(3)].map((_, i) => (
        <Box
          key={i}
          sx={{
            mb: 4,
            p: 2,
            borderRadius: 2,
            backgroundColor: "rgba(30, 30, 30, 0.1)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* Header Skeleton */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ mr: 1 }}
            />
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Skeleton width={100} height={20} />
              <Skeleton width={60} height={16} />
            </Box>
          </Box>

          {/* Image Skeleton */}
          <Skeleton
            variant="rectangular"
            width="100%"
            height={300}
            sx={{ borderRadius: 1, mb: 2 }}
          />

          {/* Caption Skeleton */}
          <Skeleton width="80%" height={20} sx={{ mb: 1 }} />
          <Skeleton width="100%" height={20} sx={{ mb: 2 }} />

          <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.1)" }} />

          {/* Actions Skeleton */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Skeleton
              variant="circular"
              width={28}
              height={28}
              sx={{ mr: 1 }}
            />
            <Skeleton width={20} height={16} sx={{ mr: 2 }} />
            <Skeleton
              variant="circular"
              width={28}
              height={28}
              sx={{ mr: 1 }}
            />
            <Skeleton width={20} height={16} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
