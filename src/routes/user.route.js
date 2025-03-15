import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';
import { validateUserRegistration, validateUserLogin } from '../middlewares/validation.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Alle Benutzer abrufen
 *     description: Gibt eine Liste aller Benutzer zurück (nur für authentifizierte Nutzer)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Erfolgreich, gibt eine Liste von Benutzern zurück.
 *       401:
 *         description: Nicht autorisiert, Token fehlt oder ist ungültig.
 */
router.get('/', AuthMiddleware.verifyToken, UserController.getAllUsers);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Neuen Benutzer registrieren
 *     description: Erstellt einen neuen Benutzer mit Benutzername, E-Mail und Passwort.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: maxmuster
 *               email:
 *                 type: string
 *                 example: max@example.com
 *               password:
 *                 type: string
 *                 example: geheim123
 *     responses:
 *       201:
 *         description: Benutzer erfolgreich erstellt.
 *       400:
 *         description: Ungültige Eingaben.
 */
router.post('/register', validateUserRegistration, UserController.register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Benutzer-Login
 *     description: Loggt den Benutzer ein und gibt ein JWT-Token zurück.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: max@example.com
 *               password:
 *                 type: string
 *                 example: geheim123
 *     responses:
 *       200:
 *         description: Erfolgreich, gibt ein JWT-Token zurück.
 *       401:
 *         description: Ungültige Anmeldeinformationen.
 */
router.post('/login', validateUserLogin, UserController.login);

export default router;

