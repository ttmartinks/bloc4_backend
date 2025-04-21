const express = require('express');
const router = express.Router();
const ressourceController = require('../controllers/ressourceController');

// Routes pour les ressources
router.post('/', ressourceController.createRessource);
router.get('/', ressourceController.getAllRessources);
router.get('/user/:id', ressourceController.getRessourcesByUser);
router.get('/:id', ressourceController.getRessourceById);
router.put('/:id', ressourceController.updateRessource);
router.delete('/:id', ressourceController.deleteRessource);

module.exports = router;