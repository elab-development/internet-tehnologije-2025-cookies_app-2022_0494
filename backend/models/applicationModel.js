const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  // Additional application details
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type:String,
    required:true
},
}, {
  timestamps: true
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
