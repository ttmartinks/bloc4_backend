const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const UsersFavorites = sequelize.define('UsersFavorites', {
  id_favorite: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_related_item: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type_favorite: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'users_favorites',
  timestamps: false,
});

module.exports = UsersFavorites;