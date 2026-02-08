/**
 * @swagger
 * /books:
 * get:
 * summary: Liste des livres
 * tags: [Books]
 * responses:
 * 200:
 * description: OK
 */
const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books.controller");
const validateWithJoi = require("../middlewares/validateData.middleware");
const { bookCreateSchema, bookUpdateSchema } = require("../dtos/book.dto");
const authenticateMiddleware = require("../middlewares/authenticate.middleware");

router.post('/', authenticateMiddleware, validateWithJoi(bookCreateSchema), booksController.createBook);
router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);
router.patch('/:id', authenticateMiddleware, validateWithJoi(bookUpdateSchema), booksController.updateBook);
router.delete('/:id', authenticateMiddleware, booksController.deleteBook);
module.exports = router;

