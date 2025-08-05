const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const classRoutes = require('./routes/classes');
const subjectsRoute = require('./routes/subjects');
const teacherRoutes = require('./routes/teachers');
const studentsRoute = require('./routes/students');
const noticesRoute = require('./routes/notices');
const profileRoutes = require('./routes/profile');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/subjects', subjectsRoute);
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentsRoute);
app.use('/api/notices', noticesRoute);
app.use('/api/profile', profileRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
