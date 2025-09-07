const Testimonial = require("../models/testimonialForm");

module.exports.createTestimonial = async (req, res) => {
  try {
    const data = { ...req.body };
if (req.files.profilePic && req.files.profilePic[0]) {
  data.profilePic = "/media/" + req.files.profilePic[0].filename;
}
if (req.files.mediaUrl && req.files.mediaUrl[0]) {
  data.mediaUrl = "/media/" + req.files.mediaUrl[0].filename;
}
const newEmail = await Testimonial.findOne({email:data.email});
if(newEmail){
  return res.status(200).send({
    success:0,
    message:"Email Already exist"
  });
}
const testimonial = new Testimonial(data);
    const saved = await testimonial.save();
    res.status(201).send({
      success:1,
      message:"Testimonial Created !",
      saved
    });
  } catch (err) {
    res.status(400).json({ success: 0, error: err.message || err });

  }
};

module.exports.updateTestimonialStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).send({ success:0,error: "Invalid status value" });
    }

    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).send({ success:0,error: "Testimonial not found" });
    }

    res.send({success:1,updated});
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports.deleteTestimonial = async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).send({success:0, error: "Testimonial not found" });
    }
    res.json({ success:1 ,message: "Testimonial deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.getTestimonials = async (req, res) => {
  try {
    const { status, rating, designation, page = 1, limit = 3 } = req.query;
    const query = {};

    if (status) query.status = status;
    if (rating) query.rating = rating;
    if (designation) query.designation = designation;

    const skip = (Number(page) - 1) * Number(limit);
    const [total, testimonials] = await Promise.all([
      Testimonial.countDocuments(query),
      Testimonial.find(query)
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 }),
    ]);

    const totalPages = Math.ceil(total / Number(limit));
    res.send({
      success:1,
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages,
      items: testimonials,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).send({ error: "Testimonial not found" });
    }
    res.json({success:1,testimonial});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};