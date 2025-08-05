const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all subjects
router.get('/', (req, res) => {
  db.query('SELECT * FROM subjects', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch subjects' });
    res.json(results);
  });
});

// Add a new subject
router.post('/', (req, res) => {
  const { name, code } = req.body;
  db.query('INSERT INTO subjects (name, code) VALUES (?, ?)', [name, code], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to add subject' });
    res.json({ id: result.insertId, name, code });
  });
});

// Update a subject
router.put('/:id', (req, res) => {
  const { name, code } = req.body;
  db.query(
    'UPDATE subjects SET name = ?, code = ? WHERE id = ?',
    [name, code, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Failed to update subject' });
      res.json({ message: 'Subject updated' });
    }
  );
});

// Delete a subject
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM subjects WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to delete subject' });
    res.json({ message: 'Subject deleted' });
  });
});

module.exports = router;
