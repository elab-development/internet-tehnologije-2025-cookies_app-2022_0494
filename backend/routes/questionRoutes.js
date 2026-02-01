const express = require("express")
const router = express.Router();
const { createQuestion, getQuestions, removeQuestion } = require("../controllers/questionController")

//  start route  /api/questions

router.route("/").post(createQuestion)
router.route("/").get(getQuestions)
router.route("/:id").delete(removeQuestion)

module.exports = router;
