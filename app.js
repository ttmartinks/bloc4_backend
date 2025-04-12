const express = require('express');
const cors = require('cors');

require('dotenv').config(); 
const routes = require('./routes/indexRoutes');

const app = express();
app.use(express.json());


app.use(cors({
    origin: '*', // Autoriser uniquement le frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Autoriser le frontend
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Méthodes autorisées
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // En-têtes autorisés
    next();
});

routes(app);

module.exports = app;
