const { sequelize } = require('../config/db');
require('../models'); 

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('✅ Connexion à Neon DB réussie et tables synchronisées !');
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error.message);
    throw error; // On throw au lieu de process.exit pour permettre au serveur de continuerOn throw au lieu de process.exit pour permettre au serveur de continuer
  }
};

module.exports = { connectDB };