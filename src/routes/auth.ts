import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User';

const router = express.Router();

// User Signup
router.post('/signup',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    // Validate input data
    // Hash password
    // Create user in the database
    // Generate and send JWT token
  }
);

// User Login
router.post('/login',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    // Validate input data
    // Check if user exists
    // Compare password
    // Generate and send JWT token
  }
);

// Profile CRUD

// Create profile (Assuming authentication middleware)
router.post('/profile', async (req: Request, res: Response) => {
  // Create user profile
});

// Read profile
router.get('/profile/:id', async (req: Request, res: Response) => {
  // Fetch user profile
});

// Update profile
router.put('/profile/:id', async (req: Request, res: Response) => {
  // Update user profile
});

// Delete profile
router.delete('/profile/:id', async (req: Request, res: Response) => {
  // Delete user profile
});

export default router;
