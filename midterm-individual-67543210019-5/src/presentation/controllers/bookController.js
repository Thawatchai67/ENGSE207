// src/presentation/controllers/bookController.js
const bookService = require('../../business/services/bookService');

class BookController {

    async getAllBooks(req, res) {
        const { status } = req.query;
        bookService.getAllBooks(status)
            .then(result => res.json(result))
            .catch(err => res.status(500).json({ error: err.message }));
    }

    async getBookById(req, res) {
        const { id } = req.params;
        bookService.getBookById(id)
            .then(book => {
                if (!book) return res.status(404).json({ error: "ไม่พบหนังสือ" });
                res.json(book);
            })
            .catch(err => res.status(500).json({ error: err.message }));
    }

    async createBook(req, res) {
        const bookData = req.body;
        bookService.createBook(bookData)
            .then(book => res.status(201).json(book))
            .catch(err => res.status(400).json({ error: err.message }));
    }

    async updateBook(req, res) {
        const { id } = req.params;
        const updateData = req.body;
        bookService.updateBook(id, updateData)
            .then(book => res.json(book))
            .catch(err => res.status(400).json({ error: err.message }));
    }

    async borrowBook(req, res) {
        const { id } = req.params;
        bookService.borrowBook(id)
            .then(book => res.json(book))
            .catch(err => res.status(400).json({ error: err.message }));
    }

    async returnBook(req, res) {
        const { id } = req.params;
        bookService.returnBook(id)
            .then(book => res.json(book))
            .catch(err => res.status(400).json({ error: err.message }));
    }

    async deleteBook(req, res) {
        const { id } = req.params;
        bookService.deleteBook(id)
            .then(result => res.json({ message: "ลบหนังสือเรียบร้อย" }))
            .catch(err => res.status(400).json({ error: err.message }));
    }
}

module.exports = new BookController();
