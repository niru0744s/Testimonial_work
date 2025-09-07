import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Avatar, Paper, Rating, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

export default function TestimonialShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testimonial, setTestimonial] = useState(null);

  useEffect(() => {
    const fetchTestimonial = async () => {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/showTestimonial/${id}`).then((res)=>{
        setTestimonial(res.data.testimonial);
      })
    };
    fetchTestimonial();
  }, [id]);

  if (!testimonial) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f6f7fb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 7,
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Back Button */}
      <Button
  variant="outlined"
  startIcon={<ArrowBackIosNewIcon />}
  onClick={() => navigate("/")}
  sx={{
    alignSelf: "flex-start",
    ml: { xs: 2, md: 10 },
    borderRadius: 3,
    border: "2px solid",
    borderImageSlice: 1,
    borderWidth: "2px",
    borderImageSource: "linear-gradient(90deg, #FE7400 0%, #03B221 100%)",
    color: "#FE7400",
    fontWeight: 600,
    textTransform: "none",
    px: 3,
    py: 1,
    fontSize: 16,
    transition: "all 0.3s ease",
    backgroundClip: "padding-box",
    "&:hover": {
      background: "linear-gradient(90deg, #FE7400 0%, #03B221 100%)",
      borderColor: "transparent",
      color: "#fff",
      boxShadow: "0px 4px 15px rgba(254,116,0,0.4)",
      transform: "translateX(-2px)",
    },
  }}
>
  Back
</Button>

      <Paper
        sx={{
          width: 400,
          borderRadius: 4,
          p: 4,
          boxShadow: "0 12px 40px rgba(254,116,0,0.12)",
          background: "#fff",
          position: "relative",
        }}
        elevation={10}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
          <Avatar
            src={`${import.meta.env.VITE_BACKEND_URL}${testimonial.profilePic}`}
            alt={testimonial.fullName}
            sx={{
              width: 82,
              height: 82,
              border: "4px solid #FE7400",
              mb: 1.5,
              boxShadow: "0 2px 10px 0 rgba(254,116,0,0.13)",
            }}
          />
          <Box sx={{ position: "absolute", left: 24, top: 24, opacity: 0.12 }}>
            <FormatQuoteIcon fontSize="large" color="warning" />
          </Box>
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: "#333c",
            fontWeight: 500,
            mb: 3,
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          {testimonial.feedback}
        </Typography>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", fontWeight: "bold", color: "#FE7400" }}
        >
          {testimonial.fullName}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ textAlign: "center", color: "#666", mb: 2 }}
        >
          {testimonial.designation}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Rating
            value={testimonial.rating}
            readOnly
            precision={1}
            sx={{
              "& .MuiRating-iconFilled": { color: "#FE7400" },
              fontSize: 24,
            }}
          />
        </Box>
        {testimonial.mediaUrl && (
          <Box
            sx={{
              overflow: "hidden",
              borderRadius: 4,
              boxShadow: "0 12px 24px rgba(0,0,0,0.09)",
              maxHeight: 210,
              mt: 3,
            }}
          >
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${testimonial.mediaUrl}`}
              alt={`${testimonial.fullName} media`}
              style={{ width: "100%", display: "block", objectFit: "cover" }}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
}
