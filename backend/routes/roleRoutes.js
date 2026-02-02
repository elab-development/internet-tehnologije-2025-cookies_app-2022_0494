const express = require("express")
const router = express.Router();
const { createRole, getRoles, removeRole } = require("../controllers/roleController")

//  start route  /api/roles

router.route("/").post(createRole)
router.route("/").get(getRoles)
router.route("/:id").delete(removeRole)

module.exports = router;
