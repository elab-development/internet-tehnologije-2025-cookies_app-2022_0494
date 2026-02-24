const express = require("express")
const router = express.Router();
const { createRole, getRoles, removeRole } = require("../controllers/roleController")

//  start route  /api/roles

/**
 * @swagger
 * tags:
 *   name: Uloge
 *   description: Upravljanje ulogama korisnika
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Kreira novu ulogu
 *     tags: [Uloge]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 enum: [ADMIN, GUEST, USER]
 *                 example: USER
 *     responses:
 *       201:
 *         description: Uloga uspešno kreirana
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       500:
 *         description: Greška na serveru
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   get:
 *     summary: Dohvata sve uloge
 *     tags: [Uloge]
 *     security: []
 *     responses:
 *       200:
 *         description: Lista svih uloga
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       500:
 *         description: Greška na serveru
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.route("/").post(createRole)
router.route("/").get(getRoles)

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Briše ulogu po ID-ju
 *     tags: [Uloge]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID uloge
 *         example: 664f1b2c3e4d5f6a7b8c9d0e
 *     responses:
 *       200:
 *         description: Uloga uspešno obrisana
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Uloga nije pronađena
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
router.route("/:id").delete(removeRole)

module.exports = router;
