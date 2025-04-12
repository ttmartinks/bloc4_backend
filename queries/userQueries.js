const { Users } = require('../models');

exports.createUser = async (data) => {
  return await Users.create(data);
};

exports.getAllUsers = async () => {
  return await Users.findAll();
};

exports.getUserById = async (id) => {
  return await Users.findByPk(id);
};

exports.updateUser = async (id, data) => {
  const user = await Users.findByPk(id);
  if (!user) return null;
  user.username = data.username ?? user.username;
  user.email = data.email ?? user.email;
  user.password = data.password ?? user.password;
  await user.save();
  return user;
};

exports.deleteUser = async (id) => {
  const user = await Users.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return user;
};