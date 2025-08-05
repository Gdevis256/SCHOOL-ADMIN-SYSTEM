const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');
const db = require('../config/db');

// Multer config
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `avatar_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// Route: Update profile avatar
router.post('/avatar', authenticateToken, upload.single('avatar'), (req, res) => {
  const userId = req.user.id;
  const avatarPath = `/uploads/${req.file.filename}`;

  db.query('UPDATE users SET avatar = ? WHERE id = ?', [avatarPath, userId], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Avatar updated', avatar: avatarPath });
  });
});

module.exports = router; 
