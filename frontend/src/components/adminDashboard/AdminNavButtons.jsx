import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const vibrantGradient = "linear-gradient(90deg, #FE7400 0%, #03B221 100%)";

export default function AdminNavButtons() {
  const navigate = useNavigate();
  const location = useLocation();

  const buttons = [
    { label: "Dashboard", path: "/admin" },
    { label: "Pending", path: "/admin/pending" },
    { label: "Log Out", path: "/admin/login" },
  ];

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
      {buttons.map(({ label, path }) => (
        <Button
          key={path}
          variant={location.pathname === path ? "contained" : "outlined"}
          onClick={() => handleClick(path)}
          sx={{
            background:
              location.pathname === path ? vibrantGradient : "transparent",
            color: location.pathname === path ? "#fff" : vibrantGradient,
            borderColor: vibrantGradient,
            px: 3,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              background: vibrantGradient,
              color: "#fff",
            },
          }}
        >
          {label}
        </Button>
      ))}
    </Stack>
  );
}
