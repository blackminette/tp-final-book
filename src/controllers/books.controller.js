const booksService = require("../services/books.service");

exports.createBook = async (req, res) => {
    const { title, description, author, year, genre, isbn } = req.body;
    const userId = req.user.id;
    const result = await booksService.createBook({ title, description, author, year, genre, isbn }, userId);
    return res.status(result.statusCode).json(result);
};

exports.getAllBooks = async (_req, res) => {
    const result = await booksService.getAllBooks();
    return res.status(result.statusCode).json(result);
};

exports.getBookById = async (req, res) => {
    const { id } = req.params;
    const result = await booksService.getBookById(id);
    return res.status(result.statusCode).json(result);
};

exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, description, author, year, genre, isbn } = req.body;
    const userId = req.user.id;
    const result = await booksService.updateBook(id, { title, description, author, year, genre, isbn }, userId);
    return res.status(result.statusCode).json(result);
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const result = await booksService.deleteBook(id, userId);
    return res.status(result.statusCode).json(result);
};