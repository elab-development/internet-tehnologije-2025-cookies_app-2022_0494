const express = require("express")
const router = express.Router();
const { createQuestion, getQuestions, removeQuestion } = require("../controllers/questionController")

//  start route  /api/questions

/**
 * @swagger
 * tags:
 *   name: Pitanja
 *   description: Upravljanje pitanjima korisnika (kontakt forma)
 */

/**
 * @swagger
 * /api/questions:
 *   post:
 *     summary: Kreira novo pitanje
 *     tags: [Pitanja]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, message]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nemanja Petrović
 *               email:
 *                 type: string
 *                 example: nemanja@example.com
 *               message:
 *                 type: string
 *                 example: Kada počinje sledeći kurs?
 *     responses:
 *       201:
 *         description: Pitanje uspešno kreirano
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       500:
 *         description: Greška na serveru
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   get:
 *     summary: Dohvata sva pitanja
 *     tags: [Pitanja]
 *     security: []
 *     responses:
 *       200:
 *         description: Lista svih pitanja
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 *       500:
 *         description: Greška na serveru
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.route("/").post(createQuestion)
router.route("/").get(getQuestions)

/**
 * @swagger
 * /api/questions/{id}:
 *   delete:
 *     summary: Briše pitanje po ID-ju
 *     tags: [Pitanja]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID pitanja
 *         example: 664f1b2c3e4d5f6a7b8c9d0e
 *     responses:
 *       200:
 *         description: Pitanje uspešno obrisano
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: Pitanje nije pronađeno
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
router.route("/:id").delete(removeQuestion)

module.exports = router;
