
// src/routes/auth.routes.js
const { Router } = require('express');
const AuthController = require('../controllers/AuthController');
const { celebrate, Segments, Joi } = require('celebrate');

const routes = Router();

routes.post('/register',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required().min(3).max(30),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(30),
    }),
  }),
  AuthController.register
);

routes.post('/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  AuthController.login
);

module.exports = routes;