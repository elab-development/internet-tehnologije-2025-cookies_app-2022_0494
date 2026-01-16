const express = require("express")
const router = express.Router();
const { createApplication, getApplications, removeApplication} = require("../controllers/applicationController")
const { getCourses, getCourse,getMyCourses, addCourseToUser} = require("../controllers/courseController")
const requireAuth = require("../middleware/requireAuth")
const cors = require("cors")

//  start route  /api/courses

// router.use(cors())
// router.all('*', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'URLs to trust of allow');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   if ('OPTIONS' == req.method) {
//   res.sendStatus(200);
//   } else {
//     next();
//   }
// });

router.route("/applications").post(createApplication)

// auth middleware 
router.use(requireAuth)

router.route("/applications").get(getApplications)

router.route("/applications/:id").delete(removeApplication)

router.route("/").get(getCourses)
router.route("/my-courses/:userId").get(getMyCourses)
router.route("/:id").get(getCourse)
router.route("/add-course").post(addCourseToUser)
module.exports = router;