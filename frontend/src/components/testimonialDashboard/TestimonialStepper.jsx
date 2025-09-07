import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, Button, Grid, Paper, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import ProfileForm from "./ProfileForm";
import TestimonialForm from "./TestimonialForm";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const ORANGE = "#FE7400";
const GREEN = "#03B221";

const steps = ["User Profile", "Testimonial"];

const theme = createTheme({
  palette: {
    primary: { main: ORANGE },
    secondary: { main: GREEN },
  },
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: ORANGE,
          "&.Mui-completed": { color: GREEN },
          "&.Mui-active": { color: ORANGE },
        },
      },
    },
  },
});

export default function TestimonialStepper() {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    designation: "",
    company: "",
    profilePic: null,
  });

  const [testimonial, setTestimonial] = useState({
    rating: 0,
    title: "",
    feedback: "",
    media: null,
    consent: false,
  });

  const [errors, setErrors] = useState({});

  const validateProfile = () => {
    const errs = {};
    if (!profile.fullName) errs.fullName = "Full name required";
    if (!profile.email) errs.email = "Email required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateTestimonial = () => {
    const errs = {};
    if (!testimonial.title) errs.title = "Title required";
    if (!testimonial.feedback) errs.feedback = "Feedback required";
    if (!testimonial.rating) errs.rating = "Rating required";
    if (!testimonial.consent) errs.consent = "Consent required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 0 && !validateProfile()) return;
    if (activeStep === 1 && !validateTestimonial()) return;
    setErrors({});
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setErrors({});
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateTestimonial()) return;
    const formData = new FormData();

  formData.append("fullName", profile.fullName);
  formData.append("email", profile.email);
  formData.append("designation", profile.designation);
  formData.append("company", profile.company);


  formData.append("rating", testimonial.rating.toString());
  formData.append("title", testimonial.title);
  formData.append("feedback", testimonial.feedback);
  formData.append("consent", testimonial.consent ? "true" : "false");


  if (profile.profilePic instanceof File) {
    formData.append("profilePic", profile.profilePic, profile.profilePic.name);
  }
  if (testimonial.media instanceof File) {
    formData.append("mediaUrl", testimonial.media, testimonial.media.name);
  }
     await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/createTestimonial`,formData,{
      headers:{

      },
     }).then((res)=>{
        if(res.data.success == 1){
          alert("Testimonial submitted successfully!");
          setProfile({ fullName: "", email: "", designation: "", company: "", profilePic: null });
          setTestimonial({ rating: 0, title: "", feedback: "", media: null, consent: false });
          setActiveStep(0);
          navigate("/");
        }else{
          alert(res.data.message);
        }
     }).catch((err)=>{
      console.log(err);
        alert(err);
     })
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
      variant="outlined"
      startIcon={<ArrowBackIosNewIcon />}
      onClick={() => navigate("/")}
      sx={{
        position: "absolute",
        top: 28,
        left: 36,
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
        fontSize: 15,
        transition: "all 0.3s ease",
        backgroundClip: "padding-box",
        zIndex: 20,
        "&:hover": {
          background: "linear-gradient(90deg, #FE7400 0%, #03B221 100%)",
          borderColor: "transparent",
          color: "#fff",
          boxShadow: "0px 4px 15px rgba(254,116,0,0.3)",
          transform: "translateX(-2px)",
        },
      }}
    >
      Go Back
    </Button>
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh", bgcolor: "#FFF9F3" }}>
        <Grid item xs={12} sm={9} md={7} lg={5}>
          <Paper
            elevation={3}
            sx={{
              p: isMobile ? 2 : 4,
              my: 4,
              borderRadius: 4,
              width: "100%",
              maxWidth: 550,
              mx: "auto",
              boxShadow: 6,
            }}
          >
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <ProfileForm
                profile={profile}
                setProfile={setProfile}
                errors={errors}
              />
            )}

            {activeStep === 1 && (
              <TestimonialForm
                testimonial={testimonial}
                setTestimonial={setTestimonial}
                errors={errors}
              />
            )}

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <Button color="secondary" disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                Back
              </Button>
              {activeStep < steps.length - 1 && (
                <Button color="primary" onClick={handleNext} variant="contained">
                  Next
                </Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button color="primary" onClick={handleSubmit} variant="contained">
                  Submit
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
