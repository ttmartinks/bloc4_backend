const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Roles = sequelize.define('Roles', {
  id_role: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role_content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'roles',
  timestamps: false,
});

module.exports = Roles;