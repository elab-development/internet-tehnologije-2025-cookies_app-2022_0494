const express = require("express")
const router = express.Router();
const { createApplication, getApplications, removeApplication} = require("../controllers/applicationController")
const { getCourses, getCourse,getMyCourses, addCourseToUser} = require("../controllers/courseController")
const requireAuth = require("../middleware/requireAuth")
const cors = require("cors")

//  start route  /api/courses

/**
 * @swagger
 * tags:
 *   - name: Kursevi
 *     description: Upravljanje kursevima
 *   - name: Prijave
 *     description: Prijave korisnika na kurseve
 */

/**
 * @swagger
 * /api/courses/applications:
 *   post:
 *     summary: Kreira novu prijavu na kurs
 *     tags: [Prijave]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, phone, courseName, courseId, userId]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nemanja Petrović
 *               email:
 *                 type: string
 *                 example: nemanja@example.com
 *               phone:
 *                 type: string
 *                 example: "0641234567"
 *               courseName:
 *                 type: string
 *                 example: Web Development
 *               courseId:
 *                 type: string
 *                 example: 664f1b2c3e4d5f6a7b8c9d0e
 *               userId:
 *                 type: string
 *                 example: 664f1b2c3e4d5f6a7b8c9d01
 *     responses:
 *       201:
 *         description: Prijava uspešno kreirana
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       400:
 *         description: Već postoji prijava za ovaj kurs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Korisnik ne postoji
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Greška na serveru
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.route("/applications").post(createApplication)

// auth middleware
router.use(requireAuth)

/**
 * @swagger
 * /api/courses/applications:
 *   get:
 *     summary: Dohvata sve prijave na kurseve
 *     tags: [Prijave]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista svih prijava
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 *       401:
 *         description: Neautorizovan pristup
 */
router.route("/applications").get(getApplications)

/**
 * @swagger
 * /api/courses/applications/{id}:
 *   delete:
 *     summary: Briše prijavu po ID-ju
 *     tags: [Prijave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID prijave
 *         example: 664f1b2c3e4d5f6a7b8c9d0e
 *     responses:
 *       200:
 *         description: Prijava uspešno obrisana
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Application deleted
 *       404:
 *         description: Prijava nije pronađena
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Neautorizovan pristup
 */
router.route("/applications/:id").delete(removeApplication)

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Dohvata sve kurseve
 *     tags: [Kursevi]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista svih kurseva
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       401:
 *         description: Neautorizovan pristup
 */
router.route("/").get(getCourses)

/**
 * @swagger
 * /api/courses/my-courses/{userId}:
 *   get:
 *     summary: Dohvata kurseve određenog korisnika
 *     tags: [Kursevi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID korisnika
 *         example: 664f1b2c3e4d5f6a7b8c9d0e
 *     responses:
 *       200:
 *         description: Lista kurseva korisnika
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       404:
 *         description: Korisnik nije pronađen
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Neautorizovan pristup
 */
router.route("/my-courses/:userId").get(getMyCourses)

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Dohvata jedan kurs po ID-ju
 *     tags: [Kursevi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID kursa
 *         example: 664f1b2c3e4d5f6a7b8c9d0e
 *     responses:
 *       200:
 *         description: Podaci o kursu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Neispravan format ID-ja
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Kurs nije pronađen
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Neautorizovan pristup
 */
router.route("/:id").get(getCourse)

/**
 * @swagger
 * /api/courses/add-course:
 *   post:
 *     summary: Dodaje kurs korisniku
 *     tags: [Kursevi]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, courseId]
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 664f1b2c3e4d5f6a7b8c9d01
 *               courseId:
 *                 type: string
 *                 example: 664f1b2c3e4d5f6a7b8c9d0e
 *     responses:
 *       200:
 *         description: Kurs uspešno dodat korisniku
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Kurs je dodat korisniku.
 *       404:
 *         description: Korisnik ili kurs nije pronađen
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Neautorizovan pristup
 */
router.route("/add-course").post(addCourseToUser)

module.exports = router;
