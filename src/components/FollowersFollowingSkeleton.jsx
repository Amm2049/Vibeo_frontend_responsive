// src/pages/FollowersFollowingSkeleton.jsx
import React from "react";
import {
  Box,
  Skeleton,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

export default function FollowersFollowingSkeleton() {
  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        py: 2,
        bgcolor: "background.default",
        minHeight: "60vh",
      }}
    >
      {/* Header Skeleton */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Skeleton variant="circular" width={32} height={32} sx={{ mr: 1 }} />
        <Skeleton width={200} height={30} />
      </Box>

      {/* Tabs Skeleton */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} width={120} height={40} variant="rounded" />
        ))}
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 2 }} />

      {/* User List Skeleton */}
      <List sx={{ p: 0, mt: 1 }}>
        {[...Array(5)].map((_, i) => (
          <ListItem
            key={i}
            sx={{
              px: 0,
              py: 1.5,
              mb: 1,
              borderRadius: 2,
              bgcolor: "transparent",
            }}
          >
            <ListItemAvatar>
              <Skeleton variant="circular" width={44} height={44} />
            </ListItemAvatar>
            <ListItemText
              primary={<Skeleton width={120} height={20} />}
              secondary={<Skeleton width={100} height={16} sx={{ mt: 0.5 }} />}
            />
            <Skeleton
              variant="rounded"
              width={90}
              height={32}
              sx={{ flexShrink: 0 }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
