const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all teachers
router.get('/', (req, res) => {
  db.query('SELECT * FROM teachers', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch teachers' });
    res.json(results);
  });
});

// Add a new teacher
router.post('/', (req, res) => {
  const { name, email, subject } = req.body;
  db.query(
    'INSERT INTO teachers (name, email, subject) VALUES (?, ?, ?)',
    [name, email, subject],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to add teacher' });
      res.json({ id: result.insertId, name, email, subject });
    }
  );
});

// Update teacher info
router.put('/:id', (req, res) => {
  const { name, email, subject } = req.body;
  db.query(
    'UPDATE teachers SET name = ?, email = ?, subject = ? WHERE id = ?',
    [name, email, subject, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Failed to update teacher' });
      res.json({ message: 'Teacher updated' });
    }
  );
});

// Delete teacher
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM teachers WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to delete teacher' });
    res.json({ message: 'Teacher deleted' });
  });
});

module.exports = router;
