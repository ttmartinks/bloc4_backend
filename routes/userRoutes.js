const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Définition des routes en utilisant les fonctions du contrôleur
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;