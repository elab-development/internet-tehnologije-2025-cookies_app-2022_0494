// controllers/applicationController.js

const Application = require("../models/applicationModel");
const User  = require("../models/userModel")

const createApplication = async (req, res) => {
  try {
    const { name, email, phone, courseName, courseId, userId } = req.body;

    // Check if the user already has an application for the given course ID
    const existingApplication = await Application.findOne({ courseId, userId });

    if (existingApplication) {
      return res.status(400).json({ message: "Već ste se prijavali za dati kurs" });
    }
    // Create new application
    const application = new Application({ name, email, phone, courseName, courseId, userId });
    await application.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Korisnik ne postoji" });
    }
    // Add the application to the user's applications array
    user.applications.push(application._id);
    await user.save();

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getApplications = async (req, res) => {
    try {
      const applications = await Application.find({});
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const removeApplication = async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const applicationId = req.params.id;
      // Find and delete the application for the specified course and application ID
      const application = await Application.findOneAndDelete({ courseId, _id: applicationId });
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      res.json({ message: "Application deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports={createApplication,getApplications,removeApplication}
  
