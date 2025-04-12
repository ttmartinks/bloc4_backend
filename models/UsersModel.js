const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Users = sequelize.define('Users', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email_user: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  age_user: {
    type: DataTypes.INTEGER,
  },
  pseudo_user: {
    type: DataTypes.STRING,
    unique: true,
  },
  password_user: {
    type: DataTypes.STRING,
  },
  id_role: {
    type: DataTypes.INTEGER,
  },
  is_activ: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  date_signup: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = Users;