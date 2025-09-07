import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Avatar,
  Rating,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTestimonial } from "../context/TestimonialContext";
import AdminNavButtons from "./AdminNavButtons";

export default function AdminDashboard() {
  const { testimonials, fetchTestimonials, deleteTestimonial, totalPages } =
    useTestimonial();
  const [page, setPage] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [DeleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchTestimonials(page);
  }, [page]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteTestimonial(DeleteId);
    fetchTestimonials(page);
    setConfirmOpen(false);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <AdminNavButtons />
      <Typography variant="h4" mb={3}>
        Approved Testimonials
      </Typography>
      <Stack spacing={2}>
        {testimonials.map((t) => (
          <Paper
            key={t._id}
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "#fafafa",
              borderRadius: 2,
              flexWrap: "wrap",
              gap: 2,
            }}
            elevation={2}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0 }}>
              <Avatar
                src={t.profilePic ? `${import.meta.env.VITE_BACKEND_URL}${t.profilePic}` : ""}
                alt={t.fullName}
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: "#fff3e0",
                  border: "2.5px solid #FE7400",
                  fontWeight: 600,
                  fontSize: 20,
                }}
              >
                {!t.profilePic && (t.fullName?.[0] || "U")}
              </Avatar>
              <Box sx={{ minWidth: 0, overflow: "hidden" }}>
                <Typography fontWeight={600} noWrap>
                  {t.fullName} 
                </Typography>
                <Typography variant="body2" noWrap sx={{ maxWidth: 300 }}>
                   {t.title} 
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                   {t.designation} ||  
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                   {t.email}
                </Typography>
                <Rating
                  name="rating"
                  value={Number(t.rating)}
                  readOnly
                  size="small"
                  precision={0.5}
                  sx={{ "& .MuiRating-iconFilled": { color: "#FE7400" } }}
                />
              </Box>
            </Box>
            <Button
              variant="outlined"
              color="error"
              sx={{ fontWeight: 600, borderWidth: 2, minWidth: 90, height: 36, letterSpacing: 1 }}
              onClick={() => handleDeleteClick(t._id)}
            >
              DELETE
            </Button>
          </Paper>
        ))}
      </Stack>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      />

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete Testimonial?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this testimonial? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
