const Course = require("../models/courseModel")
const User = require("../models/userModel")
const mongoose = require("mongoose")

const getCourses = async (req,res) => {
    try {
        const courses = await Course.find({})
        res.json(courses)
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

const getMyCourses = async (req, res) => {
    try {
        const userId = req.params.userId; 
        const user = await User.findById(userId).populate('courses'); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCourseToUser = async (req, res) => {
    try {
      const { userId, courseId } = req.body;
  
      const user = await User.findById(userId);
      const course = await Course.findById(courseId);
      
      if (!user) {
        return res.status(404).json("Korisnik ne postoji");
      }
      if (!course) {
        return res.status(404).json("Kurs sa datim ID-jem ne postoji");
      }
  
      // Add the course ID to the user's courses array
      user.courses.push(course._id);
  
      // Save the updated user object
      await user.save();
  
      res.status(200).json("Kurs je dodat korisniku.");
    } catch (error) {
      console.log(error);
      res.status(500).json("Došlo je do greške prilikom dodavanja kursa korisniku.");
    }
  }



const getCourse = async (req,res) => {
    try {
        const id = req.params.id;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid course ID format.',
            });
        }
    
        const course = await Course.findById(id);
        //   Ako ne postoji, vracamo 404 Not Found
        if (!course) {
            res.status(404);
            res.json({
                message: 'Course with the given ID was not found.',
            });
            return;
      }

    res.json(course);

  } catch (error) {
      res.json({error:error.message})
  }
}

module.exports={getCourses,getMyCourses,getCourse,addCourseToUser}