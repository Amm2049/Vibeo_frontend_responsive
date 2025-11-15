// src/pages/ProfileSkeleton.jsx
import React from "react";
import { Box, Avatar, Skeleton, Divider } from "@mui/material";

export default function ProfileSkeleton() {
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
      {/* Cover Photo Skeleton */}
      <Box
        sx={{
          height: 180,
          borderRadius: 2,
          mb: -7,
          position: "relative",
          bgcolor: "grey.900",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ borderRadius: 2 }}
        />
      </Box>

      <Box sx={{ textAlign: "center", mb: 4, px: 2, pt: 4 }}>
        {/* Avatar Skeleton */}
        <Skeleton
          variant="circular"
          width={120}
          height={120}
          sx={{ mx: "auto", mb: 2 }}
        />

        {/* Full Name Skeleton */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            mb: 1,
          }}
        >
          <Skeleton width={160} height={30} />
        </Box>

        {/* Bio Skeleton */}
        <Skeleton width="80%" height={20} sx={{ mx: "auto", mb: 2 }} />
        <Skeleton width="90%" height={40} sx={{ mx: "auto", mb: 3 }} />

        {/* Stats Skeleton */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mb: 3 }}>
          {[0, 1, 2].map((i) => (
            <Box key={i} textAlign="center">
              <Skeleton width={40} height={24} sx={{ mx: "auto" }} />
              <Skeleton width={60} height={16} sx={{ mx: "auto", mt: 0.5 }} />
            </Box>
          ))}
        </Box>

        {/* Buttons Skeleton */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          <Skeleton width={90} height={36} variant="rounded" />
          <Skeleton width={90} height={36} variant="rounded" />
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 3 }} />

      {/* Images Section Title Skeleton */}
      <Skeleton width={100} height={28} sx={{ mb: 2 }} />

      {/* Images Grid Skeleton */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
        }}
      >
        {[...Array(9)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width="100%"
            height={0}
            sx={{ pb: "100%", borderRadius: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
}
