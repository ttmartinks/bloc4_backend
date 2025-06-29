require('dotenv').config();
const { Sequelize } = require('sequelize');

// Utilisation de l'URL complète Aiven
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // Désactive les logs SQL en production
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Nécessaire pour Aiven
    }
  },
  pool: {
    max: 20, // Limite de connexion Aiven
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = { sequelize };