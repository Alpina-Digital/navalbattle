// src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const config = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const authMiddleware = require('./middlewares/auth');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Database connection
const sequelize = new Sequelize(config.development);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('📦 Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('❌ Não foi possível conectar ao banco de dados:', error);
  }
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use('/api/auth', authRoutes);

// Protected route example
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ 
    message: 'Esta é uma rota protegida',
    userId: req.userId 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Server initialization
app.listen(port, async () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
  await testConnection();
});

module.exports = app;