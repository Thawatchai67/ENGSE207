const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());
app.use(express.static('public'));

const db = new sqlite3.Database('./database/tasks.db');

/* =====================
   GET all tasks
===================== */
app.get('/api/tasks', (req, res) => {
    db.all('SELECT * FROM tasks ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

/* =====================
   POST create task
===================== */
app.post('/api/tasks', (req, res) => {
    const {
        title,
        description = '',
        status = 'TODO',
        priority = 'MEDIUM'
    } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'title is required' });
    }

    db.run(
        `INSERT INTO tasks (title, description, status, priority)
         VALUES (?, ?, ?, ?)`,
        [title, description, status, priority],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID });
        }
    );
});

/* =====================
   PUT update task
===================== */
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;

    db.run(
        `UPDATE tasks
         SET title = ?,
             description = ?,
             status = ?,
             priority = ?,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [title, description, status, priority, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ updated: this.changes });
        }
    );
});

/* =====================
   DELETE task
===================== */
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;

    db.run(
        'DELETE FROM tasks WHERE id = ?',
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ deleted: this.changes });
        }
    );
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
