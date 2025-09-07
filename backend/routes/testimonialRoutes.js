const express = require("express");
const router = express.Router();
const testimonialController = require("../controller/testimonialController");
const upload = require("../middleware/uploads");

router.get("/testimonial",testimonialController.getTestimonials);
router.post(
  "/createTestimonial",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "mediaUrl", maxCount: 1 }
  ]),
  testimonialController.createTestimonial
);
router
.get("/showTestimonial/:id",testimonialController.getTestimonialById)
.delete("/deleteTestimonials/:id",testimonialController.deleteTestimonial);

router.patch("/status/:id",testimonialController.updateTestimonialStatus);

module.exports = router;