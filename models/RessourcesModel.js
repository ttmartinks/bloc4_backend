const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Resources = sequelize.define('Resources', {
  id_ressource: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_creator: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title_ressource: {
    type: DataTypes.STRING,
  },
  content_ressource: {
    type: DataTypes.TEXT,
  },
  date_ressource: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'resources',
  timestamps: false,
});

module.exports = Resources;