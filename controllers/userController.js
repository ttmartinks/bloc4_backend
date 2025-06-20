const queries = require('../queries/userQueries');

const { generateToken, verifyToken } = require('../utils/jwt'); 
const { hashPassword, verifyPassword, isSha256 } = require('../utils/password');


exports.loginUser = async (req, res) => {
    try {
    if(!req.body) {
        return res.status(400).json({ error: 'Missing request body' });
    }
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const email_user = req.body.email.trim();
    let password_user = req.body.password.trim();

      const user = await queries.getUserByEmail(email_user);
      console.log('User found:', user);
      if (!user) {
        return res.status(404).json({ error: 'Email not found' });
      }

      if (!isSha256(password_user)) {
        // Si ce n'est pas un hash SHA-256, on le hache
        password_user = hashPassword(password_user);
      }

      if (!verifyPassword(password_user, user.password_user)) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      const user_id = user.id_user;
      const role_id = user.id_role;
      // Générer un token JWT
      const token = generateToken({ id: user_id, email: user.email_user });
  
      return res.status(200).json({ message: 'Login successful', token,  user_id, role_id});
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createUser = async (req, res) => {
  try {
    if(!req.body) {
      return res.status(400).json({ error: 'Missing request body' });
    }
    if(!req.body.email || !req.body.age || !req.body.pseudo || !req.body.password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const email_user = req.body.email.trim();
    const age_user = req.body.age.trim(); 
    const pseudo_user = req.body.pseudo.trim();
    let password_user = req.body.password.trim();
    if (!isSha256(password_user)) {
      // Si ce n'est pas un hash SHA-256, on le hache
      password_user = hashPassword(password_user);
    }
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
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing user ID' });
    }
    const id_user = req.params.id;

    if (!req.body) {
      return res.status(400).json({ error: 'Missing request body' });
    }

    const updatedFields = {};

    if (req.body.id_role) {
      updatedFields.id_role = req.body.id_role;
    }
    if (req.body.is_activ) {
      updatedFields.is_activ = req.body.is_activ;
    }
    if (req.body.email) {
      updatedFields.email_user = req.body.email.trim();
    }
    if (req.body.age) {
      updatedFields.age_user = req.body.age;
    }
    if (req.body.pseudo) {
      updatedFields.pseudo_user = req.body.pseudo.trim();
    }
    if (req.body.password) {
      let password_user = req.body.password.trim();
      if (!isSha256(password_user)) {
        password_user = hashPassword(password_user);
      }
      updatedFields.password_user = password_user;
    }
    if (req.body.id_role) {
      updatedFields.id_role = req.body.id_role;
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const updatedUser = await queries.updateUser(id_user, updatedFields);
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