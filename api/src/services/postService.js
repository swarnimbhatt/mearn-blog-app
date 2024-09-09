const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');

exports.createPost = async (postData, authorId, filePath) => {
  const { title, summary, content } = postData;

  const newPost = await Post.create({
    title,
    summary,
    content,
    cover: filePath,
    author: authorId,
  });

  return newPost;
};

exports.updatePost = async (postId, updatedData, authorId, newFilePath) => {
  const postDoc = await Post.findById(postId);
  if (!postDoc || String(postDoc.author) !== String(authorId)) {
    throw new Error("You are not the author of this post.");
  }

  // Delete old cover image if it's being replaced
  if (newFilePath && postDoc.cover) {
    fs.unlinkSync(postDoc.cover);
  }

  // Update post fields
  postDoc.title = updatedData.title || postDoc.title;
  postDoc.summary = updatedData.summary || postDoc.summary;
  postDoc.content = updatedData.content || postDoc.content;
  if (newFilePath) postDoc.cover = newFilePath;

  await postDoc.save();
  return postDoc;
};

exports.deletePost = async (postId, authorId) => {
  const postDoc = await Post.findById(postId);
  if (!postDoc || String(postDoc.author) !== String(authorId)) {
    throw new Error("You are not the author of this post.");
  }

  // Delete post and cover image
  if (postDoc.cover) {
    fs.unlinkSync(postDoc.cover);
  }

  await postDoc.deleteOne();
};

exports.getAllPosts = async () => {
  return await Post.find().populate('author', ['username']).sort({ createdAt: -1 }).limit(20);
};

exports.getPostById = async (postId) => {
  return await Post.findById(postId).populate('author', ['username']);
};
