const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/User');
const sequelize = require('../database');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

router.post('/register', async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: `Error registering user  ${err}` });
  }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
  

      const data = { token, email };
    
      res.json({ data });
    } catch (err) {
      res.status(500).json({ message: `Error logging in ${err}` });
    }
  });
  
    // Protected route that requires authentication
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: "User loggedIn successfully", email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});


module.exports = router;
