const express = require('express');
const router = express.Router();
const db = require('../../../database'); // ปรับ path ให้ตรงกับ database.js

// GET all books
router.get('/', (req, res, next) => {
    db.all('SELECT * FROM books', [], (err, rows) => {
        if (err) return next(err);
        const books = rows.map(r => ({ ...r, borrowed: !!r.borrowed }));
        res.json(books);
    });
});

// GET book by ID
router.get('/:id', (req, res, next) => {
    db.get('SELECT * FROM books WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return next(err);
        if (!row) return res.status(404).json({ message: 'Book not found' });
        res.json({ ...row, borrowed: !!row.borrowed });
    });
});

// POST add book
router.post('/', (req, res, next) => {
    const { title, author, isbn } = req.body;
    db.run(
        'INSERT INTO books (title, author, isbn) VALUES (?, ?, ?)',
        [title, author, isbn],
        function (err) {
            if (err) return next(err);
            res.status(201).json({ id: this.lastID, title, author, isbn, borrowed: false });
        }
    );
});

// PUT update book (รวม toggle borrowed)
router.put('/:id', (req, res, next) => {
    const { title, author, isbn, borrowed } = req.body;
    db.run(
        'UPDATE books SET title = COALESCE(?, title), author = COALESCE(?, author), isbn = COALESCE(?, isbn), borrowed = COALESCE(?, borrowed) WHERE id = ?',
        [title, author, isbn, borrowed ? 1 : 0, req.params.id],
        function (err) {
            if (err) return next(err);
            res.json({ id: req.params.id, title, author, isbn, borrowed: !!borrowed });
        }
    );
});

// PATCH borrow book
router.patch('/:id/borrow', (req, res, next) => {
    db.run('UPDATE books SET borrowed = 1 WHERE id = ?', [req.params.id], function (err) {
        if (err) return next(err);
        res.json({ id: req.params.id, borrowed: true });
    });
});

// PATCH return book
router.patch('/:id/return', (req, res, next) => {
    db.run('UPDATE books SET borrowed = 0 WHERE id = ?', [req.params.id], function (err) {
        if (err) return next(err);
        res.json({ id: req.params.id, borrowed: false });
    });
});

// DELETE book
router.delete('/:id', (req, res, next) => {
    db.run('DELETE FROM books WHERE id = ?', [req.params.id], function (err) {
        if (err) return next(err);
        res.json({ id: req.params.id });
    });
});

module.exports = router;
