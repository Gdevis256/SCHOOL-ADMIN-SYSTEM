const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create a new notice
router.post('/', (req, res) => {
  const { title, message, date } = req.body;
  db.query(
    'INSERT INTO notices (title, message, date) VALUES (?, ?, ?)',
    [title, message, date],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId, title, message, date });
    }
  );
});

// Get all notices
router.get('/', (req, res) => {
  db.query('SELECT * FROM notices ORDER BY date DESC', (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
});

// Update a notice
router.put('/:id', (req, res) => {
  const { title, message, date } = req.body;
  db.query(
    'UPDATE notices SET title = ?, message = ?, date = ? WHERE id = ?',
    [title, message, date, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ id: req.params.id, title, message, date });
    }
  );
});

// Delete a notice
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM notices WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: 'Notice deleted' });
  });
});

module.exports = router;
