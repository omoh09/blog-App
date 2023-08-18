const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');

router.use(express.json());

// Validate schema for a post
const postSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(3).required()
});

// Get all posts
router.get('/', authMiddleware,async (req, res) => {
  try {
    const posts = await Post.findAll();
    const data = { posts }
    res.json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a specific post by ID
router.get('/:id', authMiddleware, async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      res.json(post);
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new post
router.post('/', authMiddleware, async (req, res) => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(100).required(),
      content: Joi.string().min(10).required()
    });
  
    const { error } = schema.validate(req.body);
  
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    const { title, content } = req.body;
  
    try {
      const newPost = await Post.create({ title, content });
      res.status(201).json(newPost);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Update a post by ID
router.put('/:id',authMiddleware, async (req, res) => {
    const postId = parseInt(req.params.id);
  
    const schema = Joi.object({
      title: Joi.string().min(3).max(30),
      content: Joi.string().min(3),
    });
  
    const { error } = schema.validate(req.body);
  
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    try {
      const post = await Post.findByPk(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const { title, content } = req.body;
  
      // Update the post
      await post.update({ title, content });
  
      res.json({ message: 'Post updated successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  

// Delete a post by ID
router.delete('/:id', authMiddleware, async (req, res) => {
    const postId = req.params.id;
  
    try {
      const post = await Post.findByPk(postId);
      
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      await post.destroy();
      
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
