const queries = require('../queries/userQueries');

const { generateToken, verifyToken } = require('./jwt'); 

exports.loginUser = async (req, res) => {
    try {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const email_user = req.body.email.trim();
    const password_user = req.body.password.trim();

      const user = await queries.getUserByEmail(email_user);
      console.log('User found:', user);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Vérifier le mot de passe
      const hashedPasswordInput = hashPassword(password);
      if (!verifyPassword(hashedPasswordInput, user.password_user)) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // Générer un token JWT
      const token = generateToken({ id: user.id_user, email: user.email_user });
  
      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createUser = async (req, res) => {
  try {
    const { email, age, pseudo, password } = req.body;
    if(!email || !age || !pseudo || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    email_user = email.trim();
    age_user = age.trim(); 
    pseudo_user = pseudo.trim();
    password_user = await password.trim();
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
    if(!req.params.id) {
      return res.status(400).json({ error: 'Missing user ID' });
    }else{
        const id_user = req.params.id;
    }
    if(req.body.email) {
        const email_user = req.body.email.trim();
    }
    if(req.body.age) {
        const age_user = req.body.age.trim(); 
    }
    if(req.body.pseudo) {
        const pseudo_user = req.body.pseudo.trim();
    }
    if(req.body.password) {
        const password_user = req.body.password.trim();
    }
    const { username, email, password } = req.body;

    const updatedUser = await queries.updateUser(id_user, { username_user, email_user, password_user });
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