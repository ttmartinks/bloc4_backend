require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./queries/db');  
const app = require('./app');

app.use(cors());
app.use(express.json());

// Port configurable depuis .env sinon fallback à 3000
const PORT = process.env.PORT || 3000;

// ✅ LANCER LE SERVEUR D'ABORD (pour éviter le timeout)
const server = app.listen(PORT, () => {
  console.log(`🚀 Serveur backend lancé sur le port ${PORT}`);
});

// ✅ PUIS CONNECTER LA DB EN ARRIÈRE-PLAN
db.connectDB().then(() => {
  console.log('✅ Base de données connectée');
}).catch((error) => {
  console.error('❌ Erreur de connexion à la base :', error.message);
  // Le serveur continue de tourner même si la DB échoue
});

// Gestion propre de l'arrêt
process.on('SIGTERM', () => {
  console.log('🛑 Arrêt du serveur...');
  server.close(() => {
    console.log('✅ Serveur arrêté proprement');
  });
});