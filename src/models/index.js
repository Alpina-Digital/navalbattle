// src/models/index.js
const Sequelize = require('sequelize');
const config = require('../config/database');
const User = require('./User');

const sequelize = new Sequelize(config.development);

// Inicializa os modelos
User.init(sequelize);

// Criar associações entre modelos (se houver)
// User.associate(sequelize.models);

module.exports = {
  sequelize,
  Sequelize,
  User
};