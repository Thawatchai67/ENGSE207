const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./library.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            author TEXT,
            isbn TEXT,
            borrowed INTEGER DEFAULT 0
        )
    `);
});

module.exports = db;
