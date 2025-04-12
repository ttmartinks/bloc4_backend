const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Exercises = sequelize.define('Exercises', {
  id_exercise: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_creator: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title_exercise: {
    type: DataTypes.STRING,
  },
  type_exercise: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date_exercise: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'exercises',
  timestamps: false,
});

module.exports = Exercises;