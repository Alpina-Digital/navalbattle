// src/controllers/AuthController.js
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User } = require('../models');
const authConfig = require('../config/auth');

class AuthController {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      // Check if user already exists
      const userExists = await User.findOne({
        where: {
          [Op.or]: [{ email }, { username }]
        }
      });

      if (userExists) {
        return res.status(400).json({
          error: 'User already exists with this email or username'
        });
      }

      // Create user
      const user = await User.create({
        username,
        email,
        password
      });

      // Generate token
      const token = jwt.sign({ id: user.id }, authConfig.jwt.secret, {
        expiresIn: authConfig.jwt.expiresIn,
      });

      return res.status(201).json({
        user,
        token,
      });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(400).json({
        error: error.message || 'Registration failed'
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email }
      });

      if (!user) {
        return res.status(401).json({
          error: 'User not found'
        });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({
          error: 'Invalid password'
        });
      }

      const token = jwt.sign({ id: user.id }, authConfig.jwt.secret, {
        expiresIn: authConfig.jwt.expiresIn,
      });

      return res.json({
        user,
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(400).json({
        error: error.message || 'Authentication failed'
      });
    }
  }
}

module.exports = new AuthController();