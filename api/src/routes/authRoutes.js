const express = require('express');
const authController = require('../controllers/authController');
const { uploadMiddlewareUsers } = require('../middlewares/fileUploadMiddleware');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', uploadMiddlewareUsers.single('file'), authController.register);
router.get('/profile', authController.profile);
router.post('/logout', authController.logout);

module.exports = router;
