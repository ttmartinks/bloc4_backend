const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

// Routes pour les exercices
router.post('/', exerciseController.createExercise);
router.get('/', exerciseController.getAllExercises);
router.get('/:id', exerciseController.getExerciseById);
router.get('/user/:id', exerciseController.getExercisesByUser); 
router.put('/:id', exerciseController.updateExercise);
router.delete('/:id', exerciseController.deleteExercise);
router.post('/history', exerciseController.addExerciseHistory);

module.exports = router;