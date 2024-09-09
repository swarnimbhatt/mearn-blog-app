const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
// const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/../uploads'));

// Routes
app.use(authRoutes);
app.use(postRoutes);
// app.use(userRoutes);

module.exports = app;
