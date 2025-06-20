const { Exercises, BreathingExercises, HistoricExercises } = require('../models');

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
    return { exercise, breathingData };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// Récupérer tous les exercices avec leurs détails de respiration
exports.getAllExercises = async () => {
  try {
    const exercises = await Exercises.findAll();
    const breathingDetails = await BreathingExercises.findAll();

    // Associer les détails de respiration aux exercices
    const result = exercises.map((exercise) => {
      const breathing = breathingDetails.find(
        (b) => b.id_exercise === exercise.id_exercise
      );
      return { ...exercise.toJSON(), breathingDetails: breathing || null };
    });

    return result;
  } catch (error) {
    throw error;
  }
};

// Récupérer un exercice par ID avec ses détails de respiration
exports.getExerciseById = async (id) => {
  try {
    const exercise = await Exercises.findByPk(id);
    if (!exercise) return null;

    const breathingDetails = await BreathingExercises.findOne({
      where: { id_exercise: id },
    });

    return { ...exercise.toJSON(), breathingDetails };
  } catch (error) {
    throw error;
  }
};

// Récupérer un exercice par ID avec ses détails de respiration
exports.getExercisesByUser = async (id) => {
  try {
    const exercises = await Exercises.findAll({
      where: { id_creator: id }, // Filtrer par l'ID de l'utilisateur
    });
    const breathingDetails = await BreathingExercises.findAll();

    // Associer les détails de respiration aux exercices
    const result = exercises.map((exercise) => {
      const breathing = breathingDetails.find(
        (b) => b.id_exercise === exercise.id_exercise
      );
      return { ...exercise.toJSON(), breathingDetails: breathing || null };
    });

    return result;
  } catch (error) {
    console.error('Erreur lors de la récupération des exercices par utilisateur :', error);
    throw error;
  }
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
    const breathingExercise = await BreathingExercises.findOne({
      where: { id_exercise: id },
    });
    if (!breathingExercise) throw new Error('Détails de respiration non trouvés');
    await breathingExercise.update(breathingData, { transaction });

    await transaction.commit();
    return { exercise, breathingData };
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


exports.addExerciseHistory = async (data) => {
  return await HistoricExercises.create(data);
};


exports.getAllHistoriesForUser = async (id_user) => {
  try {
    return await HistoricExercises.findAll({
      where: { id_user },
      order: [['date_historic', 'DESC']],
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des historiques :', error);
    throw error;
  }
};