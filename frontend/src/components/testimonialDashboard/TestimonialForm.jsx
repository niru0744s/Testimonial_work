import React from "react";
import {
  Box,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Rating,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useDropzone } from "react-dropzone";

export default function TestimonialForm({ testimonial, setTestimonial, errors }) {
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    setTestimonial((t) => ({ ...t, media: acceptedFiles[0] }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [], "image/jpg": [] },
    maxFiles: 1,
    onDrop,
  });

  return (
    <Box component="form" noValidate autoComplete="off">
      <Typography component="legend" sx={{ mt: 1 }}>
        Rating
      </Typography>
      <Rating
        name="custom-rating"
        value={testimonial.rating}
        precision={1}
        onChange={(_, v) => setTestimonial((t) => ({ ...t, rating: v }))}
        icon={<StarIcon fontSize="inherit" sx={{ color: "#FE7400" }} />}
        emptyIcon={<StarIcon fontSize="inherit" sx={{ color: "#EEE" }} />}
        sx={{ fontSize: 36 }}
      />
      {errors.rating && (
        <Typography color="error" fontSize={14}>
          {errors.rating}
        </Typography>
      )}

      <TextField
        fullWidth
        label="Title"
        margin="normal"
        value={testimonial.title}
        onChange={(e) => setTestimonial((t) => ({ ...t, title: e.target.value }))}
        error={!!errors.title}
        helperText={errors.title}
      />
      <TextField
        fullWidth
        label="Feedback"
        margin="normal"
        multiline
        rows={5}
        value={testimonial.feedback}
        onChange={(e) => setTestimonial((t) => ({ ...t, feedback: e.target.value }))}
        error={!!errors.feedback}
        helperText={errors.feedback}
      />

      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #aaa",
          p: 2,
          borderRadius: 2,
          textAlign: "center",
          bgcolor: isDragActive ? "#FFF5E5" : "#FAFAFA",
          cursor: "pointer",
          mt: 2,
          mb: 1,
        }}
      >
        <input {...getInputProps()} />
        {testimonial.media ? (
          <img
            src={URL.createObjectURL(testimonial.media)}
            alt="media preview"
            style={{ maxHeight: 150, borderRadius: 8 }}
          />
        ) : (
          <Typography variant="body2" color="textSecondary">
            Drag & drop file here, or click to select
          </Typography>
        )}
        <Typography variant="caption" color="textSecondary" display="block" mt={1}>
          (JPG, JPEG, PNG)
        </Typography>
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={testimonial.consent}
            onChange={(e) => setTestimonial((t) => ({ ...t, consent: e.target.checked }))}
            color="primary"
          />
        }
        label="I consent to my testimonial being published."
      />
      {errors.consent && (
        <Typography color="error" fontSize={14}>
          {errors.consent}
        </Typography>
      )}
    </Box>
  );
}
