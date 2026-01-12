// server.js
const express = require('express');
const bookRoutes = require('./src/presentation/routes/bookRoutes');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/books', bookRoutes);

// Error handling middleware (fallback)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Library Management System running on http://localhost:${PORT}`);
});
