// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Divider,
  CircularProgress,
  //   useTheme,
} from "@mui/material";
import { Lock as LockIcon } from "@mui/icons-material";

export default function Login() {
  const navigate = useNavigate();
  //   const theme = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const api = import.meta.env.VITE_API;
    fetch(`${api}/users/signin`, {
      method: "POST", // or 'POST', etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then(async (res) => {
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("jwt", data.token);
        setIsLoading(false);
        navigate("/"); // Redirect to home on success
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    });
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
          maxWidth: 420,
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
          <Avatar
            sx={{
              mb: 2,
              background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
              width: 64,
              height: 64,
            }}
          >
            <LockIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography variant="h5" fontWeight="bold" sx={{ color: "white" }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Sign in to your account
          </Typography>
          {isError && (
            <Typography variant="body2" color="red" sx={{ mt: 1 }}>
              Incorrect password or username !
            </Typography>
          )}
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Don’t have an account?{" "}
            <Typography
              component="span"
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
