const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all students
router.get('/', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add new student
router.post('/', (req, res) => {
  const { name, email, className } = req.body;
  db.query('INSERT INTO students (name, email, className) VALUES (?, ?, ?)', [name, email, className], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, name, email, className });
  });
});

// Update student
router.put('/:id', (req, res) => {
  const { name, email, className } = req.body;
  db.query('UPDATE students SET name=?, email=?, className=? WHERE id=?', [name, email, className, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: req.params.id, name, email, className });
  });
});

// Delete student
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM students WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

module.exports = router;
