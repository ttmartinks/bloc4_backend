require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./queries/db');  
const app = require('./app');

app.use(cors());
app.use(express.json());

// Port configurable depuis .env sinon fallback à 3000
const PORT = process.env.PORT || 3000;

// Connexion DB + lancement du serveur
db.connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur backend lancé sur le port ${PORT}`);
  });
}).catch((error) => {
  console.error('❌ Erreur de connexion à la base :', error);
  process.exit(1);
});