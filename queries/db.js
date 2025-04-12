const { sequelize } = require('../config/db');
require('../models'); 

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('✅ Connexion à Postgres Azure réussie et tables synchronisées !');
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };