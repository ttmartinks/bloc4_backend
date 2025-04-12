const queries = require('../queries/userQueries');

exports.createUser = async (req, res) => {
  try {
    const { email, age, pseudo, password } = req.body;
    if(!email || !age || !pseudo || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    email_user = email.trim();
    age_user = age.trim(); 
    pseudo_user = pseudo.trim();
    password_user = password.trim();
    const newUser = await queries.createUser({ email_user, age_user, pseudo_user, password_user });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await queries.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await queries.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const updatedUser = await queries.updateUser(req.params.id, { username, email, password });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await queries.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};