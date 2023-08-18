import { Request, Response, Router } from 'express';
import Joi from 'joi';
import { Post } from '../models/Post';

const router = Router();

// Get all posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single post by id
router.get('/:id', async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: 'Resource not found', status: '404' });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new post
router.post('/', async (req: Request, res: Response) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    content: Joi.string().min(3).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { title, content } = req.body;

  try {
    const newPost = await Post.create({ title, content });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a post by id
router.delete('/:id', async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);

  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    await post.destroy();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the post' });
  }
});

// Update a post by id
router.put('/:id', async (req: Request, res: Response) => {
    const postId = parseInt(req.params.id);
  
    const schema = Joi.object({
      title: Joi.string().min(3).max(30),
      content: Joi.string().min(3),
    });
  
    const { error } = schema.validate(req.body);
  
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  
    const { title, content } = req.body;
  
    try {
      const post = await Post.findByPk(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Resource not found' });
      }
  
      await post.update({
        title: title || post.title,
        content: content || post.content,
      });
  
      res.json({ message: 'Post updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while updating the post' });
    }
  });

export default router;
