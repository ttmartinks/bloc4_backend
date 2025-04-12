const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const HistoricExercises = sequelize.define('HistoricExercises', {
  id_history: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_exercise: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  seconds_exercise: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date_historic: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'historic_exercises',
  timestamps: false,
});

module.exports = HistoricExercises;