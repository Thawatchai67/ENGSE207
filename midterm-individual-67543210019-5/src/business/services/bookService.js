const db = require('../../../database');

class BookRepository {

    // ดึงหนังสือทั้งหมด
    findAll(status = null) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM books";
            const params = [];
            if (status) {
                sql += " WHERE borrowed = ?";
                params.push(status === 'available' ? 0 : 1);
            }
            db.all(sql, params, (err, rows) => {
                if (err) return reject(err);
                // แปลง borrowed เป็น status
                const books = rows.map(b => ({
                    id: b.id,
                    title: b.title,
                    author: b.author,
                    isbn: b.isbn,
                    status: b.borrowed ? 'borrowed' : 'available'
                }));
                resolve(books);
            });
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM books WHERE id = ?", [id], (err, row) => {
                if (err) return reject(err);
                if (!row) return resolve(null);
                resolve({
                    id: row.id,
                    title: row.title,
                    author: row.author,
                    isbn: row.isbn,
                    status: row.borrowed ? 'borrowed' : 'available'
                });
            });
        });
    }

    create({ title, author, isbn }) {
        return new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO books (title, author, isbn) VALUES (?, ?, ?)",
                [title, author, isbn],
                function (err) {
                    if (err) return reject(err);
                    resolve({
                        id: this.lastID,
                        title,
                        author,
                        isbn,
                        status: 'available'
                    });
                }
            );
        });
    }

    update(id, { borrowed }) {
        return new Promise((resolve, reject) => {
            db.run(
                "UPDATE books SET borrowed = ? WHERE id = ?",
                [borrowed ? 1 : 0, id],
                function (err) {
                    if (err) return reject(err);
                    resolve({ id, borrowed });
                }
            );
        });
    }

    updateStatus(id, status) {
        const borrowed = status === 'borrowed' ? 1 : 0;
        return new Promise((resolve, reject) => {
            db.run(
                "UPDATE books SET borrowed = ? WHERE id = ?",
                [borrowed, id],
                function (err) {
                    if (err) return reject(err);
                    resolve({ id, status });
                }
            );
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM books WHERE id = ?", [id], function (err) {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}

module.exports = new BookRepository();
