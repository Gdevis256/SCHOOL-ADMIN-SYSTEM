const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const queries = [
      'SELECT COUNT(*) AS classCount FROM classes',
      'SELECT COUNT(*) AS subjectCount FROM subjects',
      'SELECT COUNT(*) AS teacherCount FROM teachers',
      'SELECT COUNT(*) AS noticeCount FROM notices'
    ];

    const results = await Promise.all(
      queries.map(
        (q) =>
          new Promise((resolve, reject) => {
            db.query(q, (err, result) => {
              if (err) return reject(err);
              resolve(result[0]);
            });
          })
      )
    );

    res.json({
      classes: results[0].classCount,
      subjects: results[1].subjectCount,
      teachers: results[2].teacherCount,
      notices: results[3].noticeCount,
    });
  } catch (err) {
    console.error('Dashboard fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

module.exports = router;
