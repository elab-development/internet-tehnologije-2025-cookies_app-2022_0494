const express = require("express")
const router = express.Router();
const { getUsers, registerUser, loginUser,removeUser} = require("../controllers/userController")
const requireAuth = require("../middleware/requireAuth")



router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

// auth middleware 
router.use(requireAuth)

router.route("/").get(getUsers)

router.route("/remove/:id").delete(removeUser)


module.exports = router;