/**
 * @swagger
 * /users/sign-up:
 * post:
 * summary: Inscription
 * tags: [Users]
 * responses:
 * 201:
 * description: OK
 */

/**
 * @swagger
 * /users/sign-in:
 * post:
 * summary: Connexion
 * tags: [Users]
 * responses:
 * 200:
 * description: OK
 */
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const validateWithJoi = require("../middlewares/validateData.middleware");
const authenticateMiddleware = require("../middlewares/authenticate.middleware");
const { userSignUpSchema, userSignInSchema } = require("../dtos/user.dto");

router.get('/me', authenticateMiddleware, usersController.getMe);
router.get('/', authenticateMiddleware, usersController.getAllUsers);
router.patch('/me', authenticateMiddleware, usersController.updateMe);

router.post('/sign-up', validateWithJoi(userSignUpSchema), usersController.SignUp);
router.post('/sign-in', validateWithJoi(userSignInSchema), usersController.SignIn);

module.exports = router;