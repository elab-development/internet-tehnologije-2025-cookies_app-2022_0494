const authorizeCourseAccess = (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    // Check if user owns the required course
    const courseId = req.params.courseId; // Assuming courseId is in the route params
    const userCourses = req.user.courses; // Assuming user's courses are stored in req.user
  
    if (!userCourses.includes(courseId)) {
      return res.status(403).json({ message: "Forbidden" });
    }
  
    // User is authorized, proceed to the next middleware
    next();
  };
  module.exports={authorizeCourseAccess}