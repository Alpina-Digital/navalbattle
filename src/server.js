// src/server.js
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const config = require('./config/database');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Teste de conexão com o banco
const sequelize = new Sequelize(config.development);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('📦 Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('❌ Não foi possível conectar ao banco de dados:', error);
  }
}

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'Battleship Game API' });
});

// Inicialização do servidor
app.listen(port, async () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
  await testConnection();
});