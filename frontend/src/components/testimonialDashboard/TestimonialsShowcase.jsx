import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Button, Paper} from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { motion } from "framer-motion";
import { useTestimonial } from "../context/TestimonialContext";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddCommentIcon from "@mui/icons-material/AddComment";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.04, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" },
};

const vibrantGradient = "linear-gradient(90deg, #FE7400 0%, #03B221 100%)";

export default function TestimonialsShowcase() {
  const { testimonials, fetchTestimonials, totalPages } = useTestimonial();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    fetchTestimonials(page);
  }, [page]);

  const handleViewMore = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <Box
      sx={{
        bgcolor: "#F6F7FB",
        minHeight: "100vh",
        px: { xs: 2, md: 10 },
        py: { xs: 4, md: 8 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
      variant="contained"
      startIcon={<AddCommentIcon />}
      onClick={() => navigate("/testimonialForm")}
      sx={{
        position: "absolute",
        top: { xs: 18, md: 38 },
        right: { xs: 18, md: 70 },
        background: "linear-gradient(90deg, #FE7400 0%, #03B221 100%)",
        color: "#fff",
        textTransform: "none",
        fontWeight: 600,
        fontSize: 16,
        px: 3,
        py: 1.25,
        borderRadius: 2,
        boxShadow: 2,
        letterSpacing: 0.5,
        "&:hover": {
          background: "linear-gradient(90deg, #FE7400 30%, #18C94A 100%)",
          filter: "brightness(0.96)",
        },
        zIndex: 10
      }}
    >
      Add Your Feedback
    </Button>
      <Paper
        elevation={0}
        sx={{
          maxWidth: 1100,
          width: "100%",
          bgcolor: "#fff",
          borderRadius: 3,
          p: { xs: 2, md: 5 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 6, md: 10 },
        }}
      >
        {/* Left Side */}
        <Box sx={{ flex: 2 }}>
          <Typography variant="h4" fontWeight={700} sx={{ lineHeight: 1.2, mb: 2 }}>
            What Our<br />Customers Say
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Relation so in confined smallest children unpacked delicate. Why sir and believe un-civil respect. Always get adieus nature day course for common.
          </Typography>
          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              background: vibrantGradient,
              color: "#fff",
              fontWeight: 600,
              fontSize: 18,
              textTransform: "capitalize",
              boxShadow: 2,
              letterSpacing: 1,
              transition: "background 0.3s",
              "&:hover": {
                background: "linear-gradient(90deg,#FF9900 0%, #18C94A 100%)",
                filter: "brightness(0.98)",
              },
            }}
            onClick={handleViewMore}
            disabled={page >= totalPages}
          >
            {page < totalPages ? "View More" : "No More Testimonials"}
          </Button>
        </Box>
        {/* Right Side */}
        <Box
          sx={{
            flex: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            justifyContent: "center",
          }}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {testimonials.map((item, idx) => {
            const highlighted = idx === 0; // First testimonial highlighted
            return (
              <Link to={`/testimonials/${item._id}`}
              style={{ textDecoration: "none" }}
              key={item._id}>
              <motion.div key={item._id} variants={cardVariants} whileHover="hover">
                <Paper
                  elevation={highlighted ? 8 : 2}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    position: "relative",
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: highlighted ? "#fff5e6" : "#f9fafb",
                    border: highlighted ? "2.5px solid #FE7400" : "1.5px solid #ececec",
                    minWidth: 0,
                    zIndex: highlighted ? 1 : 0,
                    ml: highlighted ? "-16px" : 0,
                  }}
                >
                  {highlighted && (
                    <Box
                      sx={{
                        position: "absolute",
                        left: 0,
                        top: 18,
                        bottom: 18,
                        width: 5,
                        borderRadius: 5,
                        bgcolor: "#FE7400",
                      }}
                    />
                  )}
                  <Avatar
                    src={`${import.meta.env.VITE_BACKEND_URL}${item.profilePic}`}
                    alt={item.fullName}
                    sx={{
                      width: 56,
                      height: 56,
                      border: highlighted ? "3px solid #FE7400" : "2px solid #eee",
                      zIndex: 1,
                      mr: 1,
                      ml: highlighted ? 2 : 0,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      fontWeight={600}
                      sx={{
                        color: highlighted ? "primary.main" : "text.primary",
                      }}
                    >
                      {item.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {item.feedback}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
                    <FormatQuoteIcon
                      sx={{
                        fontSize: 32,
                        color: highlighted ? "#FE7400" : "#e0e0e0",
                      }}
                    />
                  </Box>
                </Paper>
              </motion.div>
              </Link>
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
}
