const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

router.get('/', (req, res) => {
  db.query('SELECT * FROM classes', (err, results) => {
    if (err) {
      console.error('Error fetching classes:', err);
      return res.status(500).json({ error: 'Failed to fetch classes' });
    }
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { name, section } = req.body;
  if (!name || !section) {
    return res.status(400).json({ error: 'Missing name or section' });
  }
  db.query('INSERT INTO classes (name, section) VALUES (?, ?)', [name, section], (err, result) => {
    if (err) {
      console.error('Error adding class:', err);
      return res.status(500).json({ error: 'Failed to add class' });
    }
    res.status(201).json({ id: result.insertId, name, section });
  });
});

module.exports = router;
