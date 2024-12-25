const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config');
const authRoutes= require('./routes/users.routes');
const { protect } = require('./middlewares/protected');
const userRoutes= require('./routes/users.routes');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors({
    origin: "*", // Replace with the frontend's origin
  }));
// Middleware
app.use(express.json()); // For parsing JSON requests

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);

// Example protected route
// app.get('/api/protected', protect, (req, res) => {
//   res.json({ message: 'You are authorized', userId: req.user });
// });
app.get('/api/protected', protect,authRoutes);
  

module.exports = app;
