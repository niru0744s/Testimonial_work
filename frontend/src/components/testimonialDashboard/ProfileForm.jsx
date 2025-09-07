import React from "react";
import { Box, TextField, Typography, Avatar, IconButton } from "@mui/material";
import { useDropzone } from "react-dropzone";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export default function ProfileForm({ profile, setProfile, errors }) {
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [], "image/jpg": [] },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setProfile((p) => ({ ...p, profilePic: acceptedFiles[0] }));
      }
    }
  });
 
  const imgUrl = profile.profilePic
    ? typeof profile.profilePic === "string"
      ? profile.profilePic
      : URL.createObjectURL(profile.profilePic)
    : "";

  return (
    <Box component="form" noValidate autoComplete="off">
      <Box
        sx={{
          position: "relative",
          width: 120,
          height: 120,
          mx: "auto",
          mb: 2,
        }}
        {...getRootProps()}
      >
        <Avatar
          src={imgUrl}
          alt={profile.fullName || "Profile Picture"}
          sx={{
            width: 120,
            height: 120,
            fontSize: 48,
            bgcolor: "#eee",
            color: "#999",
          }}
        >
          {!imgUrl && profile.fullName
            ? profile.fullName.charAt(0).toUpperCase()
            : ""}
        </Avatar>
        {/* camera button */}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            bgcolor: "#FE7400",
            color: "#fff",
            border: "2px solid #fff",
            width: 44,
            height: 44,
            "&:hover": { bgcolor: "#D65A00" },
            boxShadow: "0 1px 6px rgba(0,0,0,.15)",
            zIndex: 10,
          }}
        >
          <PhotoCameraIcon />
        </IconButton>
        <input {...getInputProps()} />
      </Box>
      <Typography variant="caption" display="block" gutterBottom>
        Profile Picture (optional)
      </Typography>

      <TextField
        fullWidth
        label="Full Name"
        margin="normal"
        value={profile.fullName}
        onChange={(e) =>
          setProfile((p) => ({ ...p, fullName: e.target.value }))
        }
        error={!!errors.fullName}
        helperText={errors.fullName}
      />
      <TextField
        fullWidth
        label="Email"
        type="email"
        margin="normal"
        value={profile.email}
        onChange={(e) =>
          setProfile((p) => ({ ...p, email: e.target.value }))
        }
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        fullWidth
        label="Designation"
        margin="normal"
        value={profile.designation}
        onChange={(e) =>
          setProfile((p) => ({ ...p, designation: e.target.value }))
        }
      />
      <TextField
        fullWidth
        label="Company Name"
        margin="normal"
        value={profile.company}
        onChange={(e) =>
          setProfile((p) => ({ ...p, company: e.target.value }))
        }
      />
    </Box>
  );
}
