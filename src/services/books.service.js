const { Book, User } = require("../../models");

// Créer un livre
exports.createBook = async (data, userId) => {
    try {
        const { title, description, author, year, genre, isbn } = data;
        const newBook = await Book.create({
            title,
            description,
            author,
            year,
            genre,
            isbn,
            userId
        });
        return {
            error: false,
            statusCode: 201,
            message: "Le livre a bien été créé.",
            data: newBook,
        };
    } catch (error) {
        console.error("BOOKS::SERVICE::CREATEBOOK -", error);
        return {
            error: true,
            statusCode: 500,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard.",
        };
    }
};

// Lister tous les livres (public)
exports.getAllBooks = async () => {
    try {
        const books = await Book.findAll({
            include: [{ model: User, attributes: ["id", "username"] }],
            order: [["createdAt", "DESC"]],
        });
        return {
            error: false,
            statusCode: 200,
            message: "Les livres ont bien été récupérés.",
            data: books,
        };
    } catch (error) {
        console.error("BOOKS::SERVICE::GETALLBOOKS -", error);
        return {
            error: true,
            statusCode: 500,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard.",
        };
    }
};

// Récupérer un livre par ID
exports.getBookById = async (id) => {
    try {
        const book = await Book.findByPk(id, {
            include: [{ model: User, attributes: ["id", "username"] }],
        });
        if (!book) {
            return {
                error: true,
                statusCode: 404,
                message: "Livre non trouvé.",
            };
        }
        return {
            error: false,
            statusCode: 200,
            message: "Livre récupéré avec succès.",
            data: book,
        };
    } catch (error) {
        console.error("BOOKS::SERVICE::GETBOOKBYID -", error);
        return {
            error: true,
            statusCode: 500,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard.",
        };
    }
};

// Mettre à jour un livre
exports.updateBook = async (id, data, userId) => {
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return {
                error: true,
                statusCode: 404,
                message: "Livre non trouvé.",
            };
        }
        if (book.userId !== userId) {
            return {
                error: true,
                statusCode: 403,
                message: "Non autorisé à modifier ce livre.",
            };
        }
        await book.update(data);
        return {
            error: false,
            statusCode: 200,
            message: "Livre mis à jour avec succès.",
            data: book,
        };
    } catch (error) {
        console.error("BOOKS::SERVICE::UPDATEBOOK -", error);
        return {
            error: true,
            statusCode: 500,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard.",
        };
    }
};

// Supprimer un livre
exports.deleteBook = async (id, userId) => {
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return {
                error: true,
                statusCode: 404,
                message: "Livre non trouvé.",
            };
        }
        if (book.userId !== userId) {
            return {
                error: true,
                statusCode: 403,
                message: "Non autorisé à supprimer ce livre.",
            };
        }
        await book.destroy();
        return {
            error: false,
            statusCode: 200,
            message: "Livre supprimé avec succès.",
        };
    } catch (error) {
        console.error("BOOKS::SERVICE::DELETEBOOK -", error);
        return {
            error: true,
            statusCode: 500,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard.",
        };
    }
};