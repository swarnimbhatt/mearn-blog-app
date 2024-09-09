const postService = require('../services/postService');
const fileService = require('../services/fileService');
const authService = require('../services/authService');

exports.createPost = async (req, resp) => {
  const { token } = req.cookies;
  if (!token) return resp.status(401).json("Unauthorized access denied");

  try {
    const userInfo = await authService.verifyToken(token);

    // Process the uploaded file
    const { originalname, path } = req.file;
    const newFilePath = fileService.renameUploadedFile(path, originalname);

    // Create the post
    const postDoc = await postService.createPost(req.body, userInfo.id, newFilePath);
    resp.json(postDoc);
  } catch (err) {
    resp.status(400).json(err.message);
  }
};

exports.updatePost = async (req, resp) => {
  const { token } = req.cookies;
  const { id } = req.params;
  
  if (!token) return resp.status(401).json("Unauthorized access denied");

  try {
    const userInfo = await authService.verifyToken(token);

    // Process new file if uploaded
    let newFilePath;
    if (req.file) {
      const { originalname, path } = req.file;
      newFilePath = fileService.renameUploadedFile(path, originalname);
    }

    // Update the post
    const updatedPost = await postService.updatePost(id, req.body, userInfo.id, newFilePath);
    resp.json(updatedPost);
  } catch (err) {
    resp.status(400).json(err.message);
  }
};

exports.deletePost = async (req, resp) => {
  const { token } = req.cookies;
  const { id } = req.params;

  if (!token) return resp.status(401).json("Unauthorized access denied");

  try {
    const userInfo = await authService.verifyToken(token);

    // Delete the post
    await postService.deletePost(id, userInfo.id);
    resp.json("Post deleted");
  } catch (err) {
    resp.status(400).json(err.message);
  }
};

exports.getAllPosts = async (req, resp) => {
  try {
    const posts = await postService.getAllPosts();
    resp.json(posts);
  } catch (err) {
    resp.status(400).json(err.message);
  }
};

exports.getPostById = async (req, resp) => {
  const { id } = req.params;

  try {
    const post = await postService.getPostById(id);
    resp.json(post);
  } catch (err) {
    resp.status(400).json(err.message);
  }
};
