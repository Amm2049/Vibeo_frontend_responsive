// src/pages/Chat.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Avatar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  // useTheme,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  Search as SearchIcon,
  MoreVert as MoreIcon,
} from "@mui/icons-material";

// Mock chat data
const chats = [
  {
    id: "1",
    user: { name: "Alex Morgan", avatar: "https://i.pravatar.cc/150?img=1" },
    lastMessage: "Hey! How are you?",
    time: "2m ago",
    unread: true,
  },
  {
    id: "2",
    user: { name: "Jamie Rivera", avatar: "https://i.pravatar.cc/150?img=5" },
    lastMessage: "Check out this new design I made!",
    time: "1h ago",
    unread: false,
  },
  {
    id: "3",
    user: { name: "Taylor Kim", avatar: "https://i.pravatar.cc/150?img=12" },
    lastMessage: "Are we still meeting tomorrow?",
    time: "3h ago",
    unread: false,
  },
  {
    id: "4",
    user: { name: "Jordan Lee", avatar: "https://i.pravatar.cc/150?img=8" },
    lastMessage: "Thanks for the help!",
    time: "1d ago",
    unread: false,
  },
];

export default function Chat() {
  // const navigate = useNavigate();
  // const theme = useTheme();

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        py: 2,
        px: 2,
        bgcolor: "background.default",
        minHeight: "90vh",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ color: "white" }}>
          Chats
        </Typography>
        <Box>
          <IconButton sx={{ color: "text.secondary" }}>
            <SearchIcon />
          </IconButton>
          <IconButton sx={{ color: "text.secondary" }}>
            <MoreIcon />
          </IconButton>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 2 }} />

      {/* Chat List */}
      <List sx={{ p: 0 }}>
        {chats.map((chat) => (
          <ListItem
            key={chat.id}
            component={Link}
            to={`/chat/${chat.id}`}
            sx={{
              px: 0,
              py: 1.5,
              mb: 1,
              borderRadius: 2,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.03)",
              },
            }}
          >
            <ListItemAvatar>
              <Avatar
                src={chat.user.avatar}
                alt={chat.user.name}
                sx={{ width: 50, height: 50 }}
              />
            </ListItemAvatar>

            <ListItemText
              primary={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ color: "white" }}
                  >
                    {chat.user.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {chat.time}
                  </Typography>
                </Box>
              }
              secondary={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="body2"
                    color={chat.unread ? "primary.main" : "text.secondary"}
                    sx={{ fontWeight: chat.unread ? "bold" : "normal" }}
                  >
                    {chat.lastMessage}
                  </Typography>
                  {chat.unread && (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        ml: 1,
                      }}
                    />
                  )}
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
