import React, { useState } from "react";
import { Button, TextField, Box, Typography, Paper } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login(email, password)) {
      setError("Invalid credentials");
      return;
    }
    setError("");
    navigate("/admin");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5faf7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p:2,
      }}
    >
      <Paper sx={{ p: 4, width: 360, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            type="email"
            required
          />
          <TextField
            label="Password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            type="password"
            required
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              background: "linear-gradient(90deg,#FE7400 0%,#03B221 100%)",
              color: "#fff",
              borderRadius: 2,
              py: 1.5,
            }}
            fullWidth
          >
            Log In
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
