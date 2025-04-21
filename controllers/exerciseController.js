const queries = require('../queries/exerciseQueries');

exports.createExercise = async (req, res) => {
  try {
    const { title_exercise, type_exercise, id_creator, seconds_inspiration, seconds_apnea, seconds_expiration, number_repetitions } = req.body;

    if (!title_exercise || !type_exercise || !id_creator || !seconds_inspiration || !seconds_apnea || !seconds_expiration || !number_repetitions) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    const exerciseData = { title_exercise, type_exercise, id_creator };
    const breathingData = { seconds_inspiration, seconds_apnea, seconds_expiration, number_repetitions };

    const result = await queries.createExercise(exerciseData, breathingData);
    return res.status(201).json(result);
  } catch (error) {
    console.error('Erreur lors de la création de l\'exercice :', error);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};

exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await queries.getAllExercises();
    return res.status(200).json(exercises);
  } catch (error) {
    console.error('Erreur lors de la récupération des exercices :', error);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};

exports.getExercisesByUser = async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(400).json({ error: 'ID de l\'exercice manquant.' });
      }
      const exercise = await queries.getExercisesByUser(req.params.id);
      if (!exercise) {
        return res.status(404).json({ error: 'Exercice non trouvé.' });
      }
      return res.status(200).json(exercise);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'exercice :', error);
      return res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
  };

exports.getExerciseById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: 'ID de l\'exercice manquant.' });
    }
    const exercise = await queries.getExerciseById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: 'Exercice non trouvé.' });
    }
    return res.status(200).json(exercise);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'exercice :', error);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};

exports.updateExercise = async (req, res) => {
  try {
    const { title_exercise, type_exercise, seconds_inspiration, seconds_apnea, seconds_expiration, number_repetitions } = req.body;

    const exerciseData = { title_exercise, type_exercise };
    const breathingData = { seconds_inspiration, seconds_apnea, seconds_expiration, number_repetitions };

    const updatedExercise = await queries.updateExercise(req.params.id, exerciseData, breathingData);
    return res.status(200).json(updatedExercise);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'exercice :', error);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};

exports.deleteExercise = async (req, res) => {
  try {
    await queries.deleteExercise(req.params.id);
    return res.status(200).json({ message: 'Exercice supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'exercice :', error);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};

exports.addExerciseHistory = async (req, res) => {
  try {
    const { id_exercise, id_user, seconds_exercise } = req.body;

    if (!id_exercise || !id_user || !seconds_exercise) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    const history = await queries.addExerciseHistory({ id_exercise, id_user, seconds_exercise });
    return res.status(201).json(history);
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'historique :', error);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};