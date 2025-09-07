import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
} from "@mui/material";
import { useTestimonial } from "../context/TestimonialContext";
import AdminNavButtons from "./AdminNavButtons";

export default function PendingTestimonials() {
  const {
    pendingTestimonials,
    fetchPendingTestimonials,
    updateTestimonialStatus,
    deleteTestimonial,
    totalPages,
  } = useTestimonial();

  const [page, setPage] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [targetId, setTargetId] = useState(null);

  useEffect(() => {
    fetchPendingTestimonials(page);
  }, [page]);

  const openConfirmDialog = (id, type) => {
    setTargetId(id);
    setActionType(type);
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (actionType === "delete") {
      await deleteTestimonial(targetId);
    } else if (actionType === "approve") {
      await updateTestimonialStatus(targetId, "approved");
    } else if (actionType === "reject") {
      await updateTestimonialStatus(targetId, "rejected");
    }
    setConfirmOpen(false);
    fetchPendingTestimonials(page);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <AdminNavButtons />
      <Typography variant="h4" mb={3}>
        Pending Testimonials
      </Typography>
      <Stack spacing={2}>
        {pendingTestimonials.map((t) => (
          <Paper
            key={t._id}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              bgcolor: "#fafafa",
              borderRadius: 2,
              minWidth: 0,
              gap: { xs: 2, sm: 0 },
            }}
            elevation={2}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography fontWeight={600} noWrap>
                {t.fullName}
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: "normal" }}>
                {t.title}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {t.designation}
              </Typography>
            </Box>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={{ mt: { xs: 1, sm: 0 }, flexShrink: 0 }}
            >
              <Button
                variant="contained"
                color="success"
                fullWidth={false}
                sx={{ minWidth: 90 }}
                onClick={() => openConfirmDialog(t._id, "approve")}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="warning"
                fullWidth={false}
                sx={{ minWidth: 90 }}
                onClick={() => openConfirmDialog(t._id, "reject")}
              >
                Reject
              </Button>
              <Button
                variant="outlined"
                color="error"
                fullWidth={false}
                sx={{ minWidth: 90 }}
                onClick={() => openConfirmDialog(t._id, "delete")}
              >
                Delete
              </Button>
            </Stack>
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
        <DialogTitle>
          {actionType === "approve"
            ? "Approve this testimonial?"
            : actionType === "reject"
            ? "Reject this testimonial?"
            : "Delete this testimonial?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to{" "}
            {actionType === "approve"
              ? "approve"
              : actionType === "reject"
              ? "reject"
              : "delete"}{" "}
            this testimonial? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button
            color={
              actionType === "reject"
                ? "warning"
                : actionType === "approve"
                ? "success"
                : "error"
            }
            onClick={handleConfirm}
          >
            {actionType === "approve"
              ? "Approve"
              : actionType === "reject"
              ? "Reject"
              : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
