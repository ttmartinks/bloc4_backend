const Users = require('./UsersModel');
const Roles = require('./RolesModel');
const Resources = require('./RessourcesModel');
const UsersFavorites = require('./UsersFavoritesModels');
const Exercises = require('./ExercisesModel');
const BreathingExercises = require('./BreathingExercisesModel');
const HistoricExercises = require('./HistoricExercisesModel');

// Définir les relations entre les modèles si nécessaire
/*
Users.belongsTo(Roles, { foreignKey: 'id_role' });
Resources.belongsTo(Users, { foreignKey: 'id_creator' });
UsersFavorites.belongsTo(Users, { foreignKey: 'id_user' });
UsersFavorites.belongsTo(Resources, { foreignKey: 'id_related_item', constraints: false });
UsersFavorites.belongsTo(Exercises, { foreignKey: 'id_related_item', constraints: false });
Exercises.belongsTo(Users, { foreignKey: 'id_creator' });
BreathingExercises.belongsTo(Exercises, { foreignKey: 'id_exercise' });
HistoricExercises.belongsTo(Users, { foreignKey: 'id_user' });
HistoricExercises.belongsTo(Exercises, { foreignKey: 'id_exercise' });
*/

module.exports = {
  Users,
  Roles,
  Resources,
  UsersFavorites,
  Exercises,
  BreathingExercises,
  HistoricExercises,
};