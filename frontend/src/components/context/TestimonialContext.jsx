import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const TestimonialContext = createContext();

export function TestimonialProvider({ children }) {
  const [testimonials, setTestimonials] = useState([]);
  const [pendingTestimonials, setPendingTestimonials] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pendingTotalPages, setPendingTotalPages] = useState(1);

  async function fetchTestimonials(page = 1, limit = 3) {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/testimonial?page=${page}&limit=${limit}&status=approved`
      );
      setTestimonials(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    }
  }

  async function fetchPendingTestimonials(page = 1, limit = 10) {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/testimonial?page=${page}&limit=${limit}&status=pending`
      );
      setPendingTestimonials(data.items);
      setPendingTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch pending testimonials:", error);
    }
  }

  async function updateTestimonialStatus(id, status) {
    console.log(status);
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/status/${id}`, { status });
      await fetchTestimonials();
      await fetchPendingTestimonials();
    } catch (error) {
      console.error("Failed to update testimonial status:", error);
    }
  }

  async function deleteTestimonial(id) {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/deleteTestimonials/${id}`);
      await fetchTestimonials();
      await fetchPendingTestimonials();
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    }
  }

  return (
    <TestimonialContext.Provider
      value={{
        testimonials,
        pendingTestimonials,
        totalPages,
        pendingTotalPages,
        fetchTestimonials,
        fetchPendingTestimonials,
        updateTestimonialStatus,
        deleteTestimonial,
      }}
    >
      {children}
    </TestimonialContext.Provider>
  );
}

export function useTestimonial() {
  return useContext(TestimonialContext);
}
