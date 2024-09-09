const multer = require("multer");

// Middleware for handling file uploads for posts
const uploadMiddlewarePosts = multer({ dest: "uploads/posts/" });

// Middleware for handling file uploads for users
const uploadMiddlewareUsers = multer({ dest: "uploads/users/" });

module.exports = {
  uploadMiddlewarePosts,
  uploadMiddlewareUsers,
};
