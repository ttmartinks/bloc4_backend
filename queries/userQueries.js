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

exports.getUserByEmail = async (email) => {
    return await Users.findOne({ where: { email_user: email } });
};

exports.updateUser = async (id, data) => {
  const user = await Users.findByPk(id);
  if (!user) return null;
  user.pseudo_user = data.pseudo_user ?? user.pseudo_user;
  user.age_user = data.age_user ?? user.age_user;
  user.email_user = data.email_user ?? user.email_user;
  user.password_user = data.password_user ?? user.password_user;
  user.id_role = data.id_role ?? user.id_role;
  user.is_activ = data.is_activ ?? user.is_activ;
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