// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // ✅ มีแค่ครั้งเดียว

// 1️⃣ สร้าง app
const app = express();

// 2️⃣ Database (Railway Postgres)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// 3️⃣ Middleware
app.use(cors());
app.use(express.json());

// 4️⃣ Health check
app.get('/', (req, res) => {
  res.send('TaskBoard API is running 🚀');
});

// ============================================
// Task API Routes
// ============================================

// GET tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id');
    res.json(result.rows); // ⭐ ต้องเป็น array
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST task
app.post('/api/tasks', async (req, res) => {
  try {
    const { title } = req.body;

    const result = await pool.query(
      `INSERT INTO tasks (title, status, priority)
       VALUES ($1, 'TODO', 'MEDIUM')
       RETURNING *`,
      [title]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// PUT update task status
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE tasks SET status=$1, updated_at=NOW()
       WHERE id=$2 RETURNING *`,
      [status, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// 5️⃣ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Delete failed' });
  }
});
