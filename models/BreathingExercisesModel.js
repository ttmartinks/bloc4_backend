const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const BreathingExercises = sequelize.define('BreathingExercises', {
  id_breathing_exercise: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_exercise: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  seconds_inspiration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  seconds_apnea: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  seconds_expiration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  number_repetitions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'breathing_exercises',
  timestamps: false,
});

module.exports = BreathingExercises;