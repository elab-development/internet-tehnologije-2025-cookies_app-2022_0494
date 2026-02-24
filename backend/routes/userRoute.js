const express = require("express")
const router = express.Router();
const { getUsers, registerUser, loginUser,removeUser} = require("../controllers/userController")
const requireAuth = require("../middleware/requireAuth")

/**
 * @swagger
 * tags:
 *   name: Korisnici
 *   description: Upravljanje korisnicima i autentifikacija
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registracija novog korisnika
 *     tags: [Korisnici]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, age, phone]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nemanja Petrović
 *               email:
 *                 type: string
 *                 example: nemanja@example.com
 *               password:
 *                 type: string
 *                 example: lozinka123
 *               age:
 *                 type: number
 *                 example: 22
 *               phone:
 *                 type: string
 *                 example: "0641234567"
 *     responses:
 *       200:
 *         description: Korisnik uspešno registrovan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Nalog već postoji
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
router.route("/register").post(registerUser)

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Prijava korisnika
 *     tags: [Korisnici]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: nemanja@example.com
 *               password:
 *                 type: string
 *                 example: lozinka123
 *     responses:
 *       200:
 *         description: Uspešna prijava, vraća JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Pogrešan email ili lozinka
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Email nije registrovan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.route("/login").post(loginUser)

// auth middleware
router.use(requireAuth)

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Dohvata sve korisnike
 *     tags: [Korisnici]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista svih korisnika
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Neautorizovan pristup
 */
router.route("/").get(getUsers)

/**
 * @swagger
 * /api/users/remove/{id}:
 *   delete:
 *     summary: Briše korisnika po ID-ju
 *     tags: [Korisnici]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID korisnika
 *         example: 664f1b2c3e4d5f6a7b8c9d0e
 *     responses:
 *       200:
 *         description: Korisnik uspešno obrisan, vraća obrisani objekat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Neispravan format ID-ja
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Korisnik nije pronađen
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Neautorizovan pristup
 */
router.route("/remove/:id").delete(removeUser)


module.exports = router;
