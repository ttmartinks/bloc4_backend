const { Exercises, BreathingExercises } = require('../models');

// Créer un exercice avec ses détails de respiration
exports.createExercise = async (exerciseData, breathingData) => {
  const transaction = await Exercises.sequelize.transaction();
  try {
    // Insérer l'exercice principal
    const exercise = await Exercises.create(exerciseData, { transaction });

    // Ajouter l'ID de l'exercice dans les données de respiration
    breathingData.id_exercise = exercise.id_exercise;

    // Insérer les détails de respiration
    await BreathingExercises.create(breathingData, { transaction });

    await transaction.commit();
    return exercise;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// Récupérer tous les exercices avec leurs détails de respiration
exports.getAllExercises = async () => {
  return await BreathingExercises.findAll();
};

// Récupérer un exercice par ID avec ses détails de respiration
exports.getExerciseById = async (id) => {
  return await Exercises.findByPk(id, {
    include: [
      {
        model: BreathingExercises,
        as: 'breathingDetails',
      },
    ],
  });
};

// Mettre à jour un exercice et ses détails de respiration
exports.updateExercise = async (id, exerciseData, breathingData) => {
  const transaction = await Exercises.sequelize.transaction();
  try {
    // Mettre à jour l'exercice principal
    const exercise = await Exercises.findByPk(id);
    if (!exercise) throw new Error('Exercice non trouvé');
    await exercise.update(exerciseData, { transaction });

    // Mettre à jour les détails de respiration
    const breathingExercise = await BreathingExercises.findOne({ where: { id_exercise: id } });
    if (!breathingExercise) throw new Error('Détails de respiration non trouvés');
    await breathingExercise.update(breathingData, { transaction });

    await transaction.commit();
    return exercise;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// Supprimer un exercice et ses détails de respiration
exports.deleteExercise = async (id) => {
  const transaction = await Exercises.sequelize.transaction();
  try {
    // Supprimer les détails de respiration
    await BreathingExercises.destroy({ where: { id_exercise: id }, transaction });

    // Supprimer l'exercice principal
    await Exercises.destroy({ where: { id_exercise: id }, transaction });

    await transaction.commit();
    return true;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};