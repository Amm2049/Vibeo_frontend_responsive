// src/pages/ChatRoom.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Avatar,
  Typography,
  Divider,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  //   useTheme,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  Send as SendIcon,
  AttachFile as AttachIcon,
  MoreVert as MoreIcon,
} from "@mui/icons-material";

// Mock messages
const mockMessages = [
  { id: "1", text: "Hey! How are you?", sender: "other", time: "10:30 AM" },
  {
    id: "2",
    text: "I'm good! Just working on that project.",
    sender: "me",
    time: "10:32 AM",
  },
  {
    id: "3",
    text: "Nice! Can you share the design?",
    sender: "other",
    time: "10:35 AM",
  },
  { id: "4", text: "Sure, check your email!", sender: "me", time: "10:36 AM" },
];

export default function ChatRoom() {
  //   const { id } = useParams();
  const navigate = useNavigate();
  //   const theme = useTheme();
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, message]);
    setNewMessage("");
  };

  const chatUser = {
    name: "Alex Morgan",
    avatar: "https://i.pravatar.cc/150?img=1",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "90vh",
        bgcolor: "background.default",
        maxWidth: 600,
        mx: "auto",
      }}
    >
      {/* Chat Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <IconButton onClick={() => navigate("/chat")} sx={{ mr: 1 }}>
          <BackIcon sx={{ color: "white" }} />
        </IconButton>
        <Avatar
          src={chatUser.avatar}
          alt={chatUser.name}
          sx={{ width: 40, height: 40 }}
        />
        <Box sx={{ ml: 2 }}>
          <Typography variant="body1" fontWeight="bold" sx={{ color: "white" }}>
            {chatUser.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Online
          </Typography>
        </Box>
        <IconButton sx={{ ml: "auto", color: "text.secondary" }}>
          <MoreIcon />
        </IconButton>
      </Box>

      {/* Messages Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <List sx={{ p: 0, width: "100%" }}>
          {messages.map((message) => (
            <ListItem
              key={message.id}
              sx={{
                justifyContent:
                  message.sender === "me" ? "flex-end" : "flex-start",
                px: 0,
                py: 0.5,
              }}
            >
              <Box
                sx={{
                  maxWidth: "70%",
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor:
                    message.sender === "me"
                      ? "primary.main"
                      : "rgba(255,255,255,0.08)",
                  color: message.sender === "me" ? "white" : "text.primary",
                  borderTopRightRadius: message.sender === "me" ? 0 : 2,
                  borderTopLeftRadius: message.sender === "me" ? 2 : 0,
                }}
              >
                <ListItemText
                  primary={message.text}
                  secondary={
                    <Typography
                      variant="caption"
                      sx={{
                        textAlign: message.sender === "me" ? "right" : "left",
                        display: "block",
                        mt: 0.5,
                        color:
                          message.sender === "me"
                            ? "rgba(255,255,255,0.8)"
                            : "text.secondary",
                      }}
                    >
                      {message.time}
                    </Typography>
                  }
                />
              </Box>
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      {/* Message Input */}
      <Box
        sx={{
          p: 1.5,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton sx={{ color: "text.secondary" }}>
          <AttachIcon />
        </IconButton>
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          InputProps={{
            sx: {
              color: "white",
              "&::before": { borderBottom: "1px solid rgba(255,255,255,0.2)" },
              "&:hover::before": {
                borderBottom: "1px solid rgba(255,255,255,0.4)",
              },
            },
          }}
        />
        <IconButton
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          sx={{
            color: newMessage.trim() ? "primary.main" : "text.disabled",
            ml: 1,
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
