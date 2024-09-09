const express = require('express');
const postController = require('../controllers/postController');
const { uploadMiddlewarePosts } = require('../middlewares/fileUploadMiddleware');

const router = express.Router();

router.post('/post', uploadMiddlewarePosts.single('file'), postController.createPost);
router.put('/post/:id', uploadMiddlewarePosts.single('file'), postController.updatePost);
router.get('/posts', postController.getPosts);
router.get('/post/:id', postController.getPost);
router.delete('/post/:id', postController.deletePost);

module.exports = router;
